import React, { Component } from 'react';
import { Redirect } from 'react-router';
const express = require('express');
const app = express();

import firebase from 'firebase';

class t extends Component {

  state = {
    short:'',
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

  componentDidMount() {
    //Get short url from http request
    this.getShortUrl();
    //Find db entry for shortened url
    this.getLongUrl();
    //Update number of hits in db
    this.updateHits();
    //Redirect user to long url
    this.setRedirect();
  }

  getShortUrl() {
    app.get('/t/:shortUrl', function (req,res) {
      let short = req.params.shortUrl;
      this.setState({
        short: short
      })
    })
  }


  getLongUrl() {
    const urlRef = firebase.database().ref('urls');
        urlRef.on('value', (snapshot) => {
            let urls = snapshot.val();

            for (let url in urls) {
                if(urls[url].shortUrl === this.state.short) {
                  this.setState({
                    newHits: urls[url].hits + 1,
                    longUrl: urls[url].longUrl,
                    entry: urls[url]
                  })
                };   
            };
        });    
  }

  updateHits() {
    const entry = this.state.entry;
    firebase.database().ref('urls/'+entry).update({hits: this.state.newHits});
  }

  setRedirect() {
    this.setState({redirect: this.state.longUrl})
  }

  render() {

    return (
      <Redirect to={this.state.redirect} />
    );
  }
}

export default t;
