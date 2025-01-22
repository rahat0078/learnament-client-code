import { Link, useNavigate } from "react-router-dom";
import HelmetTitle from "./HelmetTitle";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginLottie from "../assets/Lottie/loginLottie.json";
import SocialLogin from "./SocialLogin";
import useAuth from "../hooks/useAuth";


const Login = () => {

    const { register, formState: { errors }, reset, handleSubmit } = useForm()
    const { loginUser, setLoading } = useAuth()
    const navigate = useNavigate()

    const onSubmit = (data) => {

        const email = data.email;
        const password = data.password

        loginUser(email, password)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
                reset()
            })
            .catch(() => {
                Swal.fire({
                    position: "top-start",
                    icon: "error",
                    title: "Invalid email or password",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false)
            })
    }



    return (
        <>
            <HelmetTitle title={"Login"}></HelmetTitle>
            <div className="hero bg-base-100 py-20">
                <div className="hero-content flex-col md:flex-row-reverse gap-12">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered" />
                                {errors.email?.type === "required" && (
                                    <p className="text-red-500 pt-4">Email is required</p>
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
                                <input type="submit" value={"Login"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                            </div>
                            <div className="divider">OR</div>
                            <SocialLogin />
                        </form>
                        <p className="text-end pb-6 pr-10">Don&apos;t have Account? <Link to="/register" className="text-blue-600 underline">Register Now</Link> </p>
                    </div>
                    <div className="w-full max-w-2xl text-center">
                        <p className="text-4xl font-semibold pb-6">Login</p>
                        <Lottie animationData={loginLottie} loop={true} />;

                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;