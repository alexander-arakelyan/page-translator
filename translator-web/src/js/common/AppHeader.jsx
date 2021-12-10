import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './AppHeader.css';
import {Button, IconButton} from "@mui/material";

class AppHeader extends Component {
    render() {
        return (
            <div>
                {this.props.authenticated ? (
                    <>
                        <IconButton href="/#profile" size="small" color="inherit">Profile</IconButton>
                        <IconButton href="#" size="small" color="inherit"
                                    onClick={this.props.onLogout}>Logout</IconButton>
                    </>
                ) : (
                    <>
                        <IconButton href="/#signup" size="small" color="inherit">Signup</IconButton>
                        <IconButton href="/#login" size="small" color="inherit">Login</IconButton>
                    </>
                )}
            </div>
        )
    }
}

export default AppHeader;
