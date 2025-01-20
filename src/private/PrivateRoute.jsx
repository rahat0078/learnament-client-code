/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import loadingGif from '../assets/loading.gif';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) {
        return <>
            <div className='min-h-screen flex justify-center items-center'>
                <img className='w-64' src={loadingGif} alt="" />
            </div>
        </>

    }
    if (user) {
        return children
    }

    return <Navigate to='/login' />;

};

export default PrivateRoute;