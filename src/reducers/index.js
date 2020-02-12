import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SET_AUTHENTICATED,
    LOAD_PROJECTS,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    LOAD_COMPANIES,
    LOAD_COMPANIES_SUCCESS,
    LOAD_COMPANIES_FAILURE,
    LOAD_REPORTS,
    LOAD_REPORTS_SUCCESS,
    LOAD_REPORTS_FAILURE,
    GENERATE_REPORT,
    GENERATE_REPORT_SUCCESS,
    GENERATE_REPORT_FAILURE,
    EDIT_REPORT,
    SAVE_REPORT,
    SAVE_REPORT_SUCCESS,
    SAVE_REPORT_FAILURE,
    LOAD_PHASES,
    LOAD_PHASES_SUCCESS,
    LOAD_PHASES_FAILURE,
    LOAD_FINDINGS,
    LOAD_FINDINGS_SUCCESS,
    LOAD_FINDINGS_FAILURE

} from '../constants/action-types';

const initialState = {
    loggingIn: false,
    isAuthenticated: false,
    authDetermined: false,

    projects: [],
    loadingProjects: false,
    loadProjectsSuccess: false,

    companies: [],
    loadingCompanies: false,
    loadCompaniesSuccess: false,

    reports: [],
    loadingReports: false,
    loadReportsSuccess: false,
    savingReport: false,
    saveReportSuccess: false,
    generatingReport: false,
    generateReportSuccess: false,
    generateReportFailure: false,

    phases: [],
    loadingPhases: false,
    loadPhasesSuccess: false,

    findings: [],
    loadingFindings: false,
    loadFindingsSuccess: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        /////////////////////////////////////
        //          Auth reducers          //
        /////////////////////////////////////
        case LOGIN:
            return Object.assign({}, state, {
                loggingIn: true,
            });

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                isAuthenticated: true,
            });


        case SET_AUTHENTICATED:
            return Object.assign({}, state, {
                isAuthenticated: action.payload,
                authDetermined: true
            });
        //////////////////////////////////////
        //        Project Reducers          //
        /////////////////////////////////////
        case LOAD_PROJECTS:
            return Object.assign({}, state, {
                loadingProjects: true
            });

        case LOAD_PROJECTS_SUCCESS:
            return Object.assign({}, state, {
                loadProjectsSuccess: true,
                projects: action.payload,
                loadingProjects: false
            });
        //////////////////////////////////////
        //        Company Reducers          //
        /////////////////////////////////////
        case LOAD_COMPANIES:
            return Object.assign({}, state, {
                loadingCompanies: true
            });

        case LOAD_COMPANIES_SUCCESS:
            return Object.assign({}, state, {
                loadCompaniesSuccess: true,
                companies: action.payload,
                loadingCompanies: false
            });        
        //////////////////////////////////////
        //         Report Reducers          //
        /////////////////////////////////////
        case LOAD_REPORTS:
            return Object.assign({}, state, {
                loadingReports: true
            });

        case LOAD_REPORTS_SUCCESS:
            return Object.assign({}, state, {
                loadReportsSuccess: true,
                reports: action.payload,
                loadingReports: false
            }); 
            
        case EDIT_REPORT:
            const reports = state.reports.map(r => (
                (r.id !== action.payload.id) ? 
                    r : 
                    {
                        ...action.payload
                    }
            ))
            return Object.assign({}, state, {
                reports: reports
            })

        case SAVE_REPORT_SUCCESS:
            const new_reports = state.reports.map(r => (
                (r.id !== action.payload.id) ? 
                    r : 
                    {
                        ...action.payload
                    }
            ))
            return Object.assign({}, state, {
                reports: new_reports,
                saveReportSuccess: true
            })

        case SAVE_REPORT:
            return Object.assign({}, state, {
                savingReport: true
            })

        case GENERATE_REPORT:
            return Object.assign({}, state, {
                generatingReport: true
            })            

        case GENERATE_REPORT_SUCCESS:
            const x_reports = state.reports.map(r => (
                (r.id !== action.payload.id) ?
                    r :
                    {
                        ...r,
                        report_url: action.payload.report_url
                    }
            ))
            return Object.assign({}, state, {
                reports: x_reports,
                generateReportSuccess: true
            })

        //////////////////////////////////////
        //          Phase Reducers          //
        /////////////////////////////////////
        case LOAD_PHASES:
            return Object.assign({}, state, {
                loadingPhases: true
            });

        case LOAD_PHASES_SUCCESS:
            return Object.assign({}, state, {
                loadPhasesSuccess: true,
                phases: action.payload,
                loadingPhases: false
            });

        //////////////////////////////////////
        //          Phase Reducers          //
        /////////////////////////////////////
        case LOAD_FINDINGS:
            return Object.assign({}, state, {
                loadingFindings: true
            });

        case LOAD_FINDINGS_SUCCESS:
            return Object.assign({}, state, {
                loadFindingsSuccess: true,
                findings: action.payload,
                loadingFindings: false
            });        

        default:
            return state      
    }
}

export default rootReducer;

