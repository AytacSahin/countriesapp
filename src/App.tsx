import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router Dom eklemesi

import CountryList from './screens/CountryList';
import Home from './screens/Home';
import NoMatch from './screens/NoMatch';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/countries" element={<CountryList />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );

}

export default App;
