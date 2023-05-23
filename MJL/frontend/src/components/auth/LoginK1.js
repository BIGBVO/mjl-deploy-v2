import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authAction';
import { Container, Form, Button } from 'react-bootstrap';

import '../styles/auth.css';
//import 'bootstrap/dist/css/bootstrap.min.css'

export class LoginK1 extends Component {

  constructor(props){
    super(props);
    this.state = {
      //state variable set to '' to make input controlled
      username: '',
      password: '',
      terminal: localStorage.getItem('terminal')
    };
    this.login = this.login.bind(this);
}

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  async login(e){
    e.preventDefault();
    this.props.login(this.state.username, this.state.password, this.state.terminal);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() { // return the view
    if (this.props.isAuthenticated) {
      // if the account is authenticated, it will be redirected to the home page
      return <Redirect to="/" />;
    }
    // if the account is not authenticated, it will ask the user to login
    const { username, password } = this.state;

    return (
        <div>    
            <Container className="loginForm">
              <h2 className="loginWord">Login</h2>
              <Form onSubmit={this.login}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.onChange}
                  value={username} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  value={password} required/>
                </Form.Group>
                <div className="login_container">
                  <Button variant="primary" type="submit" className="loginButton">
                    Log In
                  </Button>
                </div>
              </Form>
            </Container>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginK1);
