import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { IoSettings } from "react-icons/io5";
import { BallTriangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Courses } from "./components/Courses";
import { Grades } from "./components/Grades";
import { Tabs } from "./components/Tabs";
import { Todos } from "./components/Todos";
import { UserBlip } from "./components/UserBlip";
import { HideCourses } from "./pages/HideCourses";
import { InputPage } from "./pages/InputPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TermSelect } from "./pages/TermSelect";
import { getCourses, getData, getUser } from "./util/data";
import { makeUrls } from "./util/makeUrls";
import { initialState, IOptions, PopupReducer } from "./util/popupreducer";
import { ICourse, ISettingsState } from "./util/types/generated";
type ITabs = "Courses" | "To-Do" | "Grades";
type IPages =
    | "Inputs"
    | "TermSelect"
    | "Main"
    | "Loading"
    | "Settings"
    | "HideCourses";
export const App = () => {
    const [state, dispatch] = useReducer(PopupReducer, initialState);
    const [apiInput, setApiInput] = useState("");
    const [tab, setTab] = useState<ITabs>("To-Do");
    const [schoolInput, setSchoolInput] = useState("");
    const [page, setPage] = useState<IPages>("Loading");
    useEffect(() => {
        chrome.storage.sync.get(
            [
                "capikey",
                "schoolurl",
                "termID",
                "courseName",
                "gradeName",
                "hiddenCourses",
            ],
            async (res) => {
                if (res.capikey && res.schoolurl && res.termID) {
                    dispatch({
                        type: "setFromStorage",
                        payload: {
                            apiKey: res.capikey,
                            schoolUrl: res.schoolurl,
                            termID: res.termID,
                            errors: false,
                        },
                    });
                    dispatch({
                        type: "setOptions",
                        payload: {
                            options: {
                                courseName: res.courseName,
                                gradeName: res.gradeName,
                                hiddenCourses: res.hiddenCourses
                                    ? res.hiddenCourses
                                    : [],
                            },
                        },
                    });
                    const data = await getData(
                        res.termID,
                        res.schoolurl,
                        res.capikey
                    );
                    dispatch({
                        type: "setData",
                        payload: {
                            ...data,
                            urls: data.madeURLs,
                        },
                    });
                    setPage("Main");
                } else {
                    //needs to onboard
                    setPage("Inputs");
                    chrome.storage.sync.get(
                        ["apiInput", "schoolInput"],
                        (res) => {
                            setApiInput(res.apiInput ? res.apiInput : "");
                            setSchoolInput(
                                res.schoolInput ? res.schoolInput : ""
                            );
                        }
                    );
                    if (chrome.action) {
                        chrome.action.setBadgeText({ text: "" });
                    }
                }
            }
        );
    }, []);
    const handleSubmit = async () => {
        //mightbe race condiition if user changes input
        if (apiInput.length == 69 && schoolInput) {
            setPage("Loading");
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
                    type: "setData",
                    payload: {
                        user,
                        apiKey: apiInput,
                        allCourses: data,
                        schoolUrl: madeURLs.base,
                        errors: false,
                    },
                });
                setPage("TermSelect");
                chrome.storage.sync.set({ capikey: apiInput });
                chrome.storage.sync.set({ schoolurl: madeURLs.base });
            }
        } else {
            dispatch({
                type: "setError",
            });
            return;
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
        setPage("Loading");
        const termID = course.enrollment_term_id;
        chrome.storage.sync.set({ termID });
        dispatch({
            type: "setTermID",
            payload: {
                termID,
            },
        });
        const data = await getData(termID, state.schoolUrl, state.apiKey);
        dispatch({
            type: "setData",
            payload: {
                ...data,
            },
        });
        setPage("Main");
    };
    const handleLogOut = () => {
        dispatch({
            type: "logOut",
        });
        setPage("Inputs");
        setSchoolInput(state.schoolUrl);
        setApiInput(state.apiKey);
        chrome.storage.sync.clear();
    };
    const onSettingsChange = (opts: IOptions) => {
        dispatch({
            type: "setOptions",
            payload: {
                options: opts,
            },
        });
    };
    const handleChangeHidden = (id: number) => {
        if (state.options.hiddenCourses.includes(id)) {
            dispatch({
                type: "removeHidden",
                payload: {
                    options: {
                        hiddenCourse: id,
                    },
                },
            });
        } else {
            dispatch({
                type: "addHidden",
                payload: {
                    options: {
                        hiddenCourse: id,
                    },
                },
            });
        }
    };
    return (
        <div className="flex flex-col space-y-4 items-center bg-red-100 h-screen justify-top">
            <h1 className="mt-3 subpixel-antialiased text-2xl font-semibold tracking-wider text-slate-800 self-start ml-5 select-none">
                Gradepeek Canvas
            </h1>
           {page != "Inputs" && page != "TermSelect" ? <IoSettings
                color={
                    page == "Settings"
                        ? "Green"
                        : page == "Loading"
                        ? "Grey"
                        : "Black"
                }
                className={`absolute top-px right-4  ${
                    page == "Loading"
                        ? null
                        : "hover:scale-110 hover:animate-spin hover:cursor-pointer"
                }`}
                size={25}
                onClick={() => {
                    if (page == "Loading") return;
                    setPage((p) => (p == "Settings" ? "Main" : "Settings"));
                }}
            />: null}
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
            ) : page == "Settings" ? (
                <SettingsPage
                    settingsState={state.options}
                    onChange={onSettingsChange}
                    onLogout={handleLogOut}
                    onHide={() => setPage("HideCourses")}
                />
            ) : page == "HideCourses" ? (
                <HideCourses
                    courses={state.courses}
                    onBack={() => {
                        setPage("Settings");
                        setTab("Courses");
                    }}
                    onChangeHidden={handleChangeHidden}
                    hidden={state.options.hiddenCourses}
                />
            ) : page == "TermSelect" ? (
                <TermSelect
                    error={state.errors}
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
                            <UserBlip
                                user={state.user}
                                onLogOut={handleLogOut}
                            />
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
                            options={state.options}
                            hidden={state.options.hiddenCourses}
                        />
                    ) : tab == "Grades" ? (
                        <Grades
                            ctg={state.grades}
                            url={state.urls.base}
                            options={state.options}
                            hidden={state.options.hiddenCourses}
                        />
                    ) : (
                        <Todos items={state.todos} url={state.urls.base} />
                    )}{" "}
                </>
            )}
        </div>
    );
};
