import { useQuery } from "@tanstack/react-query";
import HelmetTitle from "../../components/HelmetTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import loadingGif from '../../assets/loading.gif';
import LoadingSpinner from "../../components/LoadingSpinner";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState("")

    const { data: users = [], refetch, isPending, isFetching } = useQuery({
        queryKey: ['teacherReq',],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`)
            return res.data
        }
    })

    useEffect(() => {
        const delay = setTimeout(() => {
            refetch();
        }, 50);

        return () => clearTimeout(delay);
    }, [refetch, search]);



    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/user/makeAdmin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.name} is admin now`, { position: "top-right", duration: 4000, });
                    refetch()
                }
            })
    }

    if (isPending) {
        return <LoadingSpinner />
    }


    return (
        <div>
            <HelmetTitle title="Users"></HelmetTitle>
            <div>
                <div className="px-2 py-6 bg-base-200 shadow-md rounded-xl">
                    <div className="flex items-center gap-2 justify-between mb-6 px-2">
                        <h2 className="pl-4 font-semibold text-lg md:text-xl">All Users: {users?.length}</h2>
                        <label className="input input-bordered flex items-center gap-2 max-w-xs">
                            <input
                                onChange={e => {
                                    setSearch(e.target.value);
                                    refetch()
                                }}
                                type="text" className="grow" placeholder="Search" />
                            <FaSearch className="opacity-50" />
                        </label>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            {
                                isFetching ? <tbody>
                                    <tr>
                                        <td colSpan="8" className="text-center py-8">
                                            <div className='flex justify-center'>
                                                <img className='w-64' src={loadingGif} alt="Loading..." />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                    :
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td>
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-10 sm:h-14 sm:w-14">
                                                            <img
                                                                src={user.image}
                                                                alt="Avatar Tailwind CSS Component"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    {
                                                        user?.role === "admin" ?
                                                            <button className="btn btn-xs"
                                                                disabled={true}>
                                                                Make Admin
                                                            </button> :
                                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs text-white bg-[#05A698] hover:bg-[#058ea6]">
                                                                Make Admin
                                                            </button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                            }
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllUsers;