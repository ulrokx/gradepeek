import { useEffect, useState } from "react";
import {
    COURSES_URL,
    GRADES_URL,
    ME_URL,
    SCHOOL_URL,
    TODOS_URL,
} from "./constants";
import { queryCanvas } from "./data";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle, Oval } from "react-loader-spinner";
import { UserBlip } from "./components/UserBlip";
import { Courses } from "./components/Courses";
import { Tabs } from "./components/Tabs";
import { Todos } from "./components/Todos";
import { Grades } from "./components/Grades";
type ILoadingStates = boolean | { error: string };
type ITabs = "Courses" | "Todos" | "Grades";
const params = new URLSearchParams([
    ["page", "1"],
    ["per_page", "50"],
]);
interface ctg {
    name: string;
    grade: number;
    id: number;
}
const empty = new URLSearchParams();
export const App = () => {
    const [classes, setClasses] = useState([]);
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState<ILoadingStates>(false);
    const [apiInput, setApiInput] = useState("");
    const [user, setUser] = useState<any>({});
    const [tab, setTab] = useState<ITabs>("Courses");
    const [todos, setTodos] = useState([]);
    const [ctg, setCtg] = useState([]);

    useEffect(() => {
        chrome.storage.sync.get(["capikey"], (res) => {
            if (res.capikey) {
                setApiKey(res.capikey);
                setLoading(true);
            }
        });
    }, []);
    useEffect(() => {
        const getClasses = async () => {
            chrome.storage.sync.set({ capikey: apiKey });
            setLoading(true);
            let resp: Array<any> = await queryCanvas(
                params,
                COURSES_URL,
                apiKey
            );
            let user: any = await queryCanvas(empty, ME_URL, apiKey, false);
            setUser(user);
            resp = resp.filter((v) => {
                return v.enrollment_term_id == 456 ? true : false;
            });
            setClasses(resp);
        };
        const getTodos = async () => {
            setLoading(true);
            let resp: any = await queryCanvas(empty, TODOS_URL, apiKey);
            resp = resp.filter((r) => r.type == "submitting");
            setTodos(resp);
        };
        getClasses();
        getTodos();
        setLoading(false);
    }, [apiKey]);
    useEffect(() => {
        if (apiInput.length === 69) {
            setApiKey(apiInput);
        }
    }, [apiInput]);
    useEffect(() => {
        const getGrades = async () => {
            if (user && classes.length >= 1) {
                const userId = user.id;
                SCHOOL_URL.pathname = `/api/v1/users/${userId}/enrollments`;

                const resp = await queryCanvas(params, SCHOOL_URL, apiKey);
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
                                        letter: e.grades.current_grade
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
    return (
        <div className="flex flex-col space-y-4 items-center bg-red-100 h-screen">
            <h1 className="mt-2 subpixel-antialiased text-2xl font-semibold tracking-wider text-slate-800">
                Gradepeek Canvas
            </h1>
            {!classes.length ? (
                <input
                    disabled={apiKey ? true : false}
                    type="text"
                    placeholder="Enter your API key here"
                    className="w-2/3 outline outline-red-300 rounded-md p-3 shadow-md"
                    onChange={(e) => setApiInput(e.target.value)}
                    value={apiInput}
                />
            ) : (
                <UserBlip user={user} />
            )}
            <Tabs selected={tab} changeTab={(v: ITabs) => setTab(v)} />
            {classes.length == 0 ? (
                <BallTriangle color="#ff0000" height={120} width={120} />
            ) : tab == "Courses" ? (
                <Courses courses={classes} />
            ) : tab == "Grades" ? <Grades ctg={ctg}/> : (
                <Todos items={todos} />
            )}
        </div>
    );
};
