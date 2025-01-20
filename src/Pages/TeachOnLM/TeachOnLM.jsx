import { useForm } from "react-hook-form";
import HelmetTitle from "../../components/HelmetTitle";
import SectionHeading from './../../components/SectionHeading';
import useAuth from "../../hooks/useAuth";

const TeachOnLM = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useAuth()


    const onSubmit = (data) => {
        console.log(data);

    }


    return (
        <div className="container mx-auto min-h-screen pt-12">
            <HelmetTitle title={"Teach On"}></HelmetTitle>
            <SectionHeading title="Teach On Learnament" description="Share your expertise and inspire learners worldwide."></SectionHeading>

            <div className="flex justify-center items-center py-12">
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
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
                            <input type="submit" value={"Submit"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default TeachOnLM;