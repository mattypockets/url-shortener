import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import firebase from '../../firebase.js';
import shortid from 'shortid';
import './Main.css';

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

    componentWillMount() {
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
                        shortUrl: "http://localhost:3000/" + urls[url].shortUrl,
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
            [e.target.name]: e.target.value
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

    // Return same shortened URL if same long URL is entered
    // urlCheck(){
    //     this.generator();
    //     // If new URL matches one in DB, return the same short URL
    //     for (let url in this.state.urls) {
    //         if (this.state.urls[url].longUrl === this.state.newUrl) {
    //             this.setState({
    //                 newShort: this.state.urls[url].shortUrl
    //             })
    //         }
    //     }
    // }

    handleSubmit(e) {
        e.preventDefault();

        const user = firebase.auth().currentUser;
        console.log(user);
        
        // Run urlCheck to avoid duplicates
        // this.urlCheck();
       
        // Set items to be added to firebase
        const urlRef = firebase.database().ref('urls');
        const url = {
            longUrl: this.state.newUrl,
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

    signOut(e) {
        e.preventDefault();
        firebase.auth().signOut();
    }



    render() {
        return(
            
            <Container>
                {/*  Header */}
                <Row>
                    <Col>URLs</Col>
                    <Col onClick={this.signOut}>Sign Out</Col>
                </Row>

                {/* URL Entry */}
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Control size='lg' type='text' name='newUrl' onChange={this.handleChange} value={this.state.newUrl} />
                            
                            {/* Add URL validation */}
                            <Form.Text>{this.state.valid}</Form.Text> 

                            <Button variant='danger' size='lg' type='submit'>
                                Create URL
                            </Button>
                        </Form>
                    </Col>
                </Row>

                {/* Table */}
                <Row>
                    <Col>
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