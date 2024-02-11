import React, { useState, useEffect } from 'react';
import { useCountryQuery } from '../services/CountryService';
import CountryCard from './CountryCard';

interface Language {
    code: string;
    name: string;
    native: string;
}

interface Country {
    code: string;
    name: string;
    languages: Language[];
    [key: string]: string | Language[]; // Index signature
}

const CountryList: React.FC = () => {
    const { loading, error, data } = useCountryQuery();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [groupBy, setGroupBy] = useState<string>('');
    const [groupedCountries, setGroupedCountries] = useState<Record<string, Country[] | undefined>>({});

    const handleFilter = () => {
        let filteredCountries = data?.countries || [];

        filteredCountries = filteredCountries.filter((country: Country) =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (groupBy) {
            const grouped = filteredCountries.reduce((result: Record<string, Country[]>, country: Country) => {
                let groupByValue: string | string[];

                if (groupBy === 'languages') {
                    groupByValue = country.languages.map(lang => lang.name);
                } else {
                    groupByValue = country[groupBy] as string;
                }

                if (Array.isArray(groupByValue)) {
                    groupByValue.forEach(value => {
                        if (!result[value]) {
                            result[value] = [];
                        }
                        result[value].push(country);
                    });
                } else {
                    if (!result[groupByValue]) {
                        result[groupByValue] = [];
                    }
                    result[groupByValue].push(country);
                }

                return result;
            }, {});

            setGroupedCountries(grouped);
        } else {
            setGroupedCountries({ 'All': filteredCountries });
        }
    };

    const clearFilter = () => {
        setGroupBy('');
        setSearchQuery('');
        setGroupedCountries({ 'All': data?.countries || [] });
    };

    useEffect(() => {
        if (!loading && !error) {
            handleFilter();
        }
    }, [loading, error, data, searchQuery, groupBy]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6">
            <div className='flex justify-between gap-4'>
                {/* Search input */}
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Group by dropdown */}
                <select
                    className="block p-2 pr-10 text-m text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                >
                    <option className='text-lg block' value="">Group By</option>
                    <option className='text-lg block' value="name">Country Name</option>
                    <option className='text-lg block' value="code">Country Code</option>
                    <option className='text-lg block' value="languages">Languages</option>
                </select>

                <button onClick={clearFilter}
                    type="button"
                    className="text-lg text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg px-10 py-2.5 text-center">
                    Clear
                </button>

            </div>

            {/* Display grouped countries */}
            <ul>
                {Object.entries(groupedCountries).map(([group, countries]) => (
                    <li key={group}>
                        <h2 className="text-xl font-semibold mt-4 text-white">{group}</h2>
                        <ul>
                            {countries?.map((country: Country) => (
                                <li key={country.code}>
                                    <CountryCard country={country} />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
