import { FaArrowRightFromBracket } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {

    const { user,logoutUser  } = useAuth()
    console.log(user);

    return (
        <div className="p-10 rounded-lg bg-[#8ff9f126] shadow-lg">
            <div className="flex justify-center">
                <img className="w-36 h-36 rounded-full border-[#05A698] border-4" src={user?.photoURL} alt="" />
            </div>
            <p className="text-xl mt-8"><span className="font-bold">Name:</span> {user?.displayName}</p>
            <p className="text-xl my-4"><span className="font-bold">Email:</span> {user?.email}</p>
            <button onClick={logoutUser} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]"><FaArrowRightFromBracket/> Logout</button>
        </div>
    );
};

export default MyProfile;