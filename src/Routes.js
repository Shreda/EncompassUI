import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Import our components later
import Login from './components/Login.jsx';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail'
import CompanyDetail from './components/CompanyDetail';
import ReportDetail from './components/Report/ReportDetail'
import PhaseDetail from './components/PhaseDetail';
import FindingDetail from './components/Finding/FindingDetail';
import CompanyList from './components/Company/CompanyList'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    };
};

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    console.log(isAuthenticated);
    return isAuthenticated ? (
        <Route {...rest} render={matchProps => <Component {...matchProps}/> }/>
    ) : (
        <Redirect to='/login' />
    )
};

const ConnectedRoutes = (props) => {
    const {
        isAuthenticated
    } = props;

    return (
        <Switch>
            <ProtectedRoute 
                exact
                path='/'
                component={Home}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/project/:id'
                component={ProjectDetail}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/company/:id'
                component={CompanyDetail}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/company'
                component={CompanyList}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/report/:id'
                component={ReportDetail}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/phase/:id'
                component={PhaseDetail}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/finding/:id'
                component={FindingDetail}
                isAuthenticated={isAuthenticated}
            />
            <Route 
                exact
                path='/login'
                component={Login}
            />
        </Switch>
    );
};

const Routes = connect(
    mapStateToProps,
)(ConnectedRoutes);

export default Routes;
