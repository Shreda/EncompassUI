import {
    LOAD_REPORTS,
    LOAD_REPORTS_SUCCESS,
    GET_REPORT,
    GET_REPORT_SUCCESS,
    GET_REPORT_FAILURE,
    LOAD_REPORTS_FAILURE,
    GENERATE_REPORT,
    GENERATE_REPORT_SUCCESS,
    GENERATE_REPORT_FAILURE,
    EDIT_REPORT,
    SAVE_REPORT,
    SAVE_REPORT_SUCCESS,
    ADD_REPORT_SUCCESS,
    SAVE_REPORT_FAILURE,
    TOGGLE_SAVE_REPORT_SUCCESS,
} from '../constants/action-types';

const initialState = {
    reports: [],
    loadingReports: false,
    loadReportsSuccess: false,
    savingReport: false,
    saveReportSuccess: false,
    generatingReport: false,
    generateReportSuccess: false,
    generateReportFailure: false,
    loadReport: false,    
}

export default function report(state = initialState, action) {
    switch(action.type){
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

        case ADD_REPORT_SUCCESS:
            return Object.assign({}, state, {
                reports: state.reports.concat(action.payload),
            })

        case GET_REPORT:
            return Object.assign({}, state, {
                loadReport: true
            })

        case GET_REPORT_SUCCESS:
            return Object.assign({}, state, {
                reports: state.reports.concat(action.payload),
                loadReport: false
            })
            
        default:
            return state            
    }
}
