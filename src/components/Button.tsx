export const Button = ({children, className = ""}) => {
    return(
        <button className={`px-2 py-1 my-1 rounded-lg bg-blue-200 hover:bg-blue-500 transition-all font-semibold text-center cursor-pointer hover:scale-105 ${className}`}>{children}</button>
    )
}