import { gql, useQuery } from '@apollo/client';

export const COUNTRIES_QUERY = gql`
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

export const useCountryQuery = () => {
    return useQuery(COUNTRIES_QUERY);
};
