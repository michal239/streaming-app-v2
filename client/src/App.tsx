import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Homepage from './pages/Homepage/Homepage';

const App = () => {
  return (
    <>
      <Router>
        <Route path="/" exact component={Homepage} />
      </Router>
    </>
  )
}

export default App;