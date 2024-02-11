// src/services/CountryUniqDisplay.ts
import { useQuery, gql } from '@apollo/client';

// Ülke detayları için GraphQL sorgusu
const GET_COUNTRY_DETAILS = gql`
query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      phone
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

export const useCountryDetailsQuery = (countryCode: string) => {
    const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
        variables: { code: countryCode },
    });

    return {
        loading,
        error,
        countryDetails: data?.country,
    };
};
