import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ClassDetails = () => {
    const { id } = useParams()

    const axiosSecure = useAxiosSecure()

    const { data: classData = {}, } = useQuery({
        queryKey: ["/class", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/class/${id}`)
            return res.data
        }
    })

    console.log(classData);
    return (
        <div className="container mx-auto my-16 lg:my-24 px-4">
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
                        <button className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]">Make Payment</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ClassDetails;