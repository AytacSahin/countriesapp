import React from 'react';

interface CountryCardProps {
    country: {
        code: string;
        name: string;
    };
    onCountryClick: (code: string) => void;
    isSelected: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onCountryClick, isSelected }) => {
    const handleClick = () => {
        onCountryClick(country.code);
    };

    return (
        <div
            className={`flex items-center bg-[#f5f5f5] mt-2 rounded-lg cursor-pointer ${isSelected ? 'bg-blue-300' : ''}`}
            onClick={handleClick}
        >
            <div className='p-1 px-3 flex justify-center items-center'>
                <div className={`w-[35px] h-[35px] rounded-full flex justify-center items-center pt-1 ${!isSelected ? 'bg-blue-900 text-[#F5F5F5]' : 'bg-blue-100 text-black'}`}>
                    <h1 className='text-[19px] font-extrabold tracking-[1px]'>{country.code}</h1>
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='border-l-4 pl-4 border-gray-500'>
                    <div className='flex items-center'>
                        <h1 className='text-l'>{country.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;
