import React, { Component } from 'react';
import SignIn from './pages/Sign_In';
import Main from './pages/Main';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <SignIn />
        <Main />
      </div>
    );
  }
}

export default App;
