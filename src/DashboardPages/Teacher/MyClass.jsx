import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import SectionHeading from "../../components/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";



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


    const handleUpdate = (classItem) => {
        console.log("Update class with :", classItem);
    };

    const handleDelete = (classItem) => {
        console.log("Delete class with :", classItem);
        axiosSecure.delete(`/class/delete/${classItem._id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Class Delete Successfully",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
    };

    const handleViewDetails = (classItem) => {
        console.log("View details for class with :", classItem);
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
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleUpdate(classItem)}
                                        disabled={classItem.status === "rejected"}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error "
                                        onClick={() => handleDelete(classItem)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                                <button
                                    className="btn btn-sm text-white bg-[#05A698] hover:bg-[#058ea6] flex items-center gap-1"
                                    onClick={() => handleViewDetails(classItem)}
                                    disabled={classItem.status !== "approved"}
                                >
                                    <FaEye /> See Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClass;