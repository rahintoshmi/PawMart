import React from "react";
import { NavLink } from "react-router";
import logo from "../assets/logoremove.png";

const Footer = () => {
    return (
        <footer className="bg-secondary text-base-100 w-full">
            <div className="px-13 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img src={logo} alt="PawMart Logo" className="h-16 w-auto mb-3" />
                    <p className="text-sm text-base-100/90 ms-6 ">
                        PawMart connects local pet owners and buyers <br /> for adoption and pet
                        care products.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-lg font-semibold mb-3 text-accent">
                        Useful Links
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink to="/" className="hover:text-accent transition-colors">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contact"
                                className="hover:text-accent transition-colors"
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/terms"
                                className="hover:text-accent transition-colors"
                            >
                                Terms & Conditions
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:flex flex-col items-center lg:items-end text-center lg:text-right">
                    <h3 className="text-lg font-semibold mb-3 text-accent">About Us</h3>
                    <p className="text-sm text-base-100/90 max-w-xs">
                        We aim to create a friendly space where every paw finds its perfect
                        home.
                    </p>
                </div>
            </div>
            <div className="border-t border-base-100/30 mt-8 py-4 text-center text-sm text-base-100/90">
                © {new Date().getFullYear()} <span className="font-bold text-accent">PawMart</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
