import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import firebase from '../../firebase.js';
import shortid from 'shortid';


class Main extends Component {

    constructor() {
        super();
        this.state = {
        urls: [],
        valid: '',
        newUrl: '',
        newShort: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const href = window.location.href;
        const user = firebase.auth().currentUser;
        const urlRef = firebase.database().ref('urls');
        urlRef.on('value', (snapshot) => {
            let urls = snapshot.val();
            let newState = [];
            for (let url in urls) {
                if(urls[url].user === user.uid) {
                    newState.push({
                        id: url,
                        longUrl: urls[url].longUrl,
                        shortUrl: href + urls[url].shortUrl,
                        hits: urls[url].hits
                });   
                }
            }
            this.setState({
                urls: newState
            });
        });
        this.generator();        
    }
    
    // Update state as url input changes
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            valid:''
        });
        this.generator();
    }

    // Generate new short URL
    generator() {
        let shortUrl = shortid.generate();
        this.setState({
            newShort:shortUrl
        });
    }

    // Check to make sure url is valid
    urlChecker() {
        let expression = /[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);
        let longUrl = this.state.newUrl;

        // Add http:// if not included in url
        if(longUrl.substring(-2,7) !== "http://" && longUrl.substring(-2,8) !== "https://") {
            longUrl = "http://" + longUrl;
        }

        if(longUrl.match(regex)) {
            this.urlSubmit(longUrl);
        } else {
            this.setState({
                valid: "Error: Long URL is not a valid URL"
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Run urlChecker to ensure valid url 
        this.urlChecker()   
    }

    signOut(e) {
        e.preventDefault();
        firebase.auth().signOut();
    }

    // Save url data to db
    urlSubmit(longUrl) {
        const user = firebase.auth().currentUser;
        // Set items to be added to firebase
        const urlRef = firebase.database().ref('urls');
        const url = {
            longUrl: longUrl,
            shortUrl: this.state.newShort,
            hits: 0,
            user: user.uid
        }

        // Add items to firebase
        urlRef.push(url);

        // Reset state so that url form is empty
        this.setState({
            newUrl: ''
        });
    }


    render() {
        return(
            
            <Container>
                {/*  Header */}
                <Row className='headerRow'>
                    <Col className='header urlHeader'>URLs</Col>
                    <Col className='signOut' onClick={this.signOut}>Sign Out</Col>
                </Row>

                {/* URL Entry */}
                <Row>
                    <Col className='mainBox'>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Control size='lg' type='text' name='newUrl' onChange={this.handleChange} value={this.state.newUrl} className={`${this.state.valid ? 'invalid':''}`} />
                            
                            <Form.Text className='urlError'>{this.state.valid}</Form.Text> 

                            <Button variant='danger' size='lg' type='submit' className='urlButton'>
                                Create URL
                            </Button>
                        </Form>
                    </Col>
                </Row>

                {/* Table */}
                <Row>
                    <Col className='mainBox'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Original URL</th>
                                    <th>Tiny URL</th>
                                    <th>Hit Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.urls.map(url => (
                                    
                                        <tr>
                                            <td><a href={url.longUrl} target='_blank' rel='noopener noreferrer'>{url.longUrl}</a></td>
                                            <td><a href={url.shortUrl} target='_blank' rel='noopener noreferrer'>{url.shortUrl}</a></td>
                                            <td>{url.hits}</td>
                                        </tr>
                                    
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default Main;