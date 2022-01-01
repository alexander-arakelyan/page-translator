import React from 'react';
import { Route } from "../route/Route";

export const PrivateRoute = ({authenticated, currentUser, children, path, exact = false}) => {
  return (<Route path={ path }>
      { authenticated && children }
      { !authenticated && <div>Access denied</div> }
    </Route>
  )
};
