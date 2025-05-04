import { FaArrowRightFromBracket } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";

const MyProfile = () => {

    const { user, logoutUser } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: userData, isPending } = useQuery({
        queryKey: ['/user', user?.email,],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data
        }
    })




    if(isPending){
        return <LoadingSpinner/>
    }


    return (
        <>

            <div className="p-10 rounded-lg bg-[#8ff9f126] shadow-lg">
                <div className="flex justify-center">
                    <img className="w-36 h-36 rounded-full border-[#05A698] border-4" src={userData?.image} alt="" />
                </div>
                <p className="text-xl mt-8"><span className="font-bold">Name:</span> {userData?.name}</p>
                <p className="text-xl my-4"><span className="font-bold">Email:</span> {userData?.email}</p>
                <p className="text-xl my-4"><span className="font-bold">Phone:</span> {userData?.phone}</p>
                <p className="text-xl my-4">
                    <span className="font-bold">Role:</span>{" "}
                    {userData?.role && userData?.isTeacher
                        ? "Admin"
                        : userData?.role
                            ? "Admin"
                            : userData?.isTeacher
                                ? "Teacher"
                                : "Student"}
                </p>

                <button onClick={logoutUser} className="btn-primary flex items-center gap-2"><FaArrowRightFromBracket /> Logout</button>
            </div>

        </>
    );
};

export default MyProfile;