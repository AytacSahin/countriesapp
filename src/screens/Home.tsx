import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homebg from '../assets/images/bgimage.png';
import arrowicon from '../assets/svg/home-arrow.svg';

const Home: React.FC = () => {
    const [isArrowVisible, setArrowVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setArrowVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homebg})` }}>
            <h1 className="my-16 text-6xl font-extrabold text-white dark:text-white md:text-5xl lg:text-6xl border-b-4 border-white">Let's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-sky-500">
                    Discover
                </span>
                {' '} the Countries
            </h1>
            <Link to="/countries">
                <div className='relative flex flex-col items-center'>
                    {isArrowVisible && (
                        <img className="h-[100px] w-[100px] z-20 absolute -top-6 -left-14" alt='arrow' src={arrowicon}></img>
                    )}
                    <button type="button" className="h-[150px] w-[400px] text-white border-b-6 border-black bg-gradient-to-br from-green-500 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-2xl text-5xl px-10 py-5 text-center mb-10">
                        Ülkeler Listesi
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default Home;
