import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './containers/Navbar/Navbar';
import './styles/index.scss';
import Homepage from './pages/Homepage/Homepage';
import ChannelPage from './pages/ChannelPage/ChannelPage';
import { loginUser } from './store/actions/currentUser'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import store from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { getCookie } from './utils/cookies';
export const client = new ApolloClient({
	uri: 'http://localhost:7000/graphql',
	cache: new InMemoryCache(),
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
						<Route path="/" exact component={Homepage} />
						<Route path="/:username" exact component={ChannelPage} />
					</Router>
				</ReduxProvider>
			</ApolloProvider>
		</>
	);
};

export default App;
