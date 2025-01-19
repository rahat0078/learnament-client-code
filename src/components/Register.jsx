import { Link } from "react-router-dom";
import HelmetTitle from "./HelmetTitle";
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registerLottie from "../assets/Lottie/registerLottie.json";
import axios from "axios";


const Register = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();


    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY



    const onSubmit = async (data) => {

        // upload img to imgbb
        const imgFile = data?.photo[0]
        const formData = new FormData();
        formData.append("image", imgFile);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData)

        // FORM DATA
        const imgUrl = res.data.data.display_url
        const { name, email, password, } = data
        console.log(name, email, password, imgUrl);

        //TODO: register with email and password 

        // TODO: after registration successfully data will be added in database 


        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        reset()
    }

    const handleGoogleLogin = () => {


        //TODO: google login
        //TODO: data will added in database, and never go duplicate data

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }
    return (
        <>
            <HelmetTitle title={"Login"}></HelmetTitle>
            <div className="hero bg-base-100 py-16">
                <div className="hero-content flex-col md:flex-row gap-12">
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
                                <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered" />
                                {errors.email?.type === "required" && (
                                    <p className="text-red-500 pt-4">Email is required</p>
                                )}

                            </div>

                            {/* photo */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo (file size under 1 mb*)</span>
                                </label>
                                <input {...register("photo", { required: true })} type="file" className="file-input file-input-bordered file-input-[#05A698] w-full max-w-xs" />
                                {errors.photo?.type === "required" && (
                                    <p className="text-red-500 pt-4">Photo is required</p>
                                )}

                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="password" placeholder="Password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-500 pt-4">Password is required</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value={"Register"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                            </div>
                            <div className="divider">OR</div>
                            <p className="flex justify-end items-center gap-2 text-xl">Login With <span onClick={handleGoogleLogin} className="border p-1 rounded-full text-3xl cursor-pointer"><FcGoogle /></span></p>
                        </form>
                        <p className="text-end pb-6 pr-10">Already have Account? <Link to="/login" className="text-blue-600 underline">Login</Link> </p>
                    </div>
                    <div className="w-full max-w-2xl text-center">
                        <p className="text-4xl font-semibold">Register</p>
                        <Lottie animationData={registerLottie} loop={true} />;

                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;