import {config} from '../constants/configuration';
import {
    AUTH_TOKEN,
    LOAD_FINDINGS,
    LOAD_FINDINGS_SUCCESS,
    LOAD_FINDINGS_FAILURE,
    EDIT_FINDING,
    SAVE_FINDING,
    SAVE_FINDING_SUCCESS,
    SAVE_FINDING_FAILURE,
    GET_FINDING,
    GET_FINDING_SUCCESS,
    GET_FINDING_FAILURE,
    ADD_FINDING,
    ADD_FINDING_SUCCESS,
    ADD_FINDING_FAILURE,
    TOGGLE_SAVE_FINDING_SUCCESS,
} from '../constants/action-types'

const API_KEY = localStorage.getItem(AUTH_TOKEN);

export function getFinding(id) {
    return function(dispatch) {
        const URL = config.url.API_URL + `finding/${id}/`
        dispatch({
            type: GET_FINDING
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },            
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: GET_FINDING_SUCCESS,
                    payload: json
                })
                return json
            })
    }
}

export function getFindings() {
    return function(dispatch) {
        const URL = config.url.API_URL + 'finding/'
        dispatch({
            type: LOAD_FINDINGS
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_FINDINGS_SUCCESS,
                    payload: json.results
                })
            })
    }
}

export function editFinding(finding) {
    return function(dispatch) {
        finding.rating = finding.impact * finding.likelihood
        dispatch({
            type: EDIT_FINDING,
            payload: finding
        })
    }
}

export function saveFinding(finding) {
    return function(dispatch) {
        const URL = config.url.API_URL + `finding/${finding.id}/`
        dispatch({
            type: SAVE_FINDING
        })
        return fetch(URL, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finding)
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: SAVE_FINDING_SUCCESS,
                    payload: json
                })
            })
    }
}

export function addFinding(finding) {
    return function(dispatch) {
        const URL = config.url.API_URL + `finding/`
        return fetch(URL, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finding)
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: ADD_FINDING_SUCCESS,
                    payload: json
                })
            })
    }
}

export function toggleSaveFindingSuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_FINDING_SUCCESS
        })
    }
}
