import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router Dom eklemesi

import CountryList from './components/CountryList';
import Home from './screens/Home';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/country-list" element={<CountryList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );

}

export default App;
