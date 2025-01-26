import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import Swal from "sweetalert2";

const GiveFeedback = () => {
    const { id } = useParams();
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { register, formState: { errors },reset, handleSubmit } = useForm();
    const [rating, setRating] = useState(0)
    const navigate = useNavigate()



    const { data: classInfo } = useQuery({
        queryKey: [`/class/${id}`, id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/class/${id}`)
            return res.data
        }
    })






    const onSubmit = (data) => {
        if(rating == 0){
            return "rating need"
        }
        data.title = classInfo?.title;
        data.classId = classInfo?.id;
        data.image = user?.photoURL;
        data.name = user?.displayName;
        data.rating = rating;

        axiosSecure.post("/feedback", data)
        .then(res =>  {
            console.log(res.data);
            if(res.data.insertedId){
                navigate(`/dashboard/myenroll-class/${id}`)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your feedback hase been posted",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
            }
        })

    }


    return (
        <div className="w-full max-w-xl mx-4 p-2 bg-base-200 rounded-xl">
            <div className="form-control ml-8 mt-6">
                <Rating
                    style={{ maxWidth: 180 }}
                    value={rating}
                    onChange={setRating}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {/* description  */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Feedback Description</span>
                    </label>
                    <textarea {...register("feedback", { required: true })} placeholder="Feedback" className="textarea textarea-bordered h-24" />
                    {errors.feedback?.type === "required" && (
                        <p className="text-red-500 pt-4">Feedback is required</p>
                    )}

                </div>
                <div className="form-control mt-6">
                    <input type="submit" value={"Send"} className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]" />
                </div>
            </form>
        </div>
    );
};

export default GiveFeedback;