import React, { Component, useEffect, useState } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../constants';
import { login } from '../utils/APIUtils';
import googleLogo from '../img/google-logo.png';
import githubLogo from '../img/github-logo.png';
import Alert from 'react-s-alert';
import { Button } from "@mui/material";

export const Login = ({authenticated, location, history}) => {
  useEffect(() => {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
    if (location.state && location.state.error) {
      setTimeout(() => {
        Alert.error(location.state.error, {
          timeout: 5000
        });
        history.replace({
          pathname: location.pathname,
          state: {}
        });
      }, 100);
    }
  }, []);

  if (authenticated) {
    history.pushState({}, undefined, location + "/")
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login to Us</h1>
        <SocialLogin/>
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm history={ history }/>
        <span className="signup-link">New user? <Button href="#/signup">Sign up!</Button></span>
      </div>
    </div>
  )
}

export const SocialLogin = ({}) => {
  return (
    <div className="social-login">
      <a className="btn btn-block social-btn google" href={ GOOGLE_AUTH_URL }>
        <img src={ googleLogo } alt="Google"/> Log in with Google</a>
      <a className="btn btn-block social-btn github" href={ GITHUB_AUTH_URL }>
        <img src={ githubLogo } alt="Github"/> Log in with Github</a>
    </div>
  )
}


export const LoginForm = ({history}) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginRequest = Object.assign({}, {email, password});

    login(loginRequest)
    .then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      Alert.success("You're successfully logged in!");
      history.push("/");
    }).catch(error => {
      Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
    });
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="form-item">
        <input type="email" name="email"
               className="form-control" placeholder="Email"
               value={ email } onChange={ (event => setEmail(event.target.value)) } required/>
      </div>
      <div className="form-item">
        <input type="password" name="password"
               className="form-control" placeholder="Password"
               value={ password } onChange={ (event => setPassword(event.target.value)) } required/>
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">Login</button>
      </div>
    </form>
  );
}
