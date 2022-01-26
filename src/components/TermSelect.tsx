import React from "react";
import { ICourse } from "../util/types/generated";
import { CourseItem } from "./CourseItem";

interface TermSelectProps {
    courses: Array<ICourse>;
    onSelect: (course: ICourse) => void;
}

export const TermSelect: React.FC<TermSelectProps> = ({
    courses,
    onSelect,
}) => {
    return (
        <>
            <h1 className="text-lg font-semibold text-center">
                Click on a class you are currently in:
            </h1>
            <div className="pb-2 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 scrollbar-thumb-rounded-full">
                {courses.length >= 1
                    ? courses.map((c) => (
                          <CourseItem
                              className="w-5/6"
                              course={c}
                              onClick={onSelect}
                          />
                      ))
                    : "looks like you have no courses..."}
            </div>
        </>
    );
};
