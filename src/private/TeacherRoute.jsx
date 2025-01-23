import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useTeacher from "../hooks/useTeacher";

// eslint-disable-next-line react/prop-types
const TeacherRoute = ({children}) => {
    const { user, loading } = useAuth()
    const { isTeacher, isPending } = useTeacher()

    if (loading || isPending) {
        return <LoadingSpinner />
    }
    if (user && isTeacher) {
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default TeacherRoute;