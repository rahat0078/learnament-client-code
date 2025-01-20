import { FcGoogle } from "react-icons/fc";
import useAuth from './../hooks/useAuth';
import Swal from "sweetalert2";
import useAxiosPublic from './../hooks/useAxiosPublic';
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { googleLogin, setLoading } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()


    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId || res.data.message == "user already exist in db") {
                            setLoading(false)
                        }
                    })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign In with google Successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/')
            })
            .catch(err => {
                Swal.fire({
                    position: "top-start",
                    icon: "error",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(err.message);
                setLoading(false)
            })
    }


    return (
        <>
            <p className="flex justify-end items-center gap-2 text-xl">Login With <span onClick={handleGoogleLogin} className="border p-1 rounded-full text-3xl cursor-pointer"><FcGoogle /></span></p>
        </>
    );
};

export default SocialLogin;