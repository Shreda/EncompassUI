import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import { connect } from 'react-redux';
import './App.css'

// import actions
import {
    determineAuth,
    getProjects,
    getCompanies,
    getReports,
    getPhases,
    getFindings
} from './actions/index';

const mapStateToProps = state => {
    return {
        authDetermined: state.authDetermined,
        isAuthenticated: state.isAuthenticated,
        loadProjectsSuccess: state.loadProjectsSuccess,
        loadingProjects: state.loadingProjects,
        loadCompaniesSuccess: state.loadCompaniesSuccess,
        loadingCompanies: state.loadingCompanies,
        loadingReports: state.loadingReports,
        loadReportsSuccess: state.loadReportsSuccess,
        loadingPhases: state.loadingPhases,
        loadPhasesSuccess: state.loadPhasesSuccess,
        loadingFindings: state.loadingFindings,
        loadFindingsSuccess: state.loadFindingsSuccess,
    }
};

const ConnectedApp = (props) => {

    const {
        authDetermined,
        loadProjectsSuccess,
        loadingProjects,
        isAuthenticated,
        loadingCompanies,
        loadCompaniesSuccess,
        loadReportsSuccess,
        loadingReports,
        loadPhasesSuccess,
        loadingPhases,
        loadFindingsSuccess,
        loadingFindings,
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
        async function fetchReports() {
            props.getReports()
        }
        async function fetchPhases() {
            props.getPhases()
        }
        async function fetchFindings() {
            props.getFindings()
        }

        authStatus()

        if (!loadProjectsSuccess && !loadingProjects && isAuthenticated) {
            fetchProjects();
        }
        if (!loadCompaniesSuccess && !loadingCompanies && isAuthenticated) {
            fetchCompanies();
        }
        if (!loadReportsSuccess && !loadingReports && isAuthenticated) {
            fetchReports()
        }
        if (!loadPhasesSuccess && !loadingPhases && isAuthenticated) {
            fetchPhases()
        }
        if (!loadFindingsSuccess && !loadingFindings && isAuthenticated) {
            fetchFindings()
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
        getCompanies,
        getReports,
        getPhases,
        getFindings
    }
)(ConnectedApp);

export default App;
