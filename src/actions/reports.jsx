import {config} from '../constants/configuration';
import {
    AUTH_TOKEN,
    LOAD_REPORTS,
    LOAD_REPORTS_SUCCESS,
    LOAD_REPORTS_FAILURE,
    GENERATE_REPORT,
    GENERATE_REPORT_SUCCESS,
    GENERATE_REPORT_FAILURE,
    EDIT_REPORT,
    GET_REPORT,
    GET_REPORT_SUCCESS,
    GET_REPORT_FAILURE,
    SAVE_REPORT,
    SAVE_REPORT_SUCCESS,
    ADD_REPORT_SUCCESS,
    TOGGLE_SAVE_REPORT_SUCCESS,
} from '../constants/action-types'

const API_KEY = localStorage.getItem(AUTH_TOKEN);

export function getReport(id) {
    return async function(dispatch) {
        const URL = config.url.API_URL + `report/${id}/`
        dispatch({
            type: GET_REPORT
        })
        const res = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },            
        })

        const json = await res.json()
        dispatch({
            type: GET_REPORT_SUCCESS,
            payload: json
        })
        return json
}}

export function generateReport(report) {
    return function(dispatch) {
        const URL = config.url.API_URL + `report/${report}/generate/`
        dispatch({
            type: GENERATE_REPORT
        })
        return fetch(URL, {
            mode: 'cors',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: GENERATE_REPORT_SUCCESS,
                    payload: json
                })
            })        
    }
}

export function editReport(report) {
    return function(dispatch) {
        dispatch({
            type: EDIT_REPORT,
            payload: report
        })
    }
}

export function saveReport(report) {
    return function(dispatch) {
        console.log(report)
        const URL = config.url.API_URL + `report/${report.id}/`
        var phase_ids = []
        if (Array.isArray(report.phases) && report.phases.length) {
            phase_ids = report.phases.map(p => {
                return p.id
            })
        }
        report.phases = phase_ids
        dispatch({
            type: SAVE_REPORT
        })
        console.log(report)
        return fetch(URL, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                dispatch({
                    type: SAVE_REPORT_SUCCESS,
                    payload: json
                })
            })
    }
}

export function addReport(report) {
    return function(dispatch) {
        const URL = config.url.API_URL + `report/`
        return fetch(URL, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: ADD_REPORT_SUCCESS,
                    payload: json
                })
            })
    }
}

export function toggleSaveReportSuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_REPORT_SUCCESS
        })
    }
}

export function getReports() {
    return function(dispatch) {
        const URL = config.url.API_URL + 'report/'
        dispatch({
            type: LOAD_REPORTS
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_REPORTS_SUCCESS,
                    payload: json
                })
            })
    }

}