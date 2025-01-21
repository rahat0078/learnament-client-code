import { useForm } from "react-hook-form";
import HelmetTitle from "../../components/HelmetTitle";
import SectionHeading from './../../components/SectionHeading';
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { IoIosDoneAll } from "react-icons/io";
import Lottie from "lottie-react";
import teacherApproveCelebrate from '../../assets/Lottie/teacherApproveCelebrate.json';
import { ImCross } from "react-icons/im";
import LoadingSpinner from './../../components/LoadingSpinner';

const TeachOnLM = () => {

    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data = [], isPending, refetch } = useQuery({
        queryKey: ['teacherReq'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/teacherReq/${user?.email}`)
            return res.data
        }
    })



    const onSubmit = (data) => {
        data.status = "pending";

        axiosSecure.post('/teacherReq', data)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Submitted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
        reset()
    }

    const applyAgain = () => {
        axiosSecure.patch(`/teacherReqAgain/${data?._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Request sent successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })

    }


    if(isPending){
        return <>
            <LoadingSpinner/>
        </>
    }

    return (
        <div className="container mx-auto min-h-screen pt-12 px-4">
            <HelmetTitle title={"Teach On"}></HelmetTitle>
            <SectionHeading title="Teach On Learnament" description="Share your expertise and inspire learners worldwide."></SectionHeading>

            <div className="flex justify-center flex-col items-center py-12">

                {/* status pending  */}

                {
                    data?.status === 'pending' && <>
                        <div className="flex flex-col max-w-xl p-6 bg-base-200 shadow-lg rounded-2xl">
                            <h2 className="text-2xl font-semibold mb-4">Teach on LearnaMent</h2>
                            <p className="text-lg mb-4">
                                Your application is currently pending. Please check back later for updates.
                            </p>
                            <div className="flex items-center space-x-2">
                                <FaSpinner className="animate-spin text-xl text-blue-500" />
                                <span className="text-gray-500">Processing...</span>
                            </div>
                            <div className="badge badge-warning badge-lg mt-4">Pending</div>

                        </div>
                    </>
                }
                {/* status approved  */}
                {
                    data?.status === 'approved' && <>
                        <div className="flex flex-col max-w-xl p-6 bg-base-200 shadow-lg rounded-2xl">
                            <div className="flex items-center">
                                <Lottie className="w-full max-w-xs" animationData={teacherApproveCelebrate} loop={true} />
                                <h2 className="text-warning text-2xl md:text-3xl font-bold -rotate-45">Congratulations</h2>
                            </div>
                            <p className="text-lg mb-4">
                                Congratulations! You are now a Teacher on LearnaMent. Start creating your courses and sharing your knowledge with students.
                            </p>
                            <div className="flex items-center space-x-2">
                                <IoIosDoneAll className="text-3xl text-blue-500" />
                                <span className="text-gray-500">Approved</span>
                            </div>
                            <div className="badge badge-success text-white badge-lg mt-4">Approved</div>

                        </div>
                    </>
                }

                {/* status reject  */}
                {
                    data?.status === 'rejected' && <>
                        <div className="flex flex-col max-w-xl p-6 bg-base-200 shadow-lg rounded-2xl">
                            <p className="text-lg mb-4">
                                Unfortunately, your request was not approved this time. Please click the button below to request again.
                            </p>
                            <div className="flex items-center space-x-2">
                                <ImCross className="text-red-500" />
                                <span className="text-gray-500">Rejected</span>
                            </div>
                            <div className="flex justify-between">
                                <div className="badge badge-error badge-lg mt-4">Rejected</div>
                                <button onClick={applyAgain} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]">Request to Apply Again</button>
                            </div>
                        </div>
                    </>
                }

                {/* submit form  */}
                {
                    !data?.status ? <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* name  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                                {errors.name?.type === "required" && (
                                    <p className="text-red-500 pt-4">Name is required</p>
                                )}

                            </div>

                            {/* email  */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email",)} type="email" placeholder="Email" readOnly value={user?.email} className="input input-bordered" />


                            </div>

                            {/* photo */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input {...register("photo",)} type="text" value={user?.photoURL} disabled className="input input-bordered" />

                            </div>

                            {/* experienced */}

                            <div>
                                <label className="label">
                                    <span className="label-text">Experience Level</span>
                                </label>
                                <select {...register("experience", { required: true })} className="select select-bordered w-full">
                                    <option value="beginner">Beginner</option>
                                    <option value="mid-level">Mid-level</option>
                                    <option value="experienced">Experienced</option>
                                </select>
                                {errors.experience?.type === "required" && (
                                    <p className="text-red-500 pt-4">Experience Level is required</p>
                                )}
                            </div>

                            {/* title  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Teaching Title</span>
                                </label>
                                <input {...register("title", { required: true })} type="text" placeholder="Title" className="input input-bordered" />
                                {errors.title?.type === "required" && (
                                    <p className="text-red-500 pt-4">Teaching Title is required</p>
                                )}

                            </div>

                            {/* category */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select {...register("category", { required: true })} className="select select-bordered w-full">
                                    <option value="Web Development">Web Development</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="english">English Grammar</option>
                                    <option value="Content Writing">Content Writing</option>
                                </select>
                                {errors.category?.type === "required" && (
                                    <p className="text-red-500 pt-4">Category is required</p>
                                )}

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value={"Submit for review"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                            </div>
                        </form>
                    </div> : ""
                }
            </div>


        </div>
    );
};

export default TeachOnLM;