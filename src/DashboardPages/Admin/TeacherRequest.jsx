import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


const TeacherRequest = () => {

    const [search, setSearch] = useState("");
    const axiosSecure = useAxiosSecure()

    const { data: teacherRequests = [], refetch } = useQuery({
        queryKey: ['teachersRequests', { search }],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teachersRequests?search=${search}`)
            return res.data
        }
    })


    const handleApprove = (user) => {
        axiosSecure.patch(`/teacher/approve/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    axiosSecure.patch(`/user/setTeacher/${user.email}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                toast.success(`${user.name} is teacher now`, { position: "top-right", duration: 4000, });
                            }
                        })
                    refetch()
                }
            })
    }


    const handleReject = (user) => {
        axiosSecure.patch(`/teacher/reject/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.error(`${user.name} is rejected as teacher`, { position: "top-right", duration: 4000, });
                    refetch()
                }
            })
    }





    return (
        <div className="overflow-x-auto p-4 lg:p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4"></h2>
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mb-6 px-2">
                <h2 className="pl-4 font-semibold text-lg md:text-xl">Manage Teacher Requests</h2>
                <label className="input input-bordered flex items-center gap-2 max-w-xs">
                    <input onChange={e => setSearch(e.target.value)} type="text" className="grow" placeholder="Search by Name" />
                    <FaSearch className="opacity-50" />
                </label>
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Experience</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teacherRequests.length > 0 ?
                            teacherRequests.map((request, index) => (
                                <tr key={request._id}>
                                    <th className="text-center">{index + 1}</th>
                                    <td>{request.name}</td>
                                    <td>
                                        <img
                                            src={request.photo}
                                            alt={request.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </td>
                                    <td>{request.experience}</td>
                                    <td>{request.title}</td>
                                    <td>{request.category}</td>
                                    <td>
                                        <span
                                            className={`badge ${request.status === "pending"
                                                ? "badge-warning"
                                                : request.status === "approved"
                                                    ? "badge-success"
                                                    : "badge-error"
                                                }`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="text-center flex gap-2 flex-wrap">
                                        <button onClick={() => handleApprove(request)} className="btn btn-success btn-sm" disabled={request.status !== "pending"}>
                                            Approve </button>
                                        <button onClick={() => handleReject(request)} className="btn btn-error btn-sm" disabled={request.status !== "pending"}>
                                            Reject</button>
                                    </td>
                                </tr>
                            ))
                            : <tr className="text-center text-xl font-bold pl-6">
                                <td> No Requests</td>
                            </tr>

                    }

                </tbody>
            </table>
        </div>
    );
};

export default TeacherRequest;