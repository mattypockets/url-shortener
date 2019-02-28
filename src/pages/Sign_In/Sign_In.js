import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import firebase from '../../firebase.js';

class SignIn extends Component {

    constructor() {
        super();
        this.state = {
        username: '',
        password: ''
        }
    }

    



    render() {
        return(
            
            <Container>
                
                <Row>
                    <Col>You need to sign in or sign up before continuing.</Col>
                </Row>

                {/* Sign in box */}
                <Row>
                    <Col>
                        {/* Header */}
                        <Row>
                            <Col>Sign In</Col>
                        </Row>

                        {/* Sign in form */}
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="tiny@foundrymakes.com" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                
                                    <Button variant="danger" size='lg' type="submit">
                                        Sign In
                                    </Button>
                                </Form>
                            </Col>
                        </Row>

                        {/* Sign up link */}
                        <Row>
                            <Col>Sign Up</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default SignIn;