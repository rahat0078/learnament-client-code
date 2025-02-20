import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://learnament-server-side.vercel.app'
})

// https://learnament-server-side.vercel.app


const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logoutUser, setLoading} = useAuth()

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `bearer ${token}`;
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status;
        if (status == 401 || status == 403) {
            await logoutUser()
            navigate('/login')
            setLoading(false)
        }
        return Promise.reject(error)
    })


    return axiosSecure
};

export default useAxiosSecure;