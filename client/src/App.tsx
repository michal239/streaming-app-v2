import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './containers/Navbar/Navbar';
import './styles/index.scss';
import Homepage from './pages/Homepage/Homepage';
import ChannelPage from './pages/ChannelPage/ChannelPage';
import Settings from './pages/Settings/Settings';
import { loginUser } from './store/actions/currentUser';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import store from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { getCookie } from './utils/cookies';

export const client = new ApolloClient({
  credentials: 'include',
  uri: 'http://localhost:7000/graphql',
  cache: new InMemoryCache()
});

if (getCookie('token')) {
  const token = getCookie('token');
  // @ts-ignore
  store.dispatch(loginUser(token));
}

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/settings" component={Settings} />
              <Route path="/:username" component={ChannelPage} />
            </Switch>
          </Router>
        </ReduxProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
