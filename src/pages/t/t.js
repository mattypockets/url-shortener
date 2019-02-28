import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import firebase from 'firebase';

class t extends Component {

  state = {
    redirect:""
  }

  // When component mounts, find short URL in db, add 1 to hit counter, redirect user to long URL
  componentDidMount() {
    let path = window.location.pathname.slice(3);
    let newHits = 0;
    let longUrl = "";
    let entry = "";
    
    const urlRef = firebase.database().ref('urls');
        urlRef.on('value', (snapshot) => {
            let urls = snapshot.val();
            let newState = [];
            for (let url in urls) {
                if(urls[url].shortUrl === path) {
                    newHits = urls[url].hits++;
                    longUrl = urls[url].longUrl;
                    entry = urls[url];
                };   
            };
        });
    
    // Update hits for short url entry
    firebase.database().ref('urls/' + entry).update({hits: newHits});

    this.setState({redirect:longUrl})
  }

  render() {

    return (
      <Redirect to={this.state.redirect} />
    );
  }
}

export default t;
