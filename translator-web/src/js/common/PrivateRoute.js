import React, {useEffect} from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";

export const PrivateRoute = ({authenticated, currentUser, children, ...props}) => {
   return (<Route
        {...props}
        render={props =>
            authenticated ? (
                [children]
            ) : (
                <div>Access denied</div>
            )
        }
    />
)};
