import { FaArrowRightFromBracket, FaMoon } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/learnament-logo.png';
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import ThemeContext from "../Provider/ThemeContext";
import { LuSunMedium } from "react-icons/lu";

const Navbar = () => {

    const { user, logoutUser } = useAuth();
    const { theme, setTheme } = useContext(ThemeContext)


    const handleLogout = () => {
        logoutUser()
    }

    const navlinks = <>
        <li><NavLink to="/"
            className={({ isActive }) =>
                isActive ? "text-orange-600 bg-none" : ""
            }
        >Home</NavLink></li>
        <li><NavLink to="/allClasses"
            className={({ isActive }) =>
                isActive ? "text-orange-600 bg-none" : ""
            }>All Classes</NavLink></li>
        {
            user?.email ? <li><NavLink to="/TeachOnLearnament"
                className={({ isActive }) =>
                    isActive ? "text-orange-600 bg-none" : ""
                }>Teach on LearnaMent</NavLink></li> : ""
        }
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
                <label className="swap swap-rotate mr-4">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                    />
                    {
                        theme === "dark" ? (
                            <LuSunMedium className="swap-on h-8 w-8 fill-current" />
                        ) : (
                            <FaMoon className="swap-off h-8 w-8 fill-current" />
                        )
                    }
                </label>

                {
                    user?.email ? <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button">
                            <div className="w-14 h-14">
                                <img className="w-full h-14 border rounded-full object-fill" src={user?.photoURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 right-0 p-2 shadow-xl">
                            <p className="text-center py-2 text-lg font-semibold">{user?.displayName}</p>
                            <li><Link to="/dashboard/profile">Dashboard</Link></li>
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
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-20 w-48 mt-3 p-2 shadow right-0">
                        {navlinks}
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default Navbar;