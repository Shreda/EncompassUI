import unionBy from 'lodash/unionBy'
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
    LOAD_FINDINGS_FAILURE,
    EDIT_FINDING,
    SAVE_FINDING,
    SAVE_FINDING_SUCCESS,
    SAVE_FINDING_FAILURE,
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    UPDATE_FAVOURITES,
    UPDATE_FAVOURITES_SUCCESS,
    UPDATE_FAVOURITES_FAILURE,
    GET_FINDING,
    GET_FINDING_SUCCESS,
    GET_FINDING_FAILURE,
    GET_PHASE,
    GET_PHASE_FAILURE,
    GET_PHASE_SUCCESS,
    GET_COMPANY,
    GET_COMPANY_SUCCESS,
    EDIT_COMPANY,
    SAVE_COMPANY,
    SAVE_COMPANY_SUCCESS,
    SAVE_COMPANY_FAILURE,
    TOGGLE_SAVE_COMPANY_SUCCESS,
    TOGGLE_SAVE_REPORT_SUCCESS,
    TOGGLE_SAVE_FINDING_SUCCESS,
    GET_PROJECT,
    GET_PROJECT_SUCCESS,
    EDIT_PROJECT,
    SAVE_PROJECT,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    TOGGLE_SAVE_PROJECT_SUCCESS

} from '../constants/action-types';

const initialState = {
    loggingIn: false,
    isAuthenticated: false,
    authDetermined: false,

    projects: [],
    loadingProjects: false,
    loadProjectsSuccess: false,
    loadProject: false,
    saveProjectSuccess: false,
    savingProject: false,

    companies: [],
    loadingCompanies: false,
    loadCompaniesSuccess: false,
    loadCompany: false,
    saveCompanySuccess: false,
    savingCompany: false,

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
    loadPhase: false,

    findings: [],
    loadingFindings: false,
    loadFindingsSuccess: false,
    savingFinding: false,
    saveFindingSuccess: false,
    loadFinding: false,

    user: null,
    loadingUser: false,
    loadUserSuccess: false
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

        case GET_PROJECT:
            return Object.assign({}, state, {
                loadProject: true
            })

        case GET_PROJECT_SUCCESS:
            return Object.assign({}, state, {
                projects: state.projects.concat(action.payload),
                loadProject: false
            })

        case EDIT_PROJECT:
            const projects = state.projects.map(p => (
                (p.id !== action.payload.id) ?
                    p :
                    {
                        ...action.payload,
                        unsavedChanges: true
                    }
            ))
            return Object.assign({}, state, {
                projects: projects
            })

            case SAVE_PROJECT_SUCCESS:
                const new_projects = state.projects.map(c => (
                    (c.id !== action.payload.id) ?
                        c :
                        {
                            ...action.payload
                        }
                ))
                return Object.assign({}, state, {
                    projects: new_projects,
                    saveProjectSuccess: true,
                    savingProject: false
                })
    
            case SAVE_PROJECT:
                return Object.assign({}, state, {
                    savingProject: true
                })
    
            case TOGGLE_SAVE_PROJECT_SUCCESS:
                return Object.assign({}, state, {
                    saveProjectSuccess: !state.saveProjectSuccess
                })            
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
                companies: state.companies.concat(action.payload),
                loadingCompanies: false
            });
        case GET_COMPANY:
            return Object.assign({}, state, {
                loadCompany: true
            })

        case GET_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                companies: state.companies.concat(action.payload),
                loadCompany: false
            })
        case EDIT_COMPANY:
            const companies = state.companies.map(c => (
                (c.id !== action.payload.id) ?
                    c :
                    {
                        ...action.payload,
                        unsavedChanges: true
                    }
            ))
            return Object.assign({}, state, {
                companies: companies
            })
        case SAVE_COMPANY_SUCCESS:
            const new_companies = state.companies.map(c => (
                (c.id !== action.payload.id) ?
                    c :
                    {
                        ...action.payload
                    }
            ))
            return Object.assign({}, state, {
                companies: new_companies,
                saveCompanySuccess: true,
                savingCompany: false
            })

        case SAVE_COMPANY:
            return Object.assign({}, state, {
                savingCompany: true
            })

        case TOGGLE_SAVE_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                saveCompanySuccess: !state.saveCompanySuccess
            })
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

        case TOGGLE_SAVE_REPORT_SUCCESS:
            return Object.assign({}, state, {
                saveReportSuccess: !state.saveReportSuccess
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
                phases: state.phases.concat(action.payload),
                loadingPhases: false
            });

        case GET_PHASE:
            return Object.assign({}, state, {
                loadPhase: true
            })

        case GET_PHASE_SUCCESS:
            return Object.assign({}, state, {
                phases: state.phases.concat(action.payload),
                loadPhase: false
            })

        //////////////////////////////////////
        //          Finding Reducers        //
        /////////////////////////////////////
        case LOAD_FINDINGS:
            return Object.assign({}, state, {
                loadingFindings: true
            });

        case LOAD_FINDINGS_SUCCESS:
            const a_new_findings = unionBy(state.findings, action.payload, 'id')
            return Object.assign({}, state, {
                loadFindingsSuccess: true,
                findings: a_new_findings,
                loadingFindings: false
            });

        case EDIT_FINDING:
            const findings = state.findings.map(f => (
                (f.id !== action.payload.id) ?
                    f :
                    {
                        ...action.payload,
                        unsavedChanges: true
                    }
            ))
            return Object.assign({}, state, {
                findings: findings
            })

        case SAVE_FINDING_SUCCESS:
            const new_findings = state.findings.map(f => (
                (f.id !== action.payload.id) ?
                    f :
                    {
                        ...action.payload
                    }
            ))
            return Object.assign({}, state, {
                findings: new_findings,
                saveFindingSuccess: true,
                savingFinding: false
            })

        case SAVE_FINDING:
            return Object.assign({}, state, {
                savingFinding: true
            })

        case GET_FINDING:
            return Object.assign({}, state, {
                loadFinding: true
            })

        case GET_FINDING_SUCCESS:
            return Object.assign({}, state, {
                findings: state.findings.concat(action.payload),
                loadFinding: false
            })

        case TOGGLE_SAVE_FINDING_SUCCESS:
            return Object.assign({}, state, {
                saveFindingSuccess: !state.saveFindingSuccess
            })

        case LOAD_USER:
            return Object.assign({}, state, {
                loadingUser: true
            })

        case LOAD_USER_SUCCESS:
            return Object.assign({}, state, {
                loadUserSuccess: true,
                loadingUser: false,
                user: action.payload
            })

        case UPDATE_FAVOURITES_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload
            })

        default:
            return state
    }
}

export default rootReducer;

