import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import TextFilter from './components/TextFilter';
import CountryList from './components/CountryList';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <TextFilter />
        <CountryList />
      </div>
    </ApolloProvider>
  )
}

export default App;
