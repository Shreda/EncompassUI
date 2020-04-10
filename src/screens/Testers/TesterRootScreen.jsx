import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from '../../Routes';
import { connect } from 'react-redux';
import '../../App.css'
import ButtonAppBar from '../../components/ButtonAppBar'
import UnauthButtonAppBar from '../../components/UnauthButtonAppBar'
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
        authDetermined: state.auth.authDetermined,
        isAuthenticated: state.auth.isAuthenticated,
        loadProjectsSuccess: state.project.loadProjectsSuccess,
        loadingProjects: state.project.loadingProjects,
        loadCompaniesSuccess: state.company.loadCompaniesSuccess,
        loadingCompanies: state.company.loadingCompanies,
        loadingReports: state.report.loadingReports,
        loadReportsSuccess: state.report.loadReportsSuccess,
        loadingPhases: state.phase.loadingPhases,
        loadPhasesSuccess: state.phase.loadPhasesSuccess,
        loadingFindings: state.finding.loadingFindings,
        loadFindingsSuccess: state.finding.loadFindingsSuccess,
        loadingUser: state.user.loadingUser,
        loadUserSuccess: state.user.loadUserSuccess,
        loadTemplateFindingsSuccess: state.templateFinding.loadTemplateFindingsSuccess,
        loadingTemplateFindings: state.templateFinding.loadingTemplateFindings
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
