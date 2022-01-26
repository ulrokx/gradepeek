import { useState } from "react";
import { ChromeTab } from "./ChromeTab";
import { Instructions } from "./instructions";
import { TextField } from "./TextField";

export const InputPage = ({apiInput, onApiChange, schoolInput, onSchoolChange, onSubmit, errors}) => {
    return(
        <>
                    <TextField
                        placeholder="Access token"
                        onChange={onApiChange}
                        value={apiInput}
                    />
                    <TextField
                        placeholder="Canvas URL"
                        onChange={onSchoolChange}
                        value={schoolInput}
                    />
                    <button
                        onClick={onSubmit}
                        className="transition-all shadow-md outline outline-green-500 outline-2 px-3 py-2 rounded-lg bg-green-200 font-semibold hover:outline-green-600 hover:bg-green-400 hover:scale-105"
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
    )
}