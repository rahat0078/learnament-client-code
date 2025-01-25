import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaArrowTrendUp } from "react-icons/fa6";
import SectionHeading from "../../components/SectionHeading";
import { Link } from "react-router-dom";

const MyEnrollClass = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: enrolledClasses = [], isPending } = useQuery({
        queryKey: ['/myEnrollment/:email', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myEnrollment/${user.email}`)
            return res.data
        }
    })




    if (isPending) {
        return <LoadingSpinner />
    }

    return (
        <div className="p-4 md:p-6">
            <SectionHeading title="Your Enrolled Classes" description="Explore the classes you’ve enrolled in and continue your learning journey. Stay on track with your goals by resuming your favorite classes anytime. Your path to knowledge is just a click away!"></SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 mb-1">
                {enrolledClasses.map((classItem) => <div key={classItem._id} className="card card-compact bg-base-200 shadow-xl">
                    <figure className="relative">
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-full h-52 object-cover rounded-t-lg"
                        />
                    </figure>
                    <div className="card-body flex flex-col justify-between">
                        <div>
                        <h3 className="card-title">{classItem.title}</h3>
                        <p className=""><strong>Instructor:</strong> {classItem.name}</p>
                        </div>
                        <div className="card-actions">
                            <Link to={`/dashboard/myenroll-class/${classItem.classId}`} className="mt-4 btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]">
                                Continue <FaArrowTrendUp />

                                </Link>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default MyEnrollClass;