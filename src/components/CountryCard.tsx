import React from 'react';

interface CountryCardProps {
    country: {
        code: string;
        name: string;
        languages: {
            code: string;
            name: string;
        }[];
    };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    return (
        <div style={{ backgroundColor: '#F0F0F0', marginBottom: '30px' }}>
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
    );
};

export default CountryCard;
