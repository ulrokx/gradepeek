import { ChromeTab } from "./ChromeTab";
import { SCHOOL_URL } from "../constants";

export const Courses = ({ courses }) => {
    SCHOOL_URL.pathname = `/courses/`;
    return (
        <ul className="w-5/6">
            {courses
                ? courses.map((c) => {
                      return (
                          <li className="flex flex-column justify-center gap-1">
                              <ChromeTab
                              key={c.id}
                                  className="px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-700 transition-all font-semibold w-full text-center cursor-pointer hover:scale-105"
                                  href={`${SCHOOL_URL.href}${c.id}`}
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
