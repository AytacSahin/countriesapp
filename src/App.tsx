import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import CountryList from './components/CountryList';

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <CountryList />
      </div>
    </ApolloProvider>
  )
}

export default App;
