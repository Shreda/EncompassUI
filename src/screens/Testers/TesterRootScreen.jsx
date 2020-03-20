import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from '../../Routes';
import { connect } from 'react-redux';
import '../../App.css'
import ButtonAppBar from '../../components/ButtonAppBar'
import {
    determineAuth,
    getProjects,
    getCompanies,
    getReports,
    getPhases,
    getFindings,
    getUser
} from '../../actions/index';

import { getTemplateFindings } from '../../actions/templateFindings'

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
        loadingUser: state.loadingUser,
        loadUserSuccess: state.loadUserSuccess,
        loadTemplateFindingsSuccess: state.loadTemplateFindingsSuccess,
        loadingTemplateFindings: state.loadingTemplateFindings
    }
};

const ConnectedTesterRootScreen = (props) => {

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
        loadingUser,
        loadUserSuccess,
        loadTemplateFindingsSuccess,
        loadingTemplateFindings
    } = props

    const renderRoutes = (props) => {
        if (props.authDetermined) {
            return (
                <Router>
                    <ButtonAppBar isAuthenticated={isAuthenticated}/>
                    <Routes />
                </Router>
            )
        }
        else {
            return null
        }
    }

     React.useEffect(() => {
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
        async function fetchUser() {
            props.getUser()
        }
        async function fetchTemplateFindings() {
            props.getTemplateFindings()
        }

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
        if (!loadUserSuccess && !loadingUser && isAuthenticated) {
            fetchUser()
        }
        if (!loadTemplateFindingsSuccess && !loadingTemplateFindings && isAuthenticated) {
            fetchTemplateFindings()
        }
    });
   
    return (
        renderRoutes(props)
    );
}

const TesterRootScreen = connect(
    mapStateToProps,
    {
        determineAuth,
        getProjects,
        getCompanies,
        getReports,
        getPhases,
        getFindings,
        getUser,
        getTemplateFindings
    }
)(ConnectedTesterRootScreen);

export default TesterRootScreen;
