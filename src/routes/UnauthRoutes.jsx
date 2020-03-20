import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Import our components later
import Login from '../screens/Login'
import LandingPage from '../screens/Unauth/LandingPage'

const UnauthRoutes = (props) => {

    return (
        <Switch>
            <Route 
                exact
                path='/login'
                component={Login}
            />
            <Route
                exact
                path='/'
                component={LandingPage}
            />
        </Switch>
    );
};

export default UnauthRoutes;
