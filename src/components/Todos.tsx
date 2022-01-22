export const Todos = ({ items, url }) => {
    return (
        <ul className="w-5/6">
            {items
                ? items.map((i) => {
                      return (
                          <li className="flex row justify-center gap-1">
                              <a
                                    href={`${url}/courses/${i.course_id}/assignments/${i.assignment.id}`}
                                  key={i.id}
                                  className="px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-500 transition-all font-semibold w-full text-center cursor-pointer hover:scale-105"
                              >
                                  {i.assignment.name}
                              </a>
                          </li>
                      );
                  })
                : null}
        </ul>
    );
};
