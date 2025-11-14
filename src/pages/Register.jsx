import React, { useContext } from "react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle, FaPaw } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";



const Register = () => {
    const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLengthValid = password.length >= 6;

        if (!hasUppercase) {
            toast.error("Password must contain at least one uppercase letter.");
            return;
        }
        if (!hasLowercase) {
            toast.error("Password must contain at least one lowercase letter.");
            return;
        }
        if (!isLengthValid) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateProfile(user, { displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        toast.success('Registered Successfully');
                        navigate(location.state ? location.state : "/");
                    })
                    .catch(err => toast.error(err.message));
            })
            .catch(err => toast.error(err.message));

        
    }
    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then((user) => {
                toast.success("Registered with Google!");

                setTimeout(() => {
                    navigate(location.state || "/");
                }, 150);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };


    
    

    return (
        <section className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-16">
            <div className="w-full max-w-md bg-base-100 border border-base-200 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-primary mb-6 flex justify-center items-center gap-2">
                    Create Account <FaPaw className="text-primary" size={40} />
                </h2>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="relative">
                        <FaUser className="absolute top-3 left-3 text-primary" />
                        <input
                            type="text"
                            placeholder="Name" name="name"
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                       required />
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute top-3 left-3 text-primary" />
                        <input
                            type="email"
                            placeholder="Email" name="email"
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute top-3 left-3 text-primary" />
                        <input
                            type="password"
                            placeholder="Password" name="password"
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>

                    <div className="relative">
                        <FaImage className="absolute top-3 left-3 text-primary" />
                        <input
                            type="text"
                            placeholder="Photo URL" name="photo"
                            className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                            required  />
                    </div>

                    <button type="submit" className="w-full bg-primary text-base-100 py-2 rounded-lg font-semibold hover:bg-secondary transition-all">
                        Register
                    </button>
                </form>

                <div className="mt-6">
                    <button onClick={handleGoogleRegister} className="w-full flex items-center justify-center gap-2 border border-base-300 py-2 rounded-lg font-medium text-base-content hover:bg-primary/10 transition-all">
                        <FaGoogle className="text-secondary" size={18} />
                        Continue with Google
                    </button>
                </div>

                <p className="text-sm text-center text-neutral mt-6">
                    Already have an account?{" "}
                    <NavLink to="/auth/login"
                        
                        className="text-primary font-semibold hover:underline cursor-pointer"
                    >
                        Login here
                    </NavLink>
                </p>
            </div>
        </section>
    );
};

export default Register;
