import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homelayout = () => {
    return (
        <div>

            <header><Navbar></Navbar></header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer><Footer></Footer></footer>

        </div>
    );
};

export default Homelayout;