import { ChromeTab } from "./ChromeTab";
import { dateDiffDays } from "./dateDiffDays";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

export const Todos = ({ items, url }) => {
    const now = new Date();
    return (
        <ul className="w-5/6 text-center">
            {items
                ? items.map((i) => {
                      const due = new Date(i.assignment.due_at);
                      const daystill = dateDiffDays(now, due);
                      const till = dayjs().to(dayjs(i.assignment.due_at))
                      return (
                          <li className="justify-center gap-1 flex-col">
                              <div className="px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-500 transition-all font-semibold w-full text-center cursor-pointer hover:scale-105 mb-0">
                                  <ChromeTab
                                      href={`${url}/courses/${i.course_id}/assignments/${i.assignment.id}`}
                                      key={i.id}
                                  >
                                      {i.assignment.name}
                                  </ChromeTab>
                              </div>
                              <p
                                  className={`rounded-b-lg inline-block text-sm font-semibold text-[.75rem] ${
                                      daystill >= 5
                                          ? "bg-green-500"
                                          : daystill >= 4
                                          ? "bg-lime-500"
                                          : daystill >= 3
                                          ? "bg-yellow-500"
                                          : daystill >= 2
                                          ? "bg-amber-500"
                                          : daystill > 1
                                          ? "bg-orange-500"
                                          : "bg-red-500"
                                  }`}
                              >
                                  {due.toDateString()}, {till}
                              </p>
                          </li>
                      );
                  })
                : null}
        </ul>
    );
};
