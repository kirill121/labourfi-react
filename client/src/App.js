import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/general/LandingPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route  exact path='/' component={ LandingPage } />
        </div>
      </Router>
    );
  }
}

export default App;
