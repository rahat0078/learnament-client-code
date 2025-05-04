import { useQuery } from '@tanstack/react-query';
import statimg from '../../assets/homeStats.jpeg';
import useAxiosPublic from './../../hooks/useAxiosPublic';


const HomeStats = () => {

    const axiosPublic = useAxiosPublic()

    const { data: users } = useQuery({
        queryKey: ["/totalUser"],
        queryFn: async () => {
            const res = await axiosPublic.get("/totalUser")
            return res.data
        }
    })
    const { data: classes } = useQuery({
        queryKey: ["/totalClasses"],
        queryFn: async () => {
            const res = await axiosPublic.get("/totalClasses")
            return res.data
        }
    })
    const { data: enrollments } = useQuery({
        queryKey: ["/totalEnrollments"],
        queryFn: async () => {
            const res = await axiosPublic.get("/totalEnrollments")
            return res.data
        }
    })


    return (
        <section className="py-8 md:py-10 lg:py-12 xl:py-14 container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 px-4">
                <div className="flex flex-col lg:space-y-6 md:space-y-4 space-y-2">
                    <div className="bg-base-100 p-6 rounded-lg shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold ">Total Users</h3>
                            <p className="text-lg ">Over {users?.totalUsers} active users</p>
                        </div>
                        <div className="text-4xl font-bold text-indigo-600">{users?.totalUsers}</div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-lg shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold ">Total Classes</h3>
                            <p className="text-lg ">Various classes available for students</p>
                        </div>
                        <div className="text-4xl font-bold text-green-600">{classes?.totalClasses}</div>
                    </div>

                    <div className="bg-base-100 p-6 rounded-lg shadow-xl flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold ">Total Enrollments</h3>
                            <p className="text-lg ">Over {enrollments?.totalEnrollments} students enrolled</p>
                        </div>
                        <div className="text-4xl font-bold text-yellow-600">{enrollments?.totalEnrollments}</div>
                    </div>
                </div>


                <div className="flex justify-center items-center">
                    <img src={statimg} className="w-full h-auto max-h-[400px] rounded-lg shadow-lg" />
                </div>
            </div>
        </section>

    );
};

export default HomeStats;