import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Swal from "sweetalert2";

const UpdateClass = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()


    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    const { data: classData = {}, } = useQuery({
        queryKey: ["/class", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/class/${id}`)
            return res.data
        }
    })


    useEffect(() => {
        if (classData) {
            setValue("title", classData.title || "");
            setValue("name", classData.name || "");
            setValue("email", classData.email || "");
            setValue("price", classData.price || "");
            setValue("description", classData.description || "");
            setValue("image", classData.image || "");
        }
    }, [classData, setValue]);

    const onSubmit = (data) => {
        axiosSecure.patch(`/classUpdate/${id}`, data)
        .then(res => {
            if(res.data.modifiedCount){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Class updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        
    }


    return (
        <div className="max-w-xl w-full my-16">
            <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                <h2 className="text-center mt-4 text-2xl font-semibold">Add Your Course</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    {/* title  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Course Title</span>
                        </label>
                        <input {...register("title", { required: true })} type="text" defaultValue={classData?.title || ""} placeholder="Title" className="input input-bordered" />
                        {errors.title?.type === "required" && (
                            <p className="text-red-500 pt-4">TItle is required</p>
                        )}

                    </div>
                    {/* name  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" readOnly value={classData?.name || ""} className="input input-bordered" />
                        {errors.name?.type === "required" && (
                            <p className="text-red-500 pt-4">Name is required</p>
                        )}

                    </div>

                    {/* email  */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email",)} type="email" readOnly value={classData?.email || ""} className="input input-bordered" />


                    </div>

                    {/* price  */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Course Price</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" defaultValue={classData?.price || ""} placeholder="Price" className="input input-bordered" />
                        {errors.price?.type === "required" && (
                            <p className="text-red-500 pt-4">Price is required</p>
                        )}

                    </div>
                    {/* description  */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Course Description</span>
                        </label>
                        <textarea {...register("description", { required: true })} defaultValue={classData?.description || ""} placeholder="Description" className="textarea textarea-bordered h-24" />
                        {errors.description?.type === "required" && (
                            <p className="text-red-500 pt-4">Description is required</p>
                        )}

                    </div>

                    {/* photo */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input {...register("image")} disabled defaultValue={classData?.image || ""} className="input" />


                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value={"Update Class"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;