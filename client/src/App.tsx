import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './containers/Navbar/Navbar';
import "./styles/index.scss";
import Homepage from './pages/Homepage/Homepage';
import ChannelPage from './pages/ChannelPage/ChannelPage';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:7000/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <>
      <Router>
        <ApolloProvider client={client}>
          <Navbar />
          <Route path="/" exact component={Homepage} />
          <Route path="/:username" exact component={ChannelPage} />
        </ApolloProvider>
      </Router>
    </>
  )
}

export default App;