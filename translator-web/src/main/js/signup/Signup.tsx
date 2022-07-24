import React, { useState } from 'react';
import './Signup.css';
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from '../constants';
import { signup } from '../utils/APIUtils';
import googleLogo from '../img/google-logo.png';
import githubLogo from '../img/github-logo.png';
import Alert from 'react-s-alert';
import { Button } from "@mui/material";

export const Signup = ({authenticated, location, history}) => {
  if (authenticated) {
    history.pushState({location}, undefined, "/");
    return;
    // return <Redirect
    //     to={{
    //     pathname: "/",
    //     state: { from: this.props.location }
    // }}/>;
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Signup with SpringSocial</h1>
        <SocialSignup/>
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <SignupForm history={ history } location={ location }/>
        <span className="login-link">Already have an account? <Button href="#/login">Login!</Button></span>
      </div>
    </div>
  );
}


export const SocialSignup = ({}) => {
  return (
    <div className="social-signup">
      <a className="btn btn-block social-btn google" href={ GOOGLE_AUTH_URL }>
        <img src={ googleLogo } alt="Google"/> Sign up with Google</a>
      <a className="btn btn-block social-btn github" href={ GITHUB_AUTH_URL }>
        <img src={ githubLogo } alt="Github"/> Sign up with Github</a>
    </div>
  );
}

export const SignupForm = ({history, location}) => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    const signUpRequest = Object.assign({}, {name, email, password});

    signup(signUpRequest)
    .then(response => {
      Alert.success("You're successfully registered. Please login to continue!");
      history.pushState({}, undefined, "/login");
    }).catch(error => {
      Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
    });
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="form-item">
        <input type="text" name="name"
               className="form-control" placeholder="Name"
               value={ name } onChange={ (event) => setName(event.target.value) } required/>
      </div>
      <div className="form-item">
        <input type="email" name="email"
               className="form-control" placeholder="Email"
               value={ email } onChange={ (event) => setEmail(event.target.value) } required/>
      </div>
      <div className="form-item">
        <input type="password" name="password"
               className="form-control" placeholder="Password"
               value={ password } onChange={ (event) => setPassword(event.target.value) } required/>
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
      </div>
    </form>
  );
}
