import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllClasses from './../Pages/AllClasses/AllClasses';
import TeachOnLM from './../Pages/TeachOnLM/TeachOnLM';
import Login from "../components/Login";
import Dashboard from "../Layouts/Dashboard";
import Register from "../components/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: "/allClasses",
                element: <AllClasses/>
            },
            {
                path: "/TeachOnLearnament",
                element: <TeachOnLM/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard/>
    }
]);

export default router;