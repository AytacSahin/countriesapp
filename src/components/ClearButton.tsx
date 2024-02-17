import React from 'react';

interface ClearButtonProps {
    onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="phone:mb-1 tablet:mb-0 phone:h-10 tablet:h-14 desktop:h-16 e-[0.6] phone:text-[12px] tablet:text-[14px] desktop:text-[19px] text-white bg-gradient-to-r from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-bold rounded-lg phone:px-4 tablet:px-7 desktop:px-10 text-center tracking-wider"
        >
            Clear
        </button>
    );
};

export default ClearButton;
