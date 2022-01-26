import * as React from "react";
import { ICourse } from "../util/types/generated";
import { ChromeTab } from "./ChromeTab";
interface ICourses {
    courses: Array<ICourse>
    url: string
}
export const Courses = ({ courses, url }) => {
    return (
        <ul className="w-5/6">
            {courses
                ? courses.map((c: ICourse) => {
                      return (
                          <li className="flex flex-column justify-center gap-1" key={c.id}>
                              <ChromeTab
                                  className="px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-500 transition-all font-semibold w-full text-center cursor-pointer hover:scale-105"
                                  href={`${url}/courses/${c.id}`}
                              >
                                  {c.course_code}
                              </ChromeTab>
                          </li>
                      );
                  })
                : null}
        </ul>
    );
};
