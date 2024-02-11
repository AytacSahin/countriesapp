import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri:'https://studio.apollographql.com/public/countries/home?variant=current',
    cache: new InMemoryCache(),
});

export default client;