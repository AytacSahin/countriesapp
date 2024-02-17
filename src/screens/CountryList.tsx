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
        const defaultSelectedIndex = totalCountries.length > 0 ? 9 : -1;
      
        if (totalCountries.length > 0) {
          const defaultSelectedCountry = totalCountries.length <= 10
            ? totalCountries[totalCountries.length - 1]
            : totalCountries[defaultSelectedIndex];
      
          if (defaultSelectedCountry) {
            setSelectedCountry(defaultSelectedCountry.code);
          }
        }
      }, [groupedCountries]);

    useEffect(() => {
        setCurrentPage(0);
        handleFilter();
    }, [loading, error, data, searchQuery, groupBy]);

    if (loading) return <div className="flex items-center justify-center h-screen"><p className='bg-red-400 text-white text-6xl p-10 rounded-lg'>Loading...</p></div>;
    if (error) {
        console.log("error:", error.message);
        return <div className="flex items-center justify-center h-screen"><p className='bg-red-400 text-white text-6xl  p-10 rounded-lg'>Error: Something went wrong. Please try again later.</p></div>;
    }

    const paginatedCountries = Object.entries(groupedCountries).map(([group, countries]) => ({
        group,
        countries: countries ? countries.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE) : [],
    }));

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-cover bg-center" style={{ backgroundImage: 'url("../../assets/images/bgimage-black.png")' }}>
            <div className="w-[90%] my-10">
                <div className='flex relative justify-between gap-4'>
                    <SearchInput value={searchQuery} onChange={setSearchQuery} />
                    <GroupByDropdown value={groupBy} onChange={setGroupBy} />
                    <ClearButton onClick={clearFilter} />
                </div>

                {/* Display grouped countries */}
                <div className='flex'>
                    <div className='w-[90%]'>
                        <ul>
                            {groupBy ?
                                Object.entries(groupedCountries).map(([groupName, countries]) => (
                                    <li key={groupName}>
                                        <h2 className="text-xl font-semibold mt-4 text-white">{groupName}</h2>
                                        <ul>
                                            {countries?.map((country: Country) => (
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
                                ))
                                : paginatedCountries.map(({ group, countries }) => (
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
                                ))
                            }
                        </ul>
                    </div>
                    <div className='ml-6 max-h-screen flex mt-[50px] p-6 bg-white rounded-lg sticky top-0 z-10'>
                        <CountryUniqDisplay countryCode={selectedCountry} />
                    </div>
                </div>

                {/* Pagination */}
                {!groupBy && (
                    <ReactPaginate
                        className='text-white text-2xl shadow-lg shadow-slate-500 flex justify-between px-32 mt-10 mb-20'
                        pageCount={Math.ceil(Object.values(groupedCountries).flat().length / ITEMS_PER_PAGE)}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        containerClassName="pagination"
                        activeClassName="text-red"
                    />
                )}
            </div>
        </div>

    );
};

export default CountryList;
