import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../../firebase.js';

class SignIn extends Component {

    constructor() {
        super();
        this.state = {
        email: '',
        password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSignIn = async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            const user = await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
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
                
                <Row className='label'>
                    <Col>You need to sign in or sign up before continuing.</Col>
                </Row>

                {/* Sign in box */}
                <Row>
                    <Col className='formBox'>
                        {/* Header */}
                        <Row>
                            <Col className='header'>Sign In</Col>
                        </Row>

                        {/* Sign in form */}
                        <Row>
                            <Col>
                                <Form onSubmit={this.handleSignIn}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className='inputField' type="email" name='email' placeholder="tiny@foundrymakes.com" onChange={this.handleChange} value={this.state.email} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control className='inputField' type="password" name='password' placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                                    </Form.Group>
                                
                                    <Button variant="danger" size='lg' type="submit" className='button'>
                                        Sign In
                                    </Button>
                                </Form>
                            </Col>
                        </Row>

                        {/* Sign up link */}
                        <Row>
                            <Col className='link'><Link to='/signup' className='link'>Sign Up</Link></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default SignIn;