import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignIn from './pages/Sign_In';
import SignUp from './pages/Sign_Up';
import Main from './pages/Main';
import firebase from './firebase';
import PrivateRoute from './PrivateRoute';
import './App.css';

class App extends Component {

  state = {
    authenticated: false,
    user: null
  }

  componentWillMount() {
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

    const authenticated = this.state;

    return (
      <Router>
        <div>
          <Route exact path='/login' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute exact path= '/' component={Main} authenticated={this.state.authenticated} />
        </div>
      </Router>
    );
  }
}

export default App;
