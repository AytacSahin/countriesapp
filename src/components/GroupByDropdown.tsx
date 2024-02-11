import React from 'react';

interface GroupByDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const GroupByDropdown: React.FC<GroupByDropdownProps> = ({ value, onChange }) => {
    return (
        <select
            className="block p-2 pr-10 text-m text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option className='text-lg block my-2' value="">Group By</option>
            <option className='text-lg block my-2' value="name">Country Name</option>
            <option className='text-lg block my-2' value="code">Country Code</option>
            <option className='text-lg block my-2' value="languages">Languages</option>
            <option className='text-lg block my-2' value="continent">Continent</option>
        </select>
    );
};

export default GroupByDropdown;
