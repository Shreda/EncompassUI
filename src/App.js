import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import { connect } from 'react-redux';

// import actions
import {
    determineAuth,
    getProjects,
    getCompanies
} from './actions/index';

const mapStateToProps = state => {
    return {
        authDetermined: state.authDetermined,
        isAuthenticated: state.isAuthenticated,
        loadProjectsSuccess: state.loadProjectsSuccess,
        loadingProjects: state.loadingProjects,
        loadCompaniesSuccess: state.loadCompaniesSuccess,
        loadingCompanies: state.loadingCompanies,
    }
};

const ConnectedApp = (props) => {

    const {
        authDetermined,
        loadProjectsSuccess,
        loadingProjects,
        isAuthenticated,
        loadingCompanies,
        loadCompaniesSuccess
    } = props

    const renderRoutes = (props) => {
        if (props.authDetermined) {
            return (
                <Router>
                    <Routes />
                </Router>
            )
        }
        else {
            return null
        }
    }

    

     React.useEffect(() => {
        function authStatus() {
            props.determineAuth();
        }

        async function fetchProjects() {
            props.getProjects()
        }

        async function fetchCompanies() {
            props.getCompanies()
        }

        authStatus()

        if (!loadProjectsSuccess && !loadingProjects && isAuthenticated) {
            fetchProjects();
        }

        if (!loadCompaniesSuccess && !loadingCompanies && isAuthenticated) {
            fetchCompanies();
        }
    });
   
    return (
        renderRoutes(props)
    );
}

const App = connect(
    mapStateToProps,
    {
        determineAuth,
        getProjects,
        getCompanies
    }
)(ConnectedApp);

export default App;