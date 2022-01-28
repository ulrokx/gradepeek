import React from "react";
import { ICourse } from "../util/types/generated";
import { CourseItem } from "../components/CourseItem";
import {BiArrowBack} from 'react-icons/bi'

interface HideCoursesProps {
    courses: Array<ICourse>;
    onChangeHidden: (id: number) => void;
    onBack: () => void;
    hidden: Array<number>;
}

export const HideCourses: React.FC<HideCoursesProps> = ({
    courses,
    onChangeHidden,
    onBack,
    hidden,
}) => {
    console.log(courses, hidden);
    return (
        <>
        <div className="flex flex-row justify-between gap-x-1">
            <BiArrowBack size={26} className="pt-px hover:scale-110 cursor-pointer" onClick={onBack}/> <h1 className="text-lg font-semibold text-center">
                    Red - Hide | Green - Show
                </h1>
        </div>
            <div className="w-5/6 pb-2 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 scrollbar-thumb-rounded-full">
                {courses.length >= 1
                    ? courses.map((c) => (
                          <CourseItem
                              key={c.id}
                              course={c}
                              className={`w-5/6 ${
                                  hidden.includes(c.id)
                                      ? "bg-red-300 hover:bg-red-400"
                                      : "bg-green-300 hover:bg-green-400"
                              }`}
                              onClick={() => onChangeHidden(c.id)}
                          >
                              {c.name}
                          </CourseItem>
                      ))
                    : "looks like you have no courses..."}
            </div>
        </>
    );
};
