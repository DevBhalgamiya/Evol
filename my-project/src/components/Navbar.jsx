// src/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import toast from 'react-hot-toast';
import logo from '../img/evol.jpg';

const Navbar = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const logOutHandler = () => {
        localStorage.removeItem("token");
        navigate("/");
        setIsAuthenticated(false);
        toast.success("Logged out.");
    };

    return (
        <nav className="w-11/12 max-w-maxContent mx-auto flex justify-between items-center p-4 md:p-6 text-black border-b border-gray-200">
            <Link to="/">
                <div className='flex items-center space-x-2'>
                    <img src={logo} alt="logo" className='w-10 h-10 md:w-12 md:h-12' />
                    <h1 className='text-xl md:text-2xl font-bold tracking-wide font-bricolage'>Evol Technobits</h1>
                </div>
            </Link>

            <ul className="hidden md:flex space-x-8">
                    <li className="hover:text-[#B3D530] transition duration-300">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="hover:text-[#B3D530] transition duration-300">
                        <Link to="/about us">About Us</Link>
                    </li>
                    <li className="hover:text-[#B3D530] transition duration-300">
                        <Link to="/services">Services</Link>
                    </li>
                    <li className="hover:text-[#B3D530] transition duration-300">
                        <Link to="/portfolio">Portfolio</Link>
                    </li>
                    <li className="hover:text-[#B3D530] transition duration-300">
                        <Link to="/faq">FAQ</Link>
                    </li>
            </ul>

            <div className="space-x-4">
                    <button className="border font-bricolage border-[#B3D530] text-[#B3D530] px-6 py-2 rounded-full hover:bg-[#eaf6f5] transition duration-300" onClick={logOutHandler}>
                        Sign In
                    </button>
                    <button className="bg-[#B3D530] font-bricolage text-white px-6 py-2 rounded-full hover:bg-[#000] transition duration-300" onClick={logOutHandler}>
                        Sign Up
                    </button>
            </div>
        </nav>
    );
};

export default Navbar;
