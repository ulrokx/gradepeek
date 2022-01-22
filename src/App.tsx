import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Courses } from "./components/Courses";
import { Grades } from "./components/Grades";
import { Tabs } from "./components/Tabs";
import { Todos } from "./components/Todos";
import { UserBlip } from "./components/UserBlip";
import { queryCanvas } from "./data";
import { makeUrls } from "./makeUrls";
type ILoadingStates = boolean | { error: string };
type ITabs = "Courses" | "Todos" | "Grades";
const params = new URLSearchParams([
    ["page", "1"],
    ["per_page", "50"],
]);
interface ICTG {
    name: string;
    grade: number;
    id: number;
}
type IUrls = ReturnType<typeof makeUrls>;
const empty = new URLSearchParams();
export const App = () => {
    const [classes, setClasses] = useState([]);
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState<ILoadingStates>(false);
    const [apiInput, setApiInput] = useState("");
    const [user, setUser] = useState<any>({});
    const [tab, setTab] = useState<ITabs>("Courses");
    const [todos, setTodos] = useState([]);
    const [ctg, setCtg] = useState<Array<ICTG>>([]);
    const [schoolUrl, setSchoolURL] = useState("");
    const [schoolInput, setSchoolInput] = useState("");
    const [urls, setUrls] = useState<IUrls>();
    const [errors, setErrors] = useState(false);

    useEffect(() => {
        chrome.storage.sync.get(["capikey"], (res) => {
            if (res.capikey) {
                setApiKey(res.capikey);
                setLoading(true);
            }
        });
        // chrome.storage.sync.clear()
        chrome.storage.sync.get(["schoolurl"], (res) => {
            if (res.schoolurl) {
                setSchoolURL(res.schoolurl);
            }
        });
    }, []);
    useEffect(() => {
        const result = makeUrls(schoolUrl);
        const getClasses = async () => {
            if (apiKey && schoolUrl) {
                console.log("here");
                setUrls(result);
                setLoading(true);
                const coursesurl = new URL(result.courses);
                let resp: Array<any> = await queryCanvas(
                    params,
                    coursesurl,
                    apiKey
                );
                const meurl = new URL(result.me);
                let user: any = await queryCanvas(empty, meurl, apiKey);
                setUser(user);
                resp = resp.filter((v) => {
                    return v.enrollment_term_id == 456 ? true : false;
                });
                setClasses(resp);
            }
        };
        const getTodos = async () => {
            if (apiKey) {
                setLoading(true);
                const todosurl = new URL(result.todos);
                let resp: any = await queryCanvas(empty, todosurl, apiKey);
                resp = resp.filter((r) => r.type == "submitting");
                setTodos(resp);
            }
        };
        getClasses();
        getTodos();
        setLoading(false);
    }, [apiKey, schoolUrl]);
    useEffect(() => {
        const getGrades = async () => {
            if (user && classes.length >= 1) {
                const userId = user.id;
                const gradesurl = new URL(urls.grades);
                gradesurl.pathname = `/api/v1/users/${userId}/enrollments`;
                const resp = await queryCanvas(params, gradesurl, apiKey);
                if (!resp.errors) {
                    resp.forEach((e) => {
                        classes.forEach((c) => {
                            if (c.id == e.course_id) {
                                setCtg((ctg) => [
                                    ...ctg,
                                    {
                                        name: c.name,
                                        id: c.id,
                                        grade: e.grades.current_score,
                                        final: e.grades.final_score,
                                        letter: e.grades.current_grade,
                                    },
                                ]);
                            }
                        });
                    });
                }
            }
        };
        getGrades();
    }, [classes, user]);
    const handleSubmit = async () => {
        if (apiInput.length == 69 && schoolInput) {
            const temp = new URL(schoolInput);
            temp.pathname = "/api/v1/users/self/profile";
            const resp = await queryCanvas(empty, temp, apiInput);
            if (resp.id) {
                setApiKey(apiInput);
                setSchoolURL(schoolInput);
                chrome.storage.sync.set({ capikey: apiInput });
                chrome.storage.sync.set({ schoolurl: schoolInput });
                setErrors(false);
            } else {
                setErrors(true);
            }
        } else {
            setErrors(true);
        }
    };
    return (
        <div className="flex flex-col space-y-4 items-center bg-red-100 h-screen justify-top">
            <h1 className="mt-2 subpixel-antialiased text-2xl font-semibold tracking-wider text-slate-800">
                Gradepeek Canvas
            </h1>
            {!apiKey || !schoolUrl ? (
                <>
                    <input
                        disabled={apiKey && schoolUrl ? true : false}
                        type="text"
                        placeholder="Enter your access token here"
                        className="w-2/3 outline outline-red-300 rounded-md p-3 shadow-md"
                        onChange={(e) => setApiInput(e.target.value)}
                        value={apiInput}
                    />
                    <input
                        disabled={schoolUrl && apiKey ? true : false}
                        type="text"
                        placeholder="Enter your school's Canvas page here"
                        className="w-2/3 outline outline-red-300 rounded-md p-3 shadow-md"
                        onChange={(e) => setSchoolInput(e.target.value)}
                        value={schoolInput}
                    />
                    <button
                        onClick={handleSubmit}
                        className="outline outline-green-500 outline-2 px-3 py-2 rounded-lg bg-green-200 font-semibold"
                    >
                        Log me in
                    </button>
                    {errors ? (
                        <p>
                            something went wrong, please verify information is
                            correct
                        </p>
                    ) : null}
                </>
            ) : user.name ?
                <UserBlip user={user} />
            : null}
            {apiKey ? (
                <>
                    {classes.length != 0 ?<Tabs selected={tab} changeTab={(v: ITabs) => setTab(v)} /> : null}
                    {classes.length == 0 ? (
                        <div className="py-28">
                            <BallTriangle
                                color="#ff0000"
                                height={120}
                                width={120}
                            />
                        </div>
                    ) : tab == "Courses" ? (
                        <Courses courses={classes} url={urls.base} />
                    ) : tab == "Grades" ? (
                        <Grades ctg={ctg} url={urls.base} />
                    ) : (
                        <Todos items={todos} url={urls.base} />
                    )}{" "}
                </>
            ) : null}
        </div>
    );
};
