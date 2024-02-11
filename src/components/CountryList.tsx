import React from 'react';
import { useQuery, gql } from '@apollo/client';
import TextFilter from './TextFilter';

const COUNTRIES_QUERY = gql`
query {
    countries {
      code
      name
      languages {
        code
        name
      }
    }
  }
`;

const CountryList: React.FC = () => {
    const { loading, error, data } = useQuery(COUNTRIES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const countries = data.countries;
    console.log(countries);

    return (
        <div>
            <ul>
                {countries.map((country: any) => (
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