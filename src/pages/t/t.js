import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import firebase from 'firebase';

class t extends Component {

  state = {
    redirect:'',
    newHits: 0,
    longUrl:'',
    entry:''
  }

  // When component mounts, find short URL in db, add 1 to hit counter, redirect user to long URL
  componentDidMount() {
    let path = window.location.pathname.slice(3);
    
    const urlRef = firebase.database().ref('urls');
        urlRef.on('value', (snapshot) => {
            let urls = snapshot.val();

            for (let url in urls) {
                if(urls[url].shortUrl === path) {
                  this.setState({
                    newHits: urls[url].hits + 1,
                    longUrl: urls[url].longUrl,
                    entry: urls[url]
                  })
                    
                };   
            };
        });
    
  }

  componentDidUpdate() {
    // Update hits for short url entry
    firebase.database().ref('urls/' + this.state.entry).update({hits: this.state.newHits});

    this.setState({redirect:this.state.longUrl})
  }

  render() {

    return (
      <Redirect to={this.state.redirect} />
    );
  }
}

export default t;
