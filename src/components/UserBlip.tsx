import dayjs from "dayjs"
export const UserBlip = ({user}) => {
    const date = dayjs().format("dddd[,] MMMM D");
    return(
        <div className="flex justify-between items-center space-x-4 pl-5">
            <img src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg" alt="profile picture" className="h-12 w-12 rounded-full outline-2 outline-blue-300 outline-offset-4 outline"/>
            <h2 className = "text-lg ">Hi John Smith, today is {date}</h2>
        </div>
    )
}