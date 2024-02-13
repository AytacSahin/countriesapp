import React, { useEffect, useRef, useState } from 'react';

interface GroupByDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const GroupByDropdown: React.FC<GroupByDropdownProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleGroupBy = (val: string) => {
        onChange(val); // onChange prop'unu çağırarak seçilen değeri iletebilirsiniz
        toggleDropdown(); // Dropdown'u kapatmak için
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="relative group bg-gray-50 rounded-lg">
                <button
                    id="dropdown-button"
                    onClick={toggleDropdown}
                    className="inline-flex w-full text-[20px] text-[#1C242E] border-[#1C242E] focus:outline-none focus:ring-0 focus:border-black px-4 py-4"
                >
                    <span className="w-[80px]">Group By</span>
                    <svg className="w-3 h-3 ms-8 my-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div
                    ref={dropdownRef}
                    id="dropdown-menu"
                    className={`absolute mt-2 w-full bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 rounded-lg ${isOpen ? 'block' : 'hidden'}`}
                >
                    <div onClick={() => handleGroupBy('name')} className="block px-2 py-1 text-gray-700 cursor-pointer">Country Name</div>
                    <div onClick={() => handleGroupBy('code')} className="block px-2 py-1 text-gray-700 cursor-pointer">Country Code</div>
                    <div onClick={() => handleGroupBy('languages')} className="block px-2 py-1 text-gray-700 cursor-pointer">Languages</div>
                    <div onClick={() => handleGroupBy('continent')} className="block px-2 py-1 text-gray-700 cursor-pointer">Continent</div>
                </div>
            </div>
        </div>
    );
};

export default GroupByDropdown;
