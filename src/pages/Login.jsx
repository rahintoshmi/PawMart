import React from "react";
import { FaGoogle, FaPaw } from "react-icons/fa";


const LoginPage = () => {
    

    return (
        <section className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-16">
            <div className="w-full max-w-md bg-base-100 border border-base-200 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6 flex justify-center items-center gap-2">
                    Welcome Back <FaPaw className="text-primary" size={40} />
                </h2>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-base-content mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-base-content mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-base-100 py-2 rounded-lg font-semibold hover:bg-secondary transition-all"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6">
                    <button
                       
                        className="w-full flex items-center justify-center gap-2 border border-base-300 py-2 rounded-lg font-medium text-base-content hover:bg-primary/10 transition-all"
                    >
                        <FaGoogle className="text-secondary" size={18} />
                        Continue with Google
                    </button>
                </div>

                <p className="text-sm text-center text-neutral mt-6">
                    Don’t have an account?{" "}
                    <span
                       
                        className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                        Register here
                    </span>
                </p>
            </div>
        </section>
    );
};

export default LoginPage;
