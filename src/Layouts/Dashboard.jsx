import { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import loadingGif from "../assets/loading.gif";
import { FaList } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import HelmetTitle from "../components/HelmetTitle";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {

    const { loading } = useAuth()


    // eslint-disable-next-line no-unused-vars
    const [student, setStudent] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [teacher, setTeacher] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [admin, setAdmin] = useState(true)




    // Links

    // Students Navlinks
    const studentsNav = <>
        <li><NavLink to="/dashboard/myEnrollClass">My enroll class</NavLink></li>
    </>;
    const adminNav = <>
        <li><NavLink to="/dashboard/teacherReq">Teacher Request</NavLink></li>
        <li><NavLink to="/dashboard/AllUsers">Users</NavLink></li>
        <li><NavLink to="/admin/AllClasses">All classes</NavLink></li>
    </>;
    const teacherNav = <>
        <li><NavLink>Add class</NavLink></li>
        <li><NavLink>My class</NavLink></li>
        <li><NavLink>All classes</NavLink></li>
    </>;



    if (loading) {
        return <>
            <div className='min-h-screen flex justify-center items-center'>
                <img className='w-64' src={loadingGif} alt="" />
            </div>
        </>
    }
    return (
        <div className="">
            <HelmetTitle title="Dashboard"></HelmetTitle>
            {/* dashboard navigation  */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}

                    <div className="ml-8 my-4">
                        <label htmlFor="my-drawer-2" className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6] drawer-button lg:hidden">
                            <FaList />
                        </label>
                    </div>

                    <div className="flex justify-center items-center min-h-screen">
                    <Outlet />
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}

                        {/* dynamic for teacher, admin, students  */}
                        {
                            student && studentsNav
                        }
                        {
                            teacher && teacherNav
                        }
                        {
                            admin && adminNav
                        }

                        {/* common  */}
                        <div className="divider"></div>
                        <li><NavLink to={'/dashboard/profile'}><CgProfile /> My Profile</NavLink></li>
                        <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    </ul>


                </div>
            </div>




            <Toaster />

        </div>
    );
};

export default Dashboard;