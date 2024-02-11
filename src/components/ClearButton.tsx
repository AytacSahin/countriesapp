import React from 'react';

interface ClearButtonProps {
    onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="text-lg text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg px-10 py-2.5 text-center"
        >
            Clear
        </button>
    );
};

export default ClearButton;
