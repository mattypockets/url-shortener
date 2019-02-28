import React, { Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from '../../firebase.js';

class SignUp extends Component {

    constructor() {
        super();
        this.state = {
        email: '',
        password: '',
        confirm: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSignUp = async event => {
        event.preventDefault();
        if (this.state.password !== this.state.confirm) {
            alert("Passwords must match")
        } else {
            const { email, password } = event.target.elements;
            try {
                const user = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value);
                this.props.history.push('/');
            } catch(error) {
                alert(error);
            }
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
                                        <Form.Control type="email" name='email' placeholder="tiny@foundrymakes.com" onChange={this.handleChange} value={this.state.email}/>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password (6 character min.)</Form.Label>
                                        <Form.Control type="password" name='password' placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" name='confirm' placeholder="Confirm Password" onChange={this.handleChange} value={this.state.confirm} />
                                    </Form.Group>
                                
                                    <Button variant="danger" size='lg' type="submit">
                                        Sign Up
                                    </Button>
                                </Form>
                            </Col>
                        </Row>

                        {/* Sign in link */}
                        <Row>
                            <Col><Link to='/login'>Sign In</Link></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default SignUp;