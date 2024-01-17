export const Tabs = ({ selected, changeTab }) => {
  const tabs = ["Courses", "To-Do", "Grades"]; //changed from todos to to-do
  return (
    <ul className="flex flex-row border-b-2 border-gray-500 ">
      {tabs.map((t) => {
        return (
          <li
            key={t}
            onClick={() => changeTab(t)}
            className={`font-medium mx-2 px-4 rounded-t-lg cursor-pointer hover:bg-red-400 py-2 ${
              t == selected
                ? "bg-red-500 text-white hover:bg-red-600"
                : "hover:bg-red-400 bg-red-300"
            }`}
          >
            {t}
          </li>
        );
      })}
    </ul>
  );
};
