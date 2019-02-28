import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import firebase from firebase;

class t extends Component {

  state = {
    
  }

  // When component mounts, find short URL in db, add 1 to hit counter, redirect user to long URL
  componentDidMount() {
    let path = window.location.pathname.slice(3);
    
  }

  render() {

    return (
      
    );
  }
}

export default t;
