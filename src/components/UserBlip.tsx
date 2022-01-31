import dayjs from "dayjs";
import * as React from "react";
import { IUser } from "../util/types/generated"; //@ts-ignore filething it works just -_-
import Placeholder from "../assets/avatar-50.png";
interface IUserBlip {
    user: IUser;
    onLogOut: () => void
}
export const UserBlip: React.FC<IUserBlip> = ({ user, onLogOut }) => {
    const [display, setDisplay] = React.useState(false);
    const [ready, setReady] = React.useState(false);
    const onLoad = () => {
        setDisplay(true);
    };
    const date = dayjs().format("dddd[,] MMMM D");
    return (
        <div className="flex justify-between items-center space-x-4 px-2">
            <img
                src={Placeholder}
                alt="placeholder"
                className={`h-12 w-12 rounded-full outline-2 outline-blue-300 outline-offset-4 outline hover:animate-spin ml-[16px] cursor-pointer ${
                    display ? "hidden" : "block"
                }`}
            />
            {!ready ? (
                <img
                    src={user.avatar_url}
                    onClick={() => setReady(true)}
                    onLoad={onLoad}
                    alt="profile picture"
                    className={`select-none h-12 w-12 rounded-full outline-2 outline-blue-300 outline-offset-4 outline hover:outline-blue-500 cursor-pointer hover:animate-spin ${
                        display ? "block" : "hidden"
                    }`}
                />
            ) : (
                <div
                    className="select-none h-12 w-12 px-2 rounded-full outline-2 outline-red-300 outline-offset-4 outline hover: outline-500 flex justify-center items-center font-medium text-red-600 bg-red-200 cursor-pointer"
                    onClick={onLogOut}
                >
                    Logout?
                </div>
            )}
            <h2 className="text-lg select-none break-normal">
                Hi <span className="font-medium">{user.name}</span>, today is{" "}
                {date}
            </h2>
        </div>
    );
};
