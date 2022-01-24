import { ChromeTab } from "./ChromeTab";

export const Instructions = () => {
    return (
        <div className="block">
            <h1 className="text-lg font-semibold text-center">How to get started:</h1>
            <h2 className="text-base font-semibold">Access token:</h2>
            <ol>
                <li>1. Go to your school's canvas page</li>
                <li>2. Go to Account {">"} Settings on the left</li>
                <li>3. Scroll down and generate an access token</li>
                <li>4. Paste that in the access token box</li>
            </ol>
            <h2 className="text-base font-semibold">School URL:</h2>
            <ol>
                <li>1. Click on the big Canvas logo in top left of Canvas</li>
                <li>2. Copy the address from your address bar</li>
                <li>3. Paste into Canvas URL box</li>
            </ol>
            <div className="mt-4 text-center hover:cursor-pointer hover:text-green-600 transition-all hover:scale-105">
                <ChromeTab className="font-semibold" href="https://github.com/ulrokx/gradepeek">made by Richard Ricky Kirk</ChromeTab>
            </div>
        </div>
    );
};
