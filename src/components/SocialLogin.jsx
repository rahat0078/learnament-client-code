import { FcGoogle } from "react-icons/fc";
import useAuth from './../hooks/useAuth';
import Swal from "sweetalert2";

const SocialLogin = () => {

    const { googleLogin, setLoading } = useAuth()

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log(res.user);
                console.log(res.user.email);
                if (res?.user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Sign In with google Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
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