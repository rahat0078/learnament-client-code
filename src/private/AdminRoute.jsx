import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const { isAdmin, isPending } = useAdmin()


    if (loading || isPending) {
        return <LoadingSpinner/>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/login'></Navigate>
}

export default AdminRoute;