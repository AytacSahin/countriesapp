import React, { useState } from 'react';
import { useCountryQuery } from '../services/CountryService';

const CountryList: React.FC = () => {
    const { loading, error, data } = useCountryQuery();
    const [searchQuery, setSearchQuery] = useState('');
    const [groupBy, setGroupBy] = useState('');

    // to do: try catch içine alabilirim sonra.
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredCountries = data.countries
        .filter((country: any) => country.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((country: any) => groupBy === '' || country.languages.some((lang: any) => lang.name.toLowerCase().includes(groupBy.toLowerCase())));

    const uniqueGroupByOptions: string[] = ["name", "code", "languages"];

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
                    {uniqueGroupByOptions.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <ul>
                {filteredCountries.map((country: any) => (
                    <div style={{ backgroundColor: '#F0F0F0', marginBottom: '30px' }} key={country.code}>
                        <h2>Country Name: {country.name} </h2>
                        <h4>Code: {country.code}</h4>
                        <div>
                            <h2>Languages:</h2>
                            {country.languages.map((language: any) => (
                                <div key={language.code}>
                                    <h4>Language Code: {language.code} </h4>
                                    <h4>Language Name: {language.name}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;