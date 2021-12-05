import React, {useEffect} from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";


const PrivateRoute = ({component: Component, authenticated, ...rest}, props) => (
    <Route
        {...rest}
        render={props =>
            authenticated ? (
                <Component {...rest} {...props} />
            ) : (
                // <Redirect
                //     to={{
                //         pathname: '/login',
                //         state: {from: props.location}
                //     }}
                // />
                <div>Access denied</div>
            )
        }
    />
);

export default PrivateRoute
