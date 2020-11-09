import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// Import our components later
import Home from './components/Home';
import ProjectDetail from './components/Project/ProjectDetail'
import CompanyDetail from './components/Company/CompanyDetail';
import ReportDetail from './components/Report/ReportDetail'
import PhaseDetail from './components/Phase/PhaseDetail';
import FindingDetail from './components/Finding/FindingDetail';
import CompanyList from './components/Company/CompanyList'
import TemplateFindingsPage from './components/TemplateFinding/TemplateFindingsPage'
import TemplateFindingDetail from './screens/Testers/TemplateFindingDetail'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
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
                path='/template/findings'
                component={TemplateFindingsPage}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/finding/:id'
                component={FindingDetail}
                isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
                exact
                path='/template/finding/:id'
                component={TemplateFindingDetail}
                isAuthenticated={isAuthenticated}
            />
            <Route exact path="/login">
                <Redirect to="/" />
            </Route>            
        </Switch>
    );
};

const Routes = connect(
    mapStateToProps,
)(ConnectedRoutes);

export default Routes;
