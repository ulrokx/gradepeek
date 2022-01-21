import { useEffect, useState } from "react";
import { COURSES_URL } from "./constants";
import { queryCanvas } from "./data";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {BallTriangle, Oval} from 'react-loader-spinner'
type ILoadingStates = boolean | { error: string };

export const App = () => {
    const [classes, setClasses] = useState([]);
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState<ILoadingStates>(false);
    const [apiInput, setApiInput] = useState("");

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
            const params = new URLSearchParams([
                ["page", "1"],
                ["per_page", "50"],
            ]);
            let resp: Array<any> = await queryCanvas(
                params,
                COURSES_URL,
                apiKey,
                true
            );
            const start = new Date(2021, 10, 1);
            // resp = resp.filter((v) => {
            //     const datadate = new Date(v.created_at);
            //     return datadate > start ? true : false
            // });
            setClasses(resp);
        };
        getClasses();
    }, [apiKey]);
    useEffect(() => {
        if (apiInput.length === 69) {
            setApiKey(apiInput);
        }
    }, [apiInput]);
    return (
        <div className="flex flex-col space-y-4 items-center">
            <h1 className="text-xl">Gradepeek Canvas</h1>
            {!classes.length ? (
                <input
                    disabled={apiKey ? true : false}
                    type="text"
                    placeholder="api key here"
                    className="w-2/3 outline outline-red-300 rounded-md p-3"
                    onChange={(e) => setApiInput(e.target.value)}
                    value={apiInput}
                />
            ) : (
                <p>you are authenticated</p>
            )}
            {classes.length ? (
                <ul>
                    {classes.map((c) => {
                        return <li key={c.id}>{c.course_code}</li>;
                    })}
                </ul>
            ) : <BallTriangle color="#F00000" height={120} width={120} />}
        </div>
    );
};
