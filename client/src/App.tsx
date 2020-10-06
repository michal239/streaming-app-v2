import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './containers/Navbar/Navbar';
import "./styles/index.scss";
import Homepage from './pages/Homepage/Homepage';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Route path="/" exact component={Homepage} />
      </Router>
    </>
  )
}

export default App;