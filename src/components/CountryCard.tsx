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
    };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {

    return (
        <div className='flex items-center bg-[#f5f5f5] mt-6 p-2 rounded-lg'>
            <div className='text-[60px] text-[#333333] font-light leading-8 tracking-widest w-[20%]'>
                <h1 className='p-2'>{country.code}</h1>
            </div>
            <div className=''>
                <div>
                    <h2 className='font-semibold inline-block'>Country Name: </h2>
                    <span>{' ' + country.name}</span>
                </div>
                <div>
                    <h2 className='font-semibold inline-block'>Country Code: </h2>
                    <span>{' ' + country.code}</span>
                </div>
                <div className='flex items-center'>
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
    );
};

export default CountryCard;
