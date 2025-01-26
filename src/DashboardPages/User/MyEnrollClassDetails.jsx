import { Link, useParams } from "react-router-dom";
import SectionHeading from "../../components/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MyEnrollClassDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { register, formState: { errors }, reset, handleSubmit } = useForm();


    const { data: assignments } = useQuery({
        queryKey: [`/assignments/${id}`, id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignments/${id}`)
            return res.data
        }
    })


    const onSubmit = (data) => {
        data.classId = id
        axiosSecure.patch('/updateAssignment', data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Assignment submitted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset()
                    document.getElementById('my_modal_taskSubmit').close()
                }

            })

    }


    return (
        <div className="px-4">
            <SectionHeading title="View All Assignments for This Course" description="Access all course assignments, including details, deadlines, and submission requirements, in one place."></SectionHeading>
            <div>
                <Link to={`/dashboard/feedback/${id}`} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]">Give Feedback</Link>
            </div>
            <h2 className="text-xl mt-4 font-semibold">
                All assignments
            </h2>
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignments?.map((a, index) => <tr key={a._id}>
                                <th>{index + 1}</th>
                                <td>{a.title}</td>
                                <td>{a.description}</td>
                                <td>{a.deadline}</td>
                                <td>
                                    <button onClick={() => document.getElementById('my_modal_taskSubmit').showModal()} className="btn btn-sm text-white bg-[#05A698] hover:bg-[#058ea6]">Submit</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>





            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_taskSubmit" className="modal">
                <div className="modal-box">
                    <div className="modal-action flex flex-col">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* description  */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Assignment Link</span>
                                </label>
                                <textarea {...register("link", { required: true })} placeholder="Link" className="textarea textarea-bordered h-24" />
                                {errors.link?.type === "required" && (
                                    <p className="text-red-500 pt-4">Assignment Link is required</p>
                                )}

                            </div>


                            <div className="form-control mt-6 ">
                                <input type="submit" value={"Submit"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />

                            </div>
                        </form>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn ml-6">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default MyEnrollClassDetails;