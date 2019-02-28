import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import firebase from '../../firebase.js';

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
        email: '',
        password: '',
        confirm: ''
        }
    }

    handleSignUp = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            const user = await.app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            this.props.history.push('/');
        } catch(error) {
            alert(error);
        }
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
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
                                <Form onSubmit={this.handleSignUp}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="tiny@foundrymakes.com" onChange={this.handleChange} value={this.state.email}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password (6 character min.)</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Confirm Password" onChange={this.handleChange} value={this.state.confirm} />
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