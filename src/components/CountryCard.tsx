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
        }
    };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {

    return (
        <div className='flex items-center bg-[#f5f5f5] mt-2 rounded-lg'>
            <div className='text-[#333333] p-1 px-3 flex justify-center items-center'>
                <div className='w-12 h-12 bg-gray-400 rounded-full flex justify-center items-center'>
                    <h1 className='text-[20px] font-light tracking-[1px]'>{country.code}</h1>
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
                                <div>
                                    <span key={language.code}>
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
