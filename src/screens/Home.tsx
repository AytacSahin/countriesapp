import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homebgblack from '../assets/images/bgimage-black.png';
import earth from '../assets/images/earth.png';
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
        <div className='homeContainer'>
            <div className="relative flex flex-col items-center justify-between h-screen bg-cover bg-center" style={{ backgroundImage: `url(${homebgblack})`, backgroundSize: 'cover' }}>
                <h1 className="z-50 phone:flex tablet:inline phone:flex-col tablet:flex-row phone:items-center phone:pb-2 my-16 font-extrabold text-white phone:text-5xl tablet:text-6xl border-b-4 border-white">Let's{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-sky-500">
                        Discover
                    </span>
                    {' '} the Countries
                </h1>
                <Link to="/countries">
                    <div className='relative flex flex-col items-center z-20'>
                        {isArrowVisible && (
                            <img className="h-[100px] w-[100px] z-50 absolute phone:-top-24 tablet:-top-18 phone:left-0 tablet:-left-14" alt='arrow' src={arrowicon}></img>
                        )}
                        <button type="button" className=" text-white border-b-6 border-black bg-gradient-to-br from-green-500 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-2xl phone:text-4xl tablet:text-5xl px-10 py-5 text-center mb-10">
                            List Of Countries
                        </button>
                    </div>
                </Link>
                <div className="earth-animation z-10">
                    <img className="earth-image" alt='earth' src={earth}></img>
                </div>
            </div>
        </div>
    );
};

export default Home;