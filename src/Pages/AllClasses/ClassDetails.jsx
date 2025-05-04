import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const ClassDetails = () => {
    const { id } = useParams()
    const {user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: classData = {}, } = useQuery({
        queryKey: ["/class", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/class/${id}`)
            return res.data
        }
    })

    const handlePayment = (classInfo) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to enroll this course?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                const enorllInfo = {
                    classId: classInfo._id,
                    title: classInfo.title,
                    name: classInfo.name,
                    image: classInfo.image,
                    studentEmail: user?.email
                }
                axiosSecure.post('/enrollClass', enorllInfo)
                .then(res => {
                    if(res.data.insertedId){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Successfully enroll this course",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(`/dashboard/myenroll-class/${id}`)
                    }
                })
            }
        });
    }



    return (
        <div className="container mx-auto section section-bottom flex justify-center items-center px-2 lg:px-0 min-h-[52vh]">
            <div className="card lg:card-side shadow-xl max-w-5xl w-full mx-auto">
                <figure>
                    <img
                        src={classData.image}
                        className="w-full max-h-[400px] h-full object-cover"
                        alt="Album" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{classData.title}</h2>
                    <p>{classData.description}</p>
                    <p><strong>Price:</strong> $ {classData.price}</p>
                    <p><strong>Instructor:</strong> {classData.name}</p>
                    <p><strong>Email:</strong> {classData.email}</p>
                    <p><strong>Enrollment:</strong> {
                        classData?.enrollmentCount ? classData?.enrollmentCount : 0
                    }
                    </p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handlePayment(classData)} className="btn-primary">Make Payment</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ClassDetails;