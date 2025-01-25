import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TiPlus } from "react-icons/ti";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MyClassDetailsTeacher = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { register, formState: { errors }, reset, handleSubmit } = useForm();

    const { data: classDetails, refetch: refetchClassDetails } = useQuery({
        queryKey: [`/class/${id}`, id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/class/${id}`)
            return res.data
        }
    })

    const { data: assignments, refetch: refetchAssignments } = useQuery({
        queryKey: [`/assignments/${id}`, id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignments/${id}`)
            return res.data
        }
    })

    console.log(assignments);

    const onSubmit = (data) => {
        data.totalAssignmentSubmit = 0
        data.classId = id
        console.log(data);
        axiosSecure.post('/createAssignment', data)
            .then(res => {
                if (res.data.insertedId) {
                    refetchClassDetails()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Assignment created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                    refetchAssignments()
                    document.getElementById('my_modal_1').close();
                }
            })
    }


    return (
        <div>

            <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-200 text-center mb-6">
                <div className="stat">
                    <div className="stat-title">Total enrollments</div>
                    <div className="stat-value mt-4">{classDetails?.enrollmentCount ? classDetails?.enrollmentCount : "0"}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total assignments</div>
                    <div className="stat-value mt-4">{classDetails?.totalAssignments ? classDetails.totalAssignments : "0"}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total  Assignment submission</div>
                    <div className="stat-value mt-4">
                        {classDetails?.totalAssignmentSubmit ? classDetails.totalAssignmentSubmit : "0"}
                    </div>
                </div>
            </div>
            <div>
                <button
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                    className="btn md:text-lg rounded-full text-white bg-[#05A698] hover:bg-[#058ea6]"><TiPlus />
                    Create</button>
            </div>


            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignments?.map((a, index ) => <tr key={a._id}>
                            <th>{index + 1}</th>
                            <td>{a.title}</td>
                            <td>{a.description}</td>
                            <td>{a.deadline}</td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>














            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Assignment on your course!</h3>
                    <div className="modal-action flex flex-col justify-center">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* title  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Assignment Title</span>
                                </label>
                                <input {...register("title", { required: true })} type="text" placeholder="Title" className="input input-bordered" />
                                {errors.title?.type === "required" && (
                                    <p className="text-red-500 pt-4">TItle is required</p>
                                )}

                            </div>
                            {/* description  */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Assignment Description</span>
                                </label>
                                <textarea {...register("description", { required: true })} placeholder="Description" className="textarea textarea-bordered h-24" />
                                {errors.description?.type === "required" && (
                                    <p className="text-red-500 pt-4">Description is required</p>
                                )}

                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Deadline</span>
                                </label>
                                <input {...register("deadline", { required: true })} type="date" placeholder="Deadline" className="input input-bordered" />
                                {errors.deadline?.type === "required" && (
                                    <p className="text-red-500 pt-4">Description is required</p>
                                )}

                            </div>

                            <div className="form-control mt-6 ">
                                <input type="submit" value={"Add Class"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />

                            </div>
                        </form>
                        <form method="dialog">
                            <button className="btn ml-6">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyClassDetailsTeacher;