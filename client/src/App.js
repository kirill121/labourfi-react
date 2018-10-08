import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landingpage from './components/general/Landingpage';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={ Landingpage } />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
