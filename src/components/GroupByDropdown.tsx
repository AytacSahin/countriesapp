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
        onChange(val);
        toggleDropdown();
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
            <div className="relative group bg-gray-50 rounded-lg z-20">
                <button
                    id="dropdown-button"
                    onClick={toggleDropdown}
                    className="inline-flex w-full text-[19px] text-[#1C242E] border-[#1C242E] focus:outline-none focus:ring-0 focus:border-black px-4 py-4"
                >
                    <span className="w-[114px]">{value === 'name' ? 'Country Name' : value === 'code' ? 'Country Code' : value === 'languages' ? 'Languages' : value === 'continent' ? 'Continent' : 'Group By'}</span>
                    <svg className="w-3 h-3 ms-8 my-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div
                    ref={dropdownRef}
                    id="dropdown-menu"
                    className={`absolute mt-2 w-full bg-white shadow-2xl p-1 space-y-1 rounded-lg ${isOpen ? 'block' : 'hidden'}`}
                >
                    <div onClick={() => handleGroupBy('name')} className="block px-2 py-1 text-gray-700 cursor-pointer hover:bg-opacity-20 hover:bg-slate-400">Country Name</div>
                    <div onClick={() => handleGroupBy('code')} className="block px-2 py-1 text-gray-700 cursor-pointer hover:bg-opacity-20 hover:bg-slate-400">Country Code</div>
                    <div onClick={() => handleGroupBy('languages')} className="block px-2 py-1 text-gray-700 cursor-pointer hover:bg-opacity-20 hover:bg-slate-400">Languages</div>
                    <div onClick={() => handleGroupBy('continent')} className="block px-2 py-1 text-gray-700 cursor-pointer hover:bg-opacity-20 hover:bg-slate-400">Continent</div>
                </div>
            </div>
        </div>
    );
};

export default GroupByDropdown;
