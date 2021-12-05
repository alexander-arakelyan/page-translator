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
                        <IconButton size="small" aria-haspopup="false"
                                    color="inherit" href="/profile">Profile</IconButton>
                        <IconButton size="small" aria-haspopup="false"
                                    color="inherit" href={"#"}
                                    onClick={this.props.onLogout}>Logout</IconButton>
                    </>
                ) : (
                    <>
                        <IconButton size="small" aria-haspopup="false"
                                    color="inherit" href="/signup">Signup</IconButton>
                        <IconButton size="small" aria-haspopup="false"
                                    color="inherit" href="/login">Login</IconButton>
                    </>
                )}
            </div>
        )
    }
}

export default AppHeader;
