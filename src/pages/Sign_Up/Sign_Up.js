import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import firebase from '../../firebase.js';

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
        username: '',
        password: '',
        confirm: ''
        }
    }

    



    render() {
        return(
            
            <Container>
               
                {/* Sign up box */}
                <Row>
                    <Col>
                        {/* Header */}
                        <Row>
                            <Col>Sign Up</Col>
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
                                        <Form.Label>Password (6 character min.)</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" />
                                    </Form.Group>
                                
                                    <Button variant="danger" size='lg' type="submit">
                                        Sign Up
                                    </Button>
                                </Form>
                            </Col>
                        </Row>

                        {/* Sign in link */}
                        <Row>
                            <Col>Sign In</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default SignUp;