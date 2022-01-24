import { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { badgeColor } from "./util/badgeColor";
import { Courses } from "./components/Courses";
import { Grades } from "./components/Grades";
import { Tabs } from "./components/Tabs";
import { Todos } from "./components/Todos";
import { UserBlip } from "./components/UserBlip";
import { queryCanvas } from "./util/data";
import { makeUrls } from "./util/makeUrls";
import { Instructions } from "./components/instructions";
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
            }
        });
        // chrome.storage.sync.clear()
        chrome.storage.sync.get(["schoolurl"], (res) => {
            if (res.schoolurl) {
                setSchoolURL(res.schoolurl);
            }
        });
        chrome.storage.sync.get(["keyinput", "schoolinput"], (res) => {
            setApiInput(res.keyinput ? res.keyinput : "");
            setSchoolInput(res.schoolinput ? res.schoolinput : "");
        });
    }, []);
    useEffect(() => {
        const madeurls = makeUrls(schoolUrl);
        const getClasses = async () => {
            if (apiKey && schoolUrl) {
                setUrls(madeurls);
                const coursesurl = new URL(madeurls.courses);
                let resp: Array<any> = await queryCanvas(
                    params,
                    coursesurl,
                    apiKey
                );
                const meurl = new URL(madeurls.me);
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
                const todosurl = new URL(madeurls.todos);
                let resp: any = await queryCanvas(empty, todosurl, apiKey);
                resp = await resp.filter((r) => r.type == "submitting");
                setTodos(resp);
                chrome.browserAction.setBadgeText({text: resp.length >= 1 ? resp.length.toString() : "👍"})
                chrome.browserAction.setBadgeBackgroundColor({color: badgeColor(resp.length)})
            }
        };
        if(schoolUrl) {
        getClasses();
        getTodos();
        }
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
            let totest = schoolInput;
            if (!schoolInput.match(/^https?:\/\//i)) {
                totest = "https://" + totest;
            }
            const temp = new URL(totest);

            temp.pathname = "/api/v1/users/self/profile";
            const resp = await queryCanvas(empty, temp, apiInput);
            if (resp.id) {
                setApiKey(apiInput);
                setSchoolURL(totest);
                chrome.storage.sync.set({ capikey: apiInput });
                chrome.storage.sync.set({ schoolurl: totest });
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
                        placeholder="Access token"
                        className="w-2/3 outline outline-red-300 rounded-md p-3 shadow-md"
                        onChange={(e) => {
                            setApiInput(e.target.value);
                            chrome.storage.sync.set({
                                keyinput: e.target.value,
                            });
                        }}
                        value={apiInput}
                    />
                    <input
                        disabled={schoolUrl && apiKey ? true : false}
                        type="text"
                        placeholder="Canvas URL"
                        className="w-2/3 outline outline-red-300 rounded-md p-3 shadow-md"
                        onChange={(e) => {
                            setSchoolInput(e.target.value);
                            chrome.storage.sync.set({
                                schoolinput: e.target.value,
                            });
                        }}
                        value={schoolInput}
                    />
                    <button
                        onClick={handleSubmit}
                        className="outline outline-green-500 outline-2 px-3 py-2 rounded-lg bg-green-200 font-semibold"
                    >
                        Log me in
                    </button>
                    {errors ? (
                        <p className="w-5/6 font-medium">
                            Something went wrong, please verify that your information is correct.
                        </p>
                    ) : null}
                <Instructions />
                </>
            ) : user.name ? (
                <UserBlip user={user} />
            ) : null}
            {apiKey ? (
                <>
                    {classes.length != 0 ? (
                        <Tabs
                            selected={tab}
                            changeTab={(v: ITabs) => setTab(v)}
                        />
                    ) : null}
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
