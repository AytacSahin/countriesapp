
import React, { useState } from 'react';

interface TextFilterProps {
    onFilter: (query: string, groupBy: string) => void;
}

const TextFilter: React.FC<TextFilterProps> = ({ onFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [groupBy, setGroupBy] = useState('');

    const handleFilter = () => {
        onFilter(searchQuery, groupBy);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
                type="text"
                placeholder="Group By"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
            />
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default TextFilter;
