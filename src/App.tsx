import { useEffect, useState } from "react";
import { COURSES_URL, ME_URL } from "./constants";
import { queryCanvas } from "./data";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle, Oval } from "react-loader-spinner";
import { UserBlip } from "./UserBlip";
import { Courses } from "./Courses";
import { Tabs } from "./Tabs";
type ILoadingStates = boolean | { error: string };
type ITabs = "Courses" | "Todos" | "Grades";
export const App = () => {
    const [classes, setClasses] = useState([]);
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState<ILoadingStates>(false);
    const [apiInput, setApiInput] = useState("");
    const [user, setUser] = useState({});
    const [tab, setTab] = useState<ITabs>("Courses");

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
            const empty = new URLSearchParams();
            const params = new URLSearchParams([
                ["page", "1"],
                ["per_page", "50"],
            ]);
            let resp: Array<any> = await queryCanvas(
                params,
                COURSES_URL,
                apiKey
            );
            let user = await queryCanvas(empty, ME_URL, apiKey, false);
            setUser(user);
            resp = resp.filter((v) => {
                return v.enrollment_term_id == 456 ? true : false;
            });
            setClasses(resp);
            setLoading(false);
        };
        getClasses();
    }, [apiKey]);
    useEffect(() => {
        if (apiInput.length === 69) {
            setApiKey(apiInput);
        }
    }, [apiInput]);
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
            {classes.length ? <Courses courses={classes} /> : null}
            {/* <BallTriangle color="#ff0000" height={120} width={120}/> */}
        </div>
    );
};
