import React, { useState, useEffect } from 'react';
import { useCountryQuery } from '../services/CountryService';
import CountryCard from './CountryCard';

const CountryList: React.FC = () => {
    const { loading, error, data } = useCountryQuery();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [groupBy, setGroupBy] = useState<string>('');
    const [groupValue, setGroupValue] = useState<string>('');
    const [filteredCountries, setFilteredCountries] = useState<any[]>([]);

    const handleFilter = () => {
        let filteredCountries = data?.countries || [];

        filteredCountries = filteredCountries.filter((country: any) =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (groupBy && groupValue) {
            filteredCountries = filteredCountries.filter((country: any) => {
                const groupByValue = country[groupBy];

                if (Array.isArray(groupByValue)) {
                    return groupByValue.some((lang: any) =>
                        lang.name.toLowerCase().includes(groupValue.toLowerCase())
                    );
                } else {
                    return groupByValue.toLowerCase().includes(groupValue.toLowerCase());
                }
            });
        }
        setFilteredCountries(filteredCountries);
    };

    const clearFilter = () => {
        setGroupBy('');
        setGroupValue('');
        setFilteredCountries(data?.countries || []);
    };

    useEffect(() => {
        if (!loading && !error) {
            handleFilter();
        }
    }, [loading, error, data, searchQuery, groupBy, groupValue]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                >
                    <option value="">Group By</option>
                    <option value="name">Country Name</option>
                    <option value="code">Country Code</option>
                    <option value="languages">Languages</option>
                </select>
                <input
                    type="text"
                    placeholder={`Enter ${groupBy} value`}
                    value={groupValue}
                    onChange={(e) => setGroupValue(e.target.value)}
                />
                <button onClick={handleFilter}>Filter</button>
                <button onClick={clearFilter}>Clear Filter</button>
            </div>
            <ul>
                {filteredCountries.map((country: any) => (
                    <CountryCard key={country.code} country={country} />
                ))}
            </ul>
        </div>
    );
};

export default CountryList;