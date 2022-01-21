export const UserBlip = ({user}) => {
    return(
        <div className="flex justify-between items-center space-x-4 ">
            <img src={user.avatar_url} alt="profile picture" className="h-12 w-12 rounded-full outline-2 outline-blue-300 outline-offset-4 outline"/>
            <h2 className = "text-lg ">{user.name}</h2>
        </div>
    )
}