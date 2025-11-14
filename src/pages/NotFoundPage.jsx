import React from "react";
import { FaHome, FaPaw } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
            <div className="text-center bg-white border border-base-200 rounded-2xl shadow-xl px-10 py-14 max-w-lg w-full">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <FaPaw className="text-primary text-5xl" />
                    </div>
                </div>

            
                <h1 className="text-6xl font-extrabold text-primary mb-2">404</h1>
                <h2 className="text-2xl font-bold text-secondary mb-4">
                    Page Not Found
                </h2>
                <p className="text-neutral mb-8">
                    Oops! The page you’re looking for doesn’t exist or has been moved.
                    Let’s get you back to the home of happy paws.
                </p>

             
                <a
                    href="/"
                    className="btn text-white border-none bg-primary hover:bg-secondary transition flex items-center justify-center gap-2"
                >
                    <FaHome /> Go Back Home
                </a>
            </div>
            <p className="mt-10 text-neutral text-sm opacity-80">
                &copy; {new Date().getFullYear()} <span className="text-accent">PawMart</span> • Pet Adoption & Supply Portal
            </p>
        </section>
    );
};

export default NotFoundPage;
