
import React from 'react';
import colors from '../data/colors';

interface CountryCardProps {
    country: {
        code: string;
        name: string;
    };
    onCountryClick: (code: string) => void;
    isSelected: boolean;
    colorCalculaterIndex: number;
}

const shuffleArray = (array: string[]): string[] => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};
const CountryCard: React.FC<CountryCardProps> = ({ country, onCountryClick, isSelected, colorCalculaterIndex }) => {

    const handleClick = () => {
        onCountryClick(country.code);
    };

    const shuffledColors = shuffleArray(colors);

    return (
        <div
            style={{
                background: isSelected ? shuffledColors.pop() || '#F7F7F7' : '#F7F7F7',
            }}
            className="flex items-center mt-2 rounded-lg cursor-pointer"
            onClick={handleClick}
        >
            <div className='p-1 phone:px-1 tablet:px-2 desktop:px-3 flex justify-center items-center'>
                <div className={`phone:w-[20px] phone:h-[20px] tablet:w-[35px] tablet:h-[35px] rounded-full flex justify-center items-center pt-1 ${!isSelected ? 'bg-blue-900 text-[#F5F5F5]' : 'bg-blue-100 text-black'}`}>
                    <h1 className='phone:text-[10px] tablet:text-[19px] font-extrabold tracking-[1px]'>{country.code}</h1>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center'>
                <div className='phone:border-l-2 tablet:border-l-4 phone:h-[16px] tablet:h-[25px] phone:pl-1 phone:pt-1 tablet:pt-2 tablet:pl-4 border-gray-500'>
                    <div className='flex items-center'>
                        <h1 className='phone:text-[12px] tablet:text-[14px] desktop:text-[16px] phone:leading-[12px]'>{country.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;











