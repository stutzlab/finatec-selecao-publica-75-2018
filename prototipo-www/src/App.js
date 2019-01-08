import React, { Component } from 'react';
import logo from './logo.svg';
import { userData } from './helper'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router'
// import './App.css';

import Login from './components/login/Login'
import Home from './components/home/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <pre>{ 'AUTH: '+ userData.auth }</pre> */}
        <Router>
        <div>
          { !userData.auth &&
            <div>
              <Route path="/" exact={true} component={Login} /> 
            </div>
          }
          { userData.auth && 
            <div> 
              <Route path="/" exact={true} component={Home} />
            </div>
           }
          </div> 
        </Router>
      </div>
    );
  }
}

export default App;
