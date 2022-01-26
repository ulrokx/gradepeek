import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Courses } from "./components/Courses";
import { Grades } from "./components/Grades";
import { InputPage } from "./components/InputPage";
import { Tabs } from "./components/Tabs";
import { TermSelect } from "./components/TermSelect";
import { Todos } from "./components/Todos";
import { UserBlip } from "./components/UserBlip";
import { getCourses, getGrades, getTodos, getUser } from "./util/data";
import { makeUrls } from "./util/makeUrls";
import { initialState, PopupReducer } from "./util/popupreducer";
import { ICourse } from "./util/types/generated";
type ITabs = "Courses" | "Todos" | "Grades";
type IPages = "Inputs" | "TermSelect" | "Main" | "Loading";
export const App = () => {
    const [state, dispatch] = useReducer(PopupReducer, initialState);
    const [apiInput, setApiInput] = useState("");
    const [tab, setTab] = useState<ITabs>("Courses");
    const [schoolInput, setSchoolInput] = useState("");
    const [page, setPage] = useState<IPages>("Loading");
    useEffect(() => {
        chrome.storage.sync.get(["capikey", "schoolurl", "termID"], (res) => {
            if (!res.termID && res.capikey && res.schoolurl) {
                setPage("TermSelect");
            } //if the onboarding was interupted
            else if (res.capikey && res.schoolurl && res.termID) {
                dispatch({
                    type: "setFromStorage",
                    payload: {
                        key: res.capikey,
                        school: res.schoolurl,
                        termID: res.termID,
                    },
                });
                getData(res.termID, res.schoolurl, res.capikey);
                setPage("Main");
            } else {
                //needs to onboard
                setPage("Inputs");
                chrome.storage.sync.get(["apiInput", "schoolInput"], (res) => {
                    setApiInput(res.apiInput ? res.apiInput : "");
                    setSchoolInput(res.schoolInput ? res.schoolInput : "");
                });
            }
        });
    }, []);
    // chrome.action.setBadgeText({text: resp.length >= 1 ? resp.length.toString() : "👍"})
    // chrome.action.setBadgeBackgroundColor({color: badgeColor(resp.length)})
    const handleSubmit = async () => {
        //mightbe race condiition if user changes input
        if (apiInput.length == 69 && schoolInput) {
            const madeURLs = makeUrls(schoolInput);
            dispatch({
                type: "setURLs",
                payload: {
                    urls: madeURLs,
                },
            });
            const data = await getCourses(madeURLs.courses, apiInput);
            const user = await getUser(madeURLs.me, apiInput);
            if (!data || !user) {
                dispatch({
                    type: "setError",
                });
                return;
            }
            if (data) {
                dispatch({
                    type: "setUser",
                    payload: {
                        user,
                    },
                });
                dispatch({
                    type: "setAllCourses",
                    payload: {
                        allCourses: data,
                    },
                });
                dispatch({
                    type: "setFromStorage",
                    payload: {
                        key: apiInput,
                        school: madeURLs.base,
                    },
                });
                setPage("TermSelect");
                chrome.storage.sync.set({ capikey: apiInput });
                chrome.storage.sync.set({ schoolurl: madeURLs.base });
            }
        }
    };
    const handleApiInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setApiInput(event.target.value);
        chrome.storage.sync.set({ apiInput: event.target.value });
    };
    const handleSchoolInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSchoolInput(event.target.value);
        chrome.storage.sync.set({ schoolInput: event.target.value });
    };
    const handleCourseSelect = async (course: ICourse) => {
        const termID = course.enrollment_term_id;
        chrome.storage.sync.set({ termID });
        dispatch({
            type: "setTermID",
            payload: {
                termID,
            },
        });
        console.log(termID, state.schoolUrl, state.apiKey);
        getData(termID, state.schoolUrl, state.apiKey);
        setPage("Main");
    };
    const getData = async (
        termID: number,
        schoolurl?: string,
        key?: string
    ) => {
        const madeURLs = makeUrls(schoolurl);
        dispatch({
            type: "setURLs",
            payload: {
                urls: madeURLs,
            },
        });
        const user = await getUser(madeURLs.me, key);
        const courses = await getCourses(madeURLs.courses, key, termID);
        const todos = await getTodos(madeURLs.todos, key);
        let userID = null;
        let idx = 0;
        while (!userID) {
            if (idx >= courses.length) return;
            if (courses[idx].enrollments[0].user_id) {
                userID = courses[idx].enrollments[0].user_id;
            }
            idx++;
        }
        const grades = await getGrades(madeURLs.grades, key, courses, userID);
        dispatch({
            type: "setCourses",
            payload: {
                courses: courses,
            },
        });
        dispatch({
            type: "setTodos",
            payload: { todos: todos },
        });
        dispatch({
            type: "setGrades",
            payload: { grades: grades },
        });
        dispatch({
            type: "setUser",
            payload: { user },
        });
    };
    return (
        <div className="flex flex-col space-y-4 items-center bg-red-100 h-screen justify-top">
            <h1 className="mt-2 subpixel-antialiased text-2xl font-semibold tracking-wider text-slate-800">
                Gradepeek Canvas
            </h1>
            {page == "Loading" ? (
                <div className="py-28">
                    <BallTriangle color="#ff0000" height={120} width={120} />
                </div>
            ) : page == "Inputs" ? (
                <InputPage
                    apiInput={apiInput}
                    onApiChange={handleApiInputChange}
                    onSchoolChange={handleSchoolInputChange}
                    schoolInput={schoolInput}
                    errors={state.errors}
                    onSubmit={handleSubmit}
                />
            ) : page == "TermSelect" ? (
                <TermSelect
                    courses={state.allCourses}
                    onSelect={handleCourseSelect}
                />
            ) : (
                <>
                    {state.courses.length == 0 ? (
                        <div className="py-28">
                            <BallTriangle
                                color="#ff0000"
                                height={120}
                                width={120}
                            />
                        </div>
                    ) : (
                        <>
                            <UserBlip user={state.user} />
                            <Tabs
                                selected={tab}
                                changeTab={(v: ITabs) => setTab(v)}
                            />
                        </>
                    )}
                    {tab == "Courses" ? (
                        <Courses
                            courses={state.courses}
                            url={state.urls.base}
                        />
                    ) : tab == "Grades" ? (
                        <Grades ctg={state.grades} url={state.urls.base} />
                    ) : (
                        <Todos items={state.todos} url={state.urls.base} />
                    )}{" "}
                </>
            )}
        </div>
    );
};