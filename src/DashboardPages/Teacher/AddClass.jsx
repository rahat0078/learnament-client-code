import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
    const { user } = useAuth()
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const onSubmit = async (data) => {

        // img deploy to imgbb
        const imgFile = data?.img[0]
        const formData = new FormData();
        formData.append("image", imgFile);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData)
        const image = res?.data?.data?.display_url
        // FORM DATA
        const classInfo = {
            title: data.title,
            name: data.name,
            email: data.email,
            price: data.price,
            description: data.description,
            image: image,
            status: "pending"
        }

        axiosSecure.post('/addClass', classInfo)
            .then(res => {
                if (res.data.insertedId) {
                    reset()
                    navigate("/dashboard/myClass")
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Class request added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
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
                        <input {...register("title", { required: true })} type="text" placeholder="Title" className="input input-bordered" />
                        {errors.title?.type === "required" && (
                            <p className="text-red-500 pt-4">TItle is required</p>
                        )}

                    </div>
                    {/* name  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" readOnly value={user?.displayName} className="input input-bordered" />
                        {errors.name?.type === "required" && (
                            <p className="text-red-500 pt-4">Name is required</p>
                        )}

                    </div>

                    {/* email  */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email",)} type="email" readOnly value={user?.email} className="input input-bordered" />


                    </div>

                    {/* price  */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Course Price</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered" />
                        {errors.price?.type === "required" && (
                            <p className="text-red-500 pt-4">Price is required</p>
                        )}

                    </div>
                    {/* description  */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Course Description</span>
                        </label>
                        <textarea {...register("description", { required: true })} placeholder="Description" className="textarea textarea-bordered" />
                        {errors.description?.type === "required" && (
                            <p className="text-red-500 pt-4">Description is required</p>
                        )}

                    </div>

                    {/* photo */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image (file size under 1 mb*)</span>
                        </label>
                        <input {...register("img", { required: true })} type="file" className="file-input file-input-bordered file-input-[#05A698] w-full max-w-xs" />
                        {errors.img?.type === "required" && (
                            <p className="text-red-500 pt-4">Image is required</p>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value={"Add Class"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;