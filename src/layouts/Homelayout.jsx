import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homelayout = () => {
    return (
        <div className="max-w-full">
            {/* HEADER */}
            <header className="">
                <div className="max-w-7xl mx-auto">
                    <Navbar />
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="">
                <Outlet />
            </main>

            {/* FOOTER */}
            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
};

export default Homelayout;
