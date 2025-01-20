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
                element: <MyProfile/>
            }
        ]
    }
]);

export default router;