import { Link, useNavigate } from "react-router-dom";
import HelmetTitle from "./HelmetTitle";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import registerLottie from "../assets/Lottie/registerLottie.json";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Register = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { registerUser, updateUserProfile, setLoading } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()


    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY



    const onSubmit = async (data) => {
        // upload img to imgbb
        const imgFile = data?.photo[0]
        const formData = new FormData();
        formData.append("image", imgFile);
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData)
        // FORM DATA
        const photo = res?.data.data.display_url
        const email = data?.email
        const password = data?.password
        const name = data?.name

        // console.log(photo);

        // user registration 
        registerUser(email, password)
            .then(() => {
                updateUserProfile(name, photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: photo,

                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    {
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Registration Successfully",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        reset()
                                        navigate('/')
                                    }
                                }
                            })
                    })
            })
            .catch((error) => {
                console.log(error.message);
                setLoading(false)
            })




    }


    return (
        <>
            <HelmetTitle title={"Register"}></HelmetTitle>
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

                            {/* password  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                            message: "Password must include at least one uppercase letter, one lowercase letter, and one number"
                                        }
                                    })}
                                    type="password" placeholder="Password" className="input input-bordered" />
                                {errors.password && (
                                    <p className="text-red-500 pt-4">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value={"Register"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                            </div>
                            <div className="divider">OR</div>
                            <SocialLogin />
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