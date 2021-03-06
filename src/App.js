import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './pages/Sign_In';
import SignUp from './pages/Sign_Up';
import Main from './pages/Main';
import t from './pages/t';

import firebase from './firebase';
import PrivateRoute from './PrivateRoute';
import './App.css';

class App extends Component {

  state = {
    authenticated: null,
    user: null
  }

  // When component mounts, check to see if user is logged in
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({
          authenticated: true,
          currentUser: user
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null
        });
      }
    });
  }

  render() {
    if (this.state.authenticated === null) {
      return null;
    }
    
    if (this.state.authenticated !== null) {
      return (
        <Router>
          <div>
            <Switch>
              <Route exact path='/login' component={SignIn} />
              <Route exact path='/signup' component={SignUp} />
              <Route path='/:short' component={t} />
              <PrivateRoute exact path= '/' component={Main} authenticated={this.state.authenticated} />
            </Switch>
          </div>
        </Router>
      );
    };
  }
}

export default App;
