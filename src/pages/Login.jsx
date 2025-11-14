import React, { useContext, useState } from "react";
import { FaGoogle, FaPaw } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";



const Login = () => {
    const [error,setError] = useState("");
    
    const { signIn, signInWithGoogle ,setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;
        const email = form.email.value;
        signIn(email,password)
        .then(result=>{
            const user = result.user;
            setUser(user);
            toast.success('Logged In Successfully');
            navigate(location.state ? location.state : "/");
        })
        .catch(error=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setError(errorCode);
        });
    }
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                const updatedUser = {
                    ...user,
                    photoURL: user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.uid,
                };

                setUser(updatedUser); 
                toast.success("Logged in with Google Successfully!");
                navigate(location.state ? location.state : "/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-16">
            <div className="w-full max-w-md bg-base-100 border border-base-200 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6 flex justify-center items-center gap-2">
                    Welcome Back <FaPaw className="text-primary" size={40} />
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-base-content mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required name="email"
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
                            required name="password"
                            className="w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your password"
                        />
                    </div>

                    {
                        error && <p className="text-sm text-red-500">{error}</p>
                    }

                    <button
                        type="submit"
                        className="w-full bg-primary text-base-100 py-2 rounded-lg font-semibold hover:bg-secondary transition-all"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6">
                    <button onClick={handleGoogleLogin}
                       
                        className="w-full flex items-center justify-center gap-2 border border-base-300 py-2 rounded-lg font-medium text-base-content hover:bg-primary/10 transition-all"
                    >
                        <FaGoogle className="text-secondary" size={18} />
                        Continue with Google
                    </button>
                </div>

                <p className="text-sm text-center text-neutral mt-6">
                    Don’t have an account?{" "}
                    <NavLink to='/auth/register'
                        state={location.state}
                        className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                        Register here
                    </NavLink>
                </p>
            </div>
        </section>
    );
};

export default Login;
