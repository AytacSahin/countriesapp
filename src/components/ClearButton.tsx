import React from 'react';

interface ClearButtonProps {
    onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="text-xl text-white bg-gradient-to-r from-green-600 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-bold rounded-lg px-10 py-2.5 text-center tracking-wider"
        >
            Clear
        </button>
    );
};

export default ClearButton;
