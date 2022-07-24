import React from 'react';
import './AppHeader.css';
import { RouteIconButton } from "../route/RouteIconButton";

export const AppHeader = ({authenticated, onLogout}) => {
  return (
    <div>
      { authenticated ? (
        <>
          <RouteIconButton href="/#profile">Profile</RouteIconButton>
          <RouteIconButton href="#" onClick={ onLogout }>Logout</RouteIconButton>
        </>
      ) : (
        <>
          <RouteIconButton href="/#signup">Signup</RouteIconButton>
          <RouteIconButton href="/#login">Login</RouteIconButton>
        </>
      ) }
    </div>
  )
}

export default AppHeader;
