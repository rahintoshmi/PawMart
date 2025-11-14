import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logoremove.png";
import { FiMenu } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Logged Out Successfully"))
            .catch((error) => toast.error(error.message));
    };
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="navbar w-full mx-auto fixed top-0 left-0 z-50  backdrop-blur-md border-b border-base-200 bg-base-100">
            <div className="navbar-start">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
                </div>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold text-base-content text-primary">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/pets/supplies">Pets & Supplies</NavLink>
                    </li>
                    {user && (
                        <>
                            <li>
                                <NavLink to="/auth/add-listing">Add Listing</NavLink>
                            </li>
                            <li>
                                <NavLink to="/auth/my-listings">My Listings</NavLink>
                            </li>
                            <li>
                                <NavLink to="/auth/my-orders">My Orders</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-2">
                {/* Theme toggle button */}
                <button
                    onClick={toggleTheme}
                    className="text-base-content hover:text-primary"
                    title="Toggle Theme"
                >
                    {theme === "light" ? (
                        <svg
                            className="swap-off h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                    ) : (
                            <svg
                                className="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                    )}
                </button>

                {/* User Section */}
                {user ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                user?.photoURL ||
                                "https://i.ibb.co/shrtQrW/istockphoto-1477583639-612x612.jpg"
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-secondary object-cover"
                        />
                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary btn-sm lg:btn-md text-white hidden lg:block"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                        <div className="hidden lg:flex items-center gap-3 ">
                        <NavLink
                            to="/auth/login"
                            className="btn btn-outline btn-secondary btn-sm md:btn-md"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/auth/register"
                            className="btn btn-primary btn-sm lg:btn-md text-white"
                        >
                            Register
                        </NavLink>
                    </div>
                )}

                {/* Mobile Menu */}
                <div className="dropdown dropdown-end lg:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="btn btn-ghost"
                    >
                        <FiMenu className="text-2xl text-base-content" />
                    </button>
                    <ul
                        className={`menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box mt-3 w-52 p-2 shadow ${menuOpen ? "block" : "hidden"
                            }`}
                    >
                        <li>
                            <NavLink to="/" className="hover:underline">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/pets/supplies" className="hover:underline">
                                Pets & Supplies
                            </NavLink>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <NavLink to="/auth/add-listing" className="hover:underline">
                                        Add Listing
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/auth/my-listings" className="hover:underline">
                                        My Listings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/auth/my-orders" className="hover:underline">
                                        My Orders
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left hover:underline"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {!user && (
                            <>
                                <li>
                                    <NavLink to="/auth/login" className="hover:underline">
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/auth/register" className="hover:underline">
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
