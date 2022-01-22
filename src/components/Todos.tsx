import { ChromeTab } from "./ChromeTab";
import { SCHOOL_URL } from "../constants";

export const Todos = ({ items }) => {
    SCHOOL_URL.pathname = `/courses/`;
    return (
        <ul className="w-5/6">
            {items
                ? items.map((i) => {
                      return (
                          <li className="flex row justify-center gap-1">
                              <p
                              key={i.id}
                                  className="px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-700 transition-all font-semibold w-full text-center cursor-pointer hover:scale-105"
                              >
                                  {i.assignment.name}
                              </p>
                          </li>
                      );
                  })
                : null}
        </ul>
    );
};

