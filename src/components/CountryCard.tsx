import React from 'react';

interface CountryCardProps {
    country: {
        code: string;
        name: string;
        languages: {
            code: string;
            name: string;
            native: string;
        }[];
        continent: {
            name: string;
        };
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
            className={`flex items-center bg-[#f5f5f5] mt-2 rounded-lg cursor-pointer ${isSelected ? 'bg-red-100' : ''}`}
            onClick={handleClick}
        >
            <div className='p-1 px-3 flex justify-center items-center'>
                <div className={`w-12 h-12 bg-red-200 rounded-full flex justify-center items-center pt-1 ${!isSelected ? 'bg-red-100 text-[#333333]' : 'bg-red-900 text-[#F5F5F5]'}`}>
                    <h1 className='text-[24px] font-extrabold tracking-[1px]'>{country.code}</h1>
                </div>
            </div>

            <div className='flex flex-row'>
                <div className='flex items-center w-[200px]'>
                    <h1 className='text-xl'>{country.name}</h1>
                </div>
                <div className='border-l-4 pl-4 border-gray-500'>
                    <div>
                        <h2 className='font-semibold inline-block text-sm'>Country Code: </h2>
                        <span>{' ' + country.code}</span>
                    </div>
                    <div>
                        <h2 className='font-semibold inline-block text-sm'>The Continent of Country : </h2>
                        <span>{' ' + country.continent.name}</span>
                    </div>
                    <div className='flex items-center text-sm'>
                        <p className='mr-1 font-semibold'>Languages:</p>
                        <p className='flex flex-wrap'>
                            {country.languages.map((language: any, index: number) => (
                                <div key={language.code}>
                                    <span>
                                        {index > 0 && ', '} {language.name + " (" + language.native + ")"}
                                    </span>
                                </div>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;
