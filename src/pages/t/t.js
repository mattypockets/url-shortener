import React, { Component } from 'react';
import { Redirect } from 'react-router';
import firebase from 'firebase';


class t extends Component {

  state = {
    short:'',
    redirect:'',
    newHits: null,
    longUrl:'',
    entry:''
  }

  
  componentDidMount() {
      //Get short url from http request
      this.getShortUrl();
      //Find db entry for shortened url
      this.getLongUrl();
    
    
  //   //Redirect user to long url
  //   this.setRedirect();
  }



  getShortUrl() {
    const { short } = this.props.match.params

    this.setState({short:short}, this.getLongUrl());
  }


  getLongUrl() {
    const urlRef = firebase.database().ref('urls');
        urlRef.on('value', (snapshot) => {
            let urls = snapshot.val();

            for (let url in urls) {
                if(urls[url].shortUrl === this.state.short) {
                  this.setState({
                    newHits: urls[url].hits,
                    longUrl: urls[url].longUrl,
                    entry: [url][0]
                  }, this.updateHits())
                };   
            };
        }); 
  }

  updateHits() {
    if(this.state.entry !== '') {
      let entry = this.state.entry;
      let newHits = this.state.newHits;
      newHits = newHits + 1;
      console.log('new hits: ' + newHits);
      console.log('entry: ' + entry)

      firebase.database().ref('urls/'+ entry).update({hits: newHits});
    }
    
  }

  // setRedirect() {
  //   this.setState({redirect: this.state.longUrl})
  // }

  render() {
    this.updateHits();
    return (
      // <Redirect to={this.state.redirect} />

      <div>{this.state.short}</div>
    );
  }
}

export default t;
