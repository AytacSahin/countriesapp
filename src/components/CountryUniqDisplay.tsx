// src/components/CountryUniqDisplay.tsx
import React from 'react';
import { useCountryDetailsQuery } from '../services/CountryUniqService';

const CountryUniqDisplay: React.FC<{ countryCode: string | null }> = ({ countryCode }) => {
    const { loading, error, countryDetails } = useCountryDetailsQuery(countryCode || '');

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!countryDetails) return <p>Country details not found.</p>;
    console.log(countryDetails);
    return (
        <div className='w-[500px] h-[500px] flex flex-col pt-16 ml-4 mt-12 items-center bg-[#f5f5f5] rounded-lg'>
            {loading ? (
                <div className="flex items-center justify-center h-[500px]">
                    {/* Buraya özel bir loading spinner veya başka bir gösterge ekleyebilirsiniz */}
                    <p>Loading...</p>
                </div>
            ) :
                <>
                    <h2>{countryDetails.name}</h2>
                    <p>Native: {countryDetails.native}</p>
                    <p>Capital: {countryDetails.capital}</p>
                    <p>Phone: {countryDetails.phone}</p>
                    <p>Emoji: {countryDetails.emoji}</p>
                    <p>Currency: {countryDetails.currency}</p>
                    <p>Languages: {countryDetails.languages.map((lang: { name: string }) => lang.name).join(', ')}</p>
                </>
            }

        </div>
    );
};

export default CountryUniqDisplay;