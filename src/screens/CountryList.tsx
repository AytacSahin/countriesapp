import React, { useState, useEffect } from 'react';
import { useCountryQuery } from '../services/CountryService';
import CountryCard from '../components/CountryCard';
import SearchInput from '../components/SearchInput';
import GroupByDropdown from '../components/GroupByDropdown';
import ClearButton from '../components/ClearButton';
import CountryUniqDisplay from '../components/CountryUniqDisplay';
import ReactPaginate from 'react-paginate';

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
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const handleCountryClick = (code: string) => {
        setSelectedCountry((prevSelected) => (prevSelected === code ? null : code));
    };

    const handleFilter = () => {
        setGroupedCountries((prevGrouped) => {
            let filteredCountries = data?.countries || [];

            filteredCountries = filteredCountries.filter((country: Country) =>
                country.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (groupBy) {
                const grouped = filteredCountries.reduce((result: Record<string, Country[]>, country: Country) => {
                    if (groupBy === 'languages') {
                        country.languages.forEach(lang => {
                            if (!result[lang.name]) {
                                result[lang.name] = [];
                            }
                            result[lang.name].push(country);
                        });
                    } else if (groupBy === 'continent') {
                        const continentName = country.continent.name;
                        if (!result[continentName]) {
                            result[continentName] = [];
                        }
                        result[continentName].push(country);
                    } else {
                        const groupByValue = country[groupBy] as string;
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
        setGroupBy('');
        setSearchQuery('');
        setGroupedCountries({ 'All': data?.countries || [] });
    };

    useEffect(() => {
        const totalCountries = Object.values(groupedCountries).flat();
        const defaultSelectedIndex = totalCountries.length > 0 ? 0 : -1;

        if (totalCountries.length > 0) {
            const defaultSelectedCountry = totalCountries[defaultSelectedIndex];
            if (defaultSelectedCountry) {
                setSelectedCountry(defaultSelectedCountry.code);
            }
        }
    }, [groupedCountries]);

    useEffect(() => {
        setCurrentPage(0);
        handleFilter();
    }, [loading, error, data, searchQuery, groupBy]);

    if (loading) return <div className="flex items-center justify-center h-screen"><p className='bg-red-500 text-white text-6xl p-10 rounded-lg'>Loading...</p></div>;
    if (error) return <div className="flex items-center justify-center h-screen"><p className='bg-red-500 text-white text-6xl  p-10 rounded-lg'>Error: {error.message}</p></div>;

    const paginatedCountries = Object.entries(groupedCountries).map(([group, countries]) => ({
        group,
        countries: countries ? countries.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE) : [],
    }));

    return (
        <div className="p-6">
            <div className='flex relative justify-between gap-4'>
                <SearchInput value={searchQuery} onChange={setSearchQuery} />
                <GroupByDropdown value={groupBy} onChange={setGroupBy} />
                <ClearButton onClick={clearFilter} />
            </div>

            {/* Display grouped countries */}
            <div className='flex'>
                <div className='w-full'>
                    <ul>
                        {paginatedCountries.map(({ group, countries }) => (
                            <li key={group}>
                                <h2 className="text-xl font-semibold mt-4 text-white">{group}</h2>
                                <ul>
                                    {countries.map((country: Country) => (
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
                <div className='max-w-md ml-6 mt-[50px] p-6 bg-white rounded-lg'>
                    <CountryUniqDisplay countryCode={selectedCountry} />
                </div>
            </div>

            {/* Pagination */}
            <ReactPaginate
                pageCount={Math.ceil(Object.values(groupedCountries).flat().length / ITEMS_PER_PAGE)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    );
};

export default CountryList;
