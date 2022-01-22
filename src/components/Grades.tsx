import { SCHOOL_URL } from "../constants";
import { ChromeTab } from "./ChromeTab";

export const Grades = ({ ctg: courses }) => {
    SCHOOL_URL.pathname = `/courses/`;
    return (
        <ul className="w-5/6">
            {courses
                ? courses.map((c, i) => {
                      console.log(c, i);
                      return (
                          <li>
                              <div className="flex flex-row justify-between">
                                  <ChromeTab
                                      key={c.id}
                                      className="px-2 py-1 my-1 rounded-lg basis-5/6 bg-blue-200 hover:bg-blue-600 transition-all font-semibold text-center cursor-pointer focus:grow hover:scale-105"
                                      href={`${SCHOOL_URL.href}${c.id}`}
                                  >
                                      {c.name}
                                  </ChromeTab>
                                  <p
                                      className={`px-2 py-1 my-1 rounded-lg text-center font-semibold" ${
                                          c.grade === null ||
                                          c.grade === undefined
                                              ? "bg-slate-500 hover:bg-slate-600"
                                              : c.grade >= 95
                                              ? "bg-green-500 hover:bg-green-600"
                                              : c.grade >= 90
                                              ? "bg-lime-500 hover:bg-lime-600"
                                              : c.grade >= 85
                                              ? "bg-yellow-500 hover:bg-yellow-600"
                                              : c.grade >= 80
                                              ? "bg-amber-500 hover:bg-amber-600"
                                              : c.grade >= 75
                                              ? "bg-orange-500 hover:bg-orange-600"
                                              : "bg-red-500 hover:bg-red-600"
                                      }`}
                                  >
                                      {c.grade ? c.grade : "N/A"}
                                  </p>
                              </div>
                              <div className="h-[2px] bg-slate-900 w-full mx-auto"></div>
                          </li>
                      );
                  })
                : null}
        </ul>
    );
};
