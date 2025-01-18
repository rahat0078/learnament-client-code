import { useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/learnament-logo.png';

const Navbar = () => {

    const [user, setUser] = useState(true)

    const handleLogout = () => {
        setUser(false)
    }

    const navlinks = <>
        <li><NavLink to="/"
            className={({ isActive }) =>
                isActive ? "text-orange-600 bg-none" : "text-black"
            }
        >Home</NavLink></li>
        <li><NavLink to="/allClasses"
            className={({ isActive }) =>
                isActive ? "text-orange-600 bg-none" : "text-black"
            }>All Classes</NavLink></li>
        <li><NavLink to="/TeachOnLearnament"
            className={({ isActive }) =>
                isActive ? "text-orange-600 bg-none" : "text-black"
            }>Teach on LearnaMent</NavLink></li>
    </>

    return (
        <div className="navbar container mx-auto">
            <div className="navbar-start">
                <Link to="/" className="flex items-center gap-2 border p-1 rounded"><img className="w-12 h-12 " src={logo} alt="" /> <span className="text-lg">LearnaMent</span> </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 md:text-lg">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="avatar online">
                            <div className="w-12 h-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 right-0 p-2 shadow-xl">
                            <p className="text-center py-2 text-lg font-semibold">Username</p>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><a onClick={handleLogout} className="text-[#05A698]"><FaArrowRightFromBracket />
                                Logout</a></li>
                        </ul>
                    </div> : <Link to='/login' className="btn md:text-lg text-white bg-[#05A698] hover:bg-[#058ea6]">Login</Link>
                }



                {/* dropdown responsive */}

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <IoMdMenu className="w-6 h-6" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 w-48 mt-3 p-2 shadow right-0">
                        {navlinks}
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default Navbar;