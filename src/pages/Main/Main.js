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
        newShort: '',
        username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const urlRef = firebase.database().ref('urls');
        urlRef.on('value', (snapshot) => {
            let urls = snapshot.val();
            let newState = [];
            for (let url in urls) {
                newState.push({
                    id: url,
                    longUrl: urls[url].longUrl,
                    shortUrl: urls[url].shortUrl,
                    hits: urls[url].hits
                });
            }
            this.setState({
                urls: newState
            });
        });
    }
    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Return same shortened URL if same long URL is entered
    urlCheck(){
        // Generate new short URL
        let shortUrl = shortid.generate();
        this.setState({
            newShort:shortUrl
        });
        // If new URL matches one in DB, return the same short URL
        for (let url in this.state.urls) {
            if (this.state.urls[url].longUrl === this.state.newUrl) {
                this.setState({
                    newShort: this.state.urls[url].shortUrl
                })
            }
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        // Run urlCheck to avoid duplicates
        this.urlCheck();
       
        // Set items to be added to firebase
        const urlRef = firebase.database().ref('urls');
        const url = {
            longUrl: this.state.newUrl,
            shortUrl: this.state.newShort,
            hits: 0,
            user: this.state.username
        }

        // Add items to firebase
        urlRef.push(url);

        // Reset state so that additional urls can be added
        // this.setState({
        //     newUrl: '',
        //     newShort: ''
        // });
    }



    render() {
        return(
            
            <Container>
                {/*  Header */}
                <Row>
                    <Col>URLs</Col>
                    <Col>Sign Out</Col>
                </Row>

                {/* URL Entry */}
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Control size='lg' type='text' name='newUrl' onChange={this.handleChange} value={this.state.newUrl} />
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
                                            <td>{url.longUrl}</td>
                                            <td>{url.shortUrl}</td>
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