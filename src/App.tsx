import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import CountryList from './components/CountryList';

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <CountryList />
    </ApolloProvider>
  )
}

export default App;
