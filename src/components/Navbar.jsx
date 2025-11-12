import React from 'react';
import { NavLink } from 'react-router';
import logo from '../assets/logoremove.png';
import { FiMenu } from 'react-icons/fi';


const Navbar = () => {
    return (
        <div className="navbar bg-base-100 ">

            <div className="navbar-start">
                <NavLink to="/" className="flex items-center gap-2 text-xl">
                    <img
                        src={logo}
                        alt="Logo"
                        className='w-50 h-16'
                    />
                </NavLink>
            </div>


            <div className="navbar-center hidden md:flex">

                <ul className="menu menu-horizontal px-1  font-semibold text-neutral hover:text-primary ">
                    <li><NavLink to="/" className='hover:underline'>Home</NavLink></li>
                    <li><NavLink to="/pets" className='hover:underline'>Pets & Supplies</NavLink></li>
                </ul>
            </div>


            <div className="navbar-end gap-2">


                <div className="hidden sm:flex gap-2">
                   
                    <NavLink
                        to="/login"

                        className="btn btn-outline btn-secondary btn-sm md:btn-md"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"

                        className="btn btn-primary btn-sm md:btn-md"
                    >
                        Register
                    </NavLink>
                </div>


                <div className="dropdown dropdown-end md:hidden">
                    <button tabIndex={0} className="btn btn-ghost">

                        <FiMenu className="text-2xl text-primary" />
                    </button>
                    <ul
                        tabIndex={0}

                        className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-40 p-2 shadow"
                    >
                        <li><NavLink to="/" className='hover:underline text-neutral hover:text-primary'>Home</NavLink></li>
                        <li><NavLink to="/pets" className='hover:underline text-neutral hover:text-primary '>Pets & Supplies</NavLink></li>
                        <li className='sm:hidden'><NavLink to="/login" className='hover:underline text-neutral hover:text-primary '>Login</NavLink></li>
                        <li className='sm:hidden'><NavLink to="/register" className='hover:underline text-neutral hover:text-primary '>Register</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;