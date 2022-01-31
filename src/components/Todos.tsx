import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChromeTab } from "./ChromeTab";
dayjs.extend(relativeTime);

export const Todos = ({ items, url }) => {
    const now = new Date();
    return (
        <ul className="w-full px-6 text-center overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300">
            {items
                ? items.map((i, v) => {
                      const daystill = dayjs(i.assignment.due_at).diff(
                          dayjs(),
                          "d",
                          true
                      );
                      console.log(daystill);
                      const till = dayjs().to(dayjs(i.assignment.due_at));
                      return (
                          <li key={v} className="justify-center gap-1 flex-col">
                              <div className="px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-500 transition-all font-semibold w-full text-center cursor-pointer hover:scale-105 mb-0">
                                  <ChromeTab
                                      href={`${url}/courses/${i.course_id}/assignments/${i.assignment.id}`}
                                  >
                                      {i.assignment.name}
                                  </ChromeTab>
                              </div>
                              <p
                                  className={`rounded-b-lg inline-block text-sm font-semibold text-[.75rem] px-2 ${
                                      daystill >= 6.5
                                          ? "bg-green-500"
                                          : daystill >= 5.5
                                          ? "bg-lime-500"
                                          : daystill >= 4
                                          ? "bg-yellow-500"
                                          : daystill >= 2.5
                                          ? "bg-amber-500"
                                          : daystill > 1
                                          ? "bg-orange-500"
                                          : "bg-red-500"
                                  }`}
                              >
                                  {dayjs(i.assignment.due_at).format(
                                      "dddd[,] h[:]mm a"
                                  )}
                                  , {till}
                              </p>
                          </li>
                      );
                  })
                : null}
        </ul>
    );
};
