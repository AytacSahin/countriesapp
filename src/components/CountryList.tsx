import React, { useState, useEffect } from 'react';
import { useCountryQuery } from '../services/CountryService';
import CountryCard from './CountryCard';
import SearchInput from './SearchInput';
import GroupByDropdown from './GroupByDropdown';
import ClearButton from './ClearButton';
import CountryUniqDisplay from './CountryUniqDisplay';

interface Language {
    code: string;
    name: string;
    native: string;
}

interface Continent {
    name: string;
}

interface Country {
    code: string;
    name: string;
    languages: Language[];
    continent: Continent;
    [key: string]: string | Language[] | Continent;
}

const ITEMS_PER_PAGE = 10;

const CountryList: React.FC = () => {
    const { loading, error, data } = useCountryQuery();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [groupBy, setGroupBy] = useState<string>('');
    const [groupedCountries, setGroupedCountries] = useState<Record<string, Country[] | undefined>>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const handleCountryClick = (code: string) => {
        setSelectedCountry((prevSelected) => (prevSelected === code ? null : code));
        console.log(code);
    };

    const handleFilter = () => {
        setGroupedCountries((prevGrouped) => {
            let filteredCountries = data?.countries || [];

            filteredCountries = filteredCountries.filter((country: Country) =>
                country.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (groupBy) {
                const grouped = filteredCountries.reduce((result: Record<string, Country[]>, country: Country) => {
                    let groupByValue: string | string[];

                    if (groupBy === 'languages') {
                        groupByValue = country.languages.map(lang => lang.name);
                    } else if (groupBy === 'continent') {
                        groupByValue = country.continent.name;
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

                return grouped;
            } else {
                return { 'All': filteredCountries };
            }
        });
    };

    const clearFilter = () => {
        setCurrentPage(1);
        setGroupBy('');
        setSearchQuery('');
        setGroupedCountries({ 'All': data?.countries || [] });
    };

    useEffect(() => {
        // Yüklenen veri sayısına göre varsayılan seçili ülkeyi belirle
        const totalCountries = Object.values(groupedCountries).flat();
        const defaultSelectedIndex = totalCountries.length >= 10 ? 9 : totalCountries.length - 1;

        if (totalCountries.length > 0) {
            const defaultSelectedCountry = totalCountries[defaultSelectedIndex];
            if (defaultSelectedCountry) {
                setSelectedCountry(defaultSelectedCountry.code);
            }
        }
    }, [groupedCountries]);

    useEffect(() => {
        if (!loading && !error) {
            handleFilter();
        }
        // eslint-disable-next-line
    }, [loading, error, data, searchQuery, groupBy]);

    // eslint-disable-next-line
    if (loading) return <div className="flex items-center justify-center h-screen"><p className='bg-red-500 text-white text-6xl p-10 rounded-lg'>Loading...</p></div>;
    // eslint-disable-next-line
    if (error) return <div className="flex items-center justify-center h-screen"><p className='bg-red-500 text-white text-6xl  p-10 rounded-lg'>Error: {error.message}</p></div>;

    const totalPages = Math.ceil(Object.values(groupedCountries).flat().length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="p-6">
            <div className='flex relative justify-between gap-4'>
                {/* Search input */}
                <SearchInput value={searchQuery} onChange={setSearchQuery} />

                {/* Group by dropdown */}
                <GroupByDropdown value={groupBy} onChange={setGroupBy} />

                <ClearButton onClick={clearFilter} />
            </div>

            {/* Display grouped countries */}
            <div className='flex'>
                <div className='w-[80%]'>
                    <ul>
                        {Object.entries(groupedCountries).map(([group, countries]) => (
                            <li key={group}>
                                <h2 className="text-xl font-semibold mt-4 text-white">{group}</h2>
                                <ul>
                                    {countries?.slice(startIndex, endIndex).map((country: Country) => (
                                        <li key={country.code}>
                                            <CountryCard
                                                country={country}
                                                onCountryClick={handleCountryClick}
                                                isSelected={selectedCountry === country.code}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <CountryUniqDisplay countryCode={selectedCountry} />
            </div>
            {/* Pagination */}
            <div className="flex flex-wrap justify-center gap-2 my-4">
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`text-sm mx-2 px-3 py-1 rounded ${currentPage === page ? 'bg-red-300 text-white' : 'bg-gray-300 text-gray-700'
                            } hover:bg-blue-600 hover:text-white focus:outline-none`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CountryList;
