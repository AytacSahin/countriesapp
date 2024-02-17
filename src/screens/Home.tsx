import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-between h-screen bg-cover bg-center" style={{ backgroundImage: 'url("../../assets/images/bgimage.png")' }}>
            {/* <h2 className="text-5xl font-bold text-white mt-8 shadow-lg shadow-current">Ana Sayfa</h2> */}

            <h1 className="my-16 text-6xl font-extrabold text-white dark:text-white md:text-5xl lg:text-6xl border-b-4 border-white">Let's{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-300 from-sky-500">
                    Discover
                </span> the Countries
            </h1>

            <Link to="/country-list">
                <button type="button" className="text-white border-b-6 border-black bg-gradient-to-br from-green-500 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-2xl text-5xl px-10 py-5 text-center mb-10">
                    Ülkeler Listesi
                </button>
            </Link>
        </div>
    );
};

export default Home;
