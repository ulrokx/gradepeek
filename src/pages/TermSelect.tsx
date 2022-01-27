import React from "react";
import { ICourse } from "../util/types/generated";
import { CourseItem } from "../components/CourseItem";

interface TermSelectProps {
    courses: Array<ICourse>;
    onSelect: (course: ICourse) => void;
    error: boolean;
}

export const TermSelect: React.FC<TermSelectProps> = ({
    courses,
    onSelect,
    error,
}) => {
    return (
        <>
            {error ? (
                <div>something went wrong</div>
            ) : (
                <>
                    <h1 className="text-lg font-semibold text-center">
                        Click on a class you are currently in:
                    </h1>
                    <div className="w-5/6 pb-2 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 scrollbar-thumb-rounded-full">
                        {courses.length >= 1
                            ? courses.map((c) => (
                                  <CourseItem
                                  key={c.id}
                                      className="w-5/6"
                                      course={c}
                                      onClick={onSelect}
                                  />
                              ))
                            : "looks like you have no courses..."}
                    </div>
                </>
            )}
        </>
    );
};
