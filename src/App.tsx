import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import TextFilter from './components/TextFilter';
import CountryList from './components/CountryList';

const App: React.FC = () => {

const handleFilter = (query: string, groupBy: string) => {
  console.log('Filter: ', query, 'Group By: ', groupBy);
}

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <TextFilter onFilter={handleFilter}/>
        <CountryList />
      </div>
    </ApolloProvider>
  )
}

export default App;
