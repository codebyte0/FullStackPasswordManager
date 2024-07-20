import React from 'react';
import Lottie from 'lottie-react';
import animatedShieldData from './Animationsheild.json';
import '../App.css';
import githublogo from './github.svg';

const Navbar = () => {
    return (
        <nav className='flex w-full bg-slate-900 h-12 items-center justify-around p-7'>
            <div className='logo h-14 flex items-center '>
                <Lottie animationData={animatedShieldData} style={{ width: 50, height: 50 }} />
                <div className="name text-lg">
                    <span className='font-extrabold text-white'>&lt;</span>
                    <span className='font-extrabold text-xl text-green-300'> P</span><span className='font-bold text-white'>ass<span className='font-bold text-yellow-300'>CB</span></span>
                    <span className='font-extrabold text-white'><span className='text-white'>/</span> &gt;</span>
                </div>
            </div>
            <a href="https://github.com/codebyte0" target="_blank" rel="noopener noreferrer">
                <button className="github text-white flex w-auto justify-center items-center font-bold text-lg bg-green-600 gap-x-1 px-2 rounded-full">
                    <img className="invert md:w-10 w-6 h-9" src={githublogo} alt="Github" /> Github
                </button>
            </a>
        </nav>
    );
};

export default Navbar;


