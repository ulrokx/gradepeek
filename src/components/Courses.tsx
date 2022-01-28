import * as React from "react";
import { IOptions } from "../util/popupreducer";
import { ICourse } from "../util/types/generated";
import { ChromeTab } from "./ChromeTab";
interface ICoursesProps {
    courses: Array<ICourse>;
    url: string;
    options: IOptions
    hidden: Array<number>
}
export const Courses: React.FC<ICoursesProps> = ({ courses, url, options, hidden }) => {
    return (
        <ul className="w-5/6">
            {courses
                ? courses.map((c: ICourse) => {
                    console.log("chidden", hidden)
                    if(hidden.includes(c.id)) return
                      return (
                          <li
                              className="flex flex-column justify-center gap-1"
                              key={c.id}
                          >
                              <ChromeTab
                                  className="px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-500 transition-all font-semibold w-full text-center cursor-pointer hover:scale-105"
                                  href={`${url}/courses/${c.id}`}
                              >
                                  {options.courseName == "Name" ? c.name : c.course_code}
                              </ChromeTab>
                          </li>
                      );
                  })
                : null}
        </ul>
    );
};
