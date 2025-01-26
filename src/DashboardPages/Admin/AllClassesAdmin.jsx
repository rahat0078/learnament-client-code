import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionHeading from "../../components/SectionHeading";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllClassesAdmin = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allClasses = [], isPending, refetch } = useQuery({
        queryKey: ['/classes/admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes/admin')
            return res.data
        }
    })

    const handleApprove = (classItem) => {
        axiosSecure.patch(`/classes/approveAdmin/${classItem._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Class Approved",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    refetch()
                }
            })
    }

    const handleReject = (classItem) => {
        axiosSecure.patch(`/classes/rejectAdmin/${classItem._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Class Approved",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    refetch()
                }
            })
    }


    if (isPending) {
        return <> <LoadingSpinner /></>
    }


    return (
        <div className="bg-base-200 mx-4 p-4 my-16 rounded-xl shadow-md">
            <SectionHeading title="Manage All Classes" description="View, review, and manage class submissions with ease. Approve or reject classes while tracking their status efficiently."></SectionHeading>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allClasses.map((classItem, index) => (
                            <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td>{classItem.title}</td>
                                <td>
                                    <img
                                        src={classItem.image}
                                        alt={classItem.title}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                </td>
                                <td>{classItem.email}</td>
                                <td className="p-0 max-w-[250px]">{classItem.description}</td>
                                <td>
                                    <span
                                        className={`badge ${classItem.status === "pending"
                                            ? "badge-warning"
                                            : classItem.status === "approved"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {classItem.status}
                                    </span>
                                    <Link to={`/dashboard/my-class/${classItem._id}`} className="btn btn-xs text-white bg-[#05A698] hover:bg-[#058ea6] ml-2"
                                    disabled={classItem.status !== "approved"}>
                                        Progress
                                    </Link>
                                </td>
                                <td className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleApprove(classItem)}
                                        className="btn btn-success btn-xs"
                                        disabled={classItem.status !== "pending"}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(classItem)}
                                        className="btn btn-error btn-xs"
                                        disabled={classItem.status !== "pending"}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllClassesAdmin;