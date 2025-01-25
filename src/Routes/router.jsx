import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllClasses from './../Pages/AllClasses/AllClasses';
import TeachOnLM from './../Pages/TeachOnLM/TeachOnLM';
import Login from "../components/Login";
import Dashboard from "../Layouts/Dashboard";
import Register from "../components/Register";
import PrivateRoute from "../private/PrivateRoute";
import MyProfile from "../components/MyProfile";
import AllUsers from "../DashboardPages/Admin/AllUsers";
import TeacherRequest from "../DashboardPages/Admin/TeacherRequest";
import AdminRoute from "../private/AdminRoute";
import AddClass from "../DashboardPages/Teacher/AddClass";
import MyClass from "../DashboardPages/Teacher/MyClass";
import TeacherRoute from "../private/TeacherRoute";
import MyEnrollClass from "../DashboardPages/User/MyEnrollClass";
import AllClassesAdmin from "../DashboardPages/Admin/AllClassesAdmin";
import ClassDetails from "../Pages/AllClasses/ClassDetails";
import UpdateClass from "../DashboardPages/Teacher/UpdateClass";
import MyClassDetailsTeacher from "../DashboardPages/Teacher/MyClassDetailsTeacher";
import MyEnrollClassDetails from "../DashboardPages/User/MyEnrollClassDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/allClasses",
                element: <AllClasses />
            },
            {
                path: "/class/:id",
                element: <PrivateRoute>
                    <ClassDetails/>
                </PrivateRoute>
            },
            {
                path: "/TeachOnLearnament",
                element: <PrivateRoute>
                    <TeachOnLM />
                </PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard />
        </PrivateRoute>,
        children: [
            {
                path: "/dashboard/profile",
                element: <MyProfile />
            },


            // teacher route 
            {
                path: "/dashboard/addClass",
                element: <TeacherRoute>
                    <AddClass />
                </TeacherRoute>
            },
            {
                path: "/dashboard/myClass",
                element: <TeacherRoute>
                    <MyClass />
                </TeacherRoute>
            },
            {
                path: "/dashboard/my-class/:id",
                element: <TeacherRoute>
                    <MyClassDetailsTeacher/>
                </TeacherRoute>
            },
            {
                path: "/dashboard/classUp/:id",
                element: <TeacherRoute>
                    <UpdateClass/>
                </TeacherRoute>
            },


            
            // student route
            {
                path: "/dashboard/myEnrollClass",
                element: <MyEnrollClass/>
            },
            {
                path: "/dashboard/myenroll-class/:id",
                element: <MyEnrollClassDetails></MyEnrollClassDetails>
            },



            // admin route 
            {
                path: '/dashboard/AllUsers',
                element: <AdminRoute>
                    <AllUsers />
                </AdminRoute>
            },
            {
                path: '/dashboard/teacherReq',
                element: <AdminRoute>
                    <TeacherRequest />
                </AdminRoute>
            },
            {
                path: "/dashboard/admin/AllClasses",
                element: <AdminRoute>
                    <AllClassesAdmin></AllClassesAdmin>
                </AdminRoute>
            }
        ]
    }
]);

export default router;