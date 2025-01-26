import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import SectionHeading from "../../components/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const MyClass = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: classes = [], refetch } = useQuery({
        queryKey: [`/classes/teacher/user.email`, user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/teacher/${user?.email}`)
            return res.data
        }
    })

    const handleDelete = (classItem) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/class/delete/${classItem._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Class deleted successfully",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    };


    return (
        <div className="px-6 my-16">
            <SectionHeading title="My Classes" description="Manage your classes, track progress, and update details in one place."></SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
                {classes.map((classItem) => (
                    <div key={classItem._id} className="card shadow-xl">
                        <figure>
                            <img
                                src={classItem.image}
                                className="w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-lg font-bold">{classItem.title}</h2>
                            <p className="text-sm text-gray-500">
                                <strong>Teacher:</strong> {classItem.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Email:</strong> {classItem.email}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Price:</strong> ${classItem.price}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Description:</strong> {classItem.description}
                            </p>
                            <div
                                className={`badge ${classItem.status === "pending"
                                    ? "badge-warning"
                                    : classItem.status === "approved" ? "badge-success" : "badge-error"
                                    } mt-2`}
                            >
                                {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                            </div>
                            <div className="card-actions mt-4 flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <Link
                                        to={`/dashboard/classUp/${classItem._id}`}
                                        className="btn btn-sm btn-primary"
                                        disabled={classItem.status === "rejected"}
                                    >
                                        <FaEdit />
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-error "
                                        onClick={() => handleDelete(classItem)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                                <Link
                                    to={`/dashboard/my-class/${classItem._id}`}
                                    className="btn btn-sm text-white bg-[#05A698] hover:bg-[#058ea6] flex items-center gap-1"
                                    disabled={classItem.status !== "approved"}
                                >
                                    <FaEye /> See Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClass;