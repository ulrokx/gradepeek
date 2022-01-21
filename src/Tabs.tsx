export const Tabs = ({selected, changeTab}) => {
    const tabs = ["Courses", "Todos", "Grades"];
    return(
        <ul className="flex flex-row border-b-2 border-gray-500 ">
        {tabs.map(t => {
            return <li onClick={() => changeTab(t)} className={`font-medium mx-2 px-4 rounded-t-lg bg-red-300 hover:bg-red-400 py-2 ${t == selected ? "bg-red-500 text-white hover:bg-red-600" : "hover:bg-red-400"}`}>
                {t}
            </li>
        })}
        </ul>
    )
}