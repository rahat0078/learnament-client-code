import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTeacher = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isTeacher } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/teacher/${user?.email}`)
            return res?.data?.teacher
        }
    })
    return { isTeacher }
};

export default useTeacher;