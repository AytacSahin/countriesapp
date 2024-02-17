import React from 'react';
import { useCountryDetailsQuery } from '../services/CountryUniqService';

const CountryUniqDisplay: React.FC<{ countryCode: string | null }> = ({ countryCode }) => {
    const { loading, error, countryDetails } = useCountryDetailsQuery(countryCode || '');

    if (error) {
        console.log("error:", error.message);
        return <p className="text-red-500 text-lg phone:w-[150px] tablet:w-[300px] desktop:w-[400px]]">Error: Something went wrong. Please try again later.</p>;
    }

    if (!countryDetails) return <p className="text-black phone:text-sm tablet:text-4xl phone:w-[150px] tablet:w-[300px] desktop:w-[400px]">Country details are loading...</p>;

    const {
        name,
        native,
        capital,
        phone,
        emoji,
        currency,
        languages,
    } = countryDetails;

    return (
        <div className="phone:w-[150px] tablet:w-[300px] desktop:w-[400px]">
            {loading ? (
                <div className="flex items-center justify-center h-48">
                    <p className="text-2xl font-semibold text-gray-700">Loading...</p>
                </div>
            ) : (
                <>
                    <h2 className="phone:text-[16px] tablet:text-[24px] dsktop:text-[30px] font-bold text-[#00060F] phone:mb-2 tablet:mb-4 border-b-2 phone pb-0 tablet:pb-3 border-[#00060F]">{name}</h2>
                    <div className="phone:text-[10px] tablet:text-[16px] phone:leading-3 tablet:leading-5">
                        <h4 className='font-bold inline-block'>Native:</h4> {native}<br />
                        <h4 className='font-bold inline-block'>Capital:</h4> {capital}<br />
                        <h4 className='font-bold inline-block'>Phone:</h4> +{phone}<br />
                        <h4 className='font-bold inline-block'>Emoji:</h4> {emoji}<br />
                        <h4 className='font-bold inline-block'>Currency:</h4> {currency}<br />
                        <h4 className='font-bold inline-block'>Languages:</h4> {languages.map((lang: { name: string }) => lang.name).join(', ')}<br />
                    </div>
                    <p className="phone:mt-2 tablet:mt-4 phone:text-[12px] tablet:text-[16px] desktop:text-[20px] phone:leading-3 tablet:leading-5 italic text-gray-700 border-t-2 phone:pt-2 tablet:pt-5 border-[#00060F]">
                        {`Welcome to ${name}! This beautiful country, with the native name ${native}, is located in South America. The capital city, ${capital}, is a vibrant and bustling metropolis. You can reach the locals by dialing ${phone}, and the country is represented by the emoji ${emoji}. The official currency is ${currency}, and the primary languages spoken are ${languages.map((lang: { name: string }) => lang.name).join(', ')}. Explore the rich culture, history, and natural wonders of ${name}!`}
                    </p>
                </>
            )}
        </div>
    );
};

export default CountryUniqDisplay;
