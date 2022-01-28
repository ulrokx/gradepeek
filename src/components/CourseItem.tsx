import React from "react";
import { ICourse } from "../util/types/generated";
import { ChromeTab } from "./ChromeTab";

interface CourseItemProps {
    course: ICourse;
    onClick?: any;
    url?: string;
    className?: string;
}

export const CourseItem: React.FC<CourseItemProps> = ({
    url,
    course: c,
    onClick,
    className,
}) => {
    const styles =
        "px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-500 transition-all font-semibold text-center cursor-pointer hover:scale-105";
    return (
        <li className="flex flex-column justify-center gap-1" key={c.id}>
            {url ? (
                <ChromeTab
                    className={`${styles} ${className}`}
                    href={url ? `${url}/courses/${c.id}` : ""}
                    onClick={() => onClick(c)}
                >
                    {c.course_code}
                </ChromeTab>
            ) : (
                <p className={`select-none ${styles} ${className}`} onClick={onClick}>{c.id} | {c.course_code}</p>
            )}
        </li>
    );
};
