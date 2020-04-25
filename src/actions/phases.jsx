import {config} from '../constants/configuration';
import {
    AUTH_TOKEN,
    LOAD_PHASES,
    LOAD_PHASES_SUCCESS,
    LOAD_PHASES_FAILURE,
    GET_PHASE,
    GET_PHASE_SUCCESS,
    GET_PHASE_FAILURE,
    ADD_PHASE_SUCCESS,
    EDIT_PHASE,
    SAVE_PHASE,
    SAVE_PHASE_SUCCESS,
    SAVE_PHASE_FAILURE,
    TOGGLE_SAVE_PHASE_SUCCESS,
    LOAD_FINDINGS,
    LOAD_FINDINGS_SUCCESS
} from '../constants/action-types'

const API_KEY = localStorage.getItem(AUTH_TOKEN);

export function getPhase(id) {
    return async function(dispatch) {
        const URL = config.url.API_URL + `phase/${id}/`
        dispatch({
            type: GET_PHASE
        })
        const res = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },            
        })

        const json = await res.json()
        dispatch({
            type: GET_PHASE_SUCCESS,
            payload: json
        })
        return json
}}

export function getPhaseFindings(id) {
    return function(dispatch) {
        const URL = config.url.API_URL + `phase/${id}/finding/`
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
                    payload: json
                })
            })
    }
}

export function editPhase(phase) {
    return function(dispatch) {
        dispatch({
            type: EDIT_PHASE,
            payload: phase
        })
    }
}

export function savePhase(phase) {
    return function(dispatch) {
        const URL = config.url.API_URL + `phase/${phase.id}/`
        dispatch({
            type: SAVE_PHASE
        })
        return fetch(URL, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(phase)
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: SAVE_PHASE_SUCCESS,
                    payload: json
                })
            })
    }
}

export function addPhase(phase) {
    return function(dispatch) {
        const URL = config.url.API_URL + `phase/`
        return fetch(URL, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(phase)
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: ADD_PHASE_SUCCESS,
                    payload: json
                })
            })
    }
}

export function toggleSavePhaseSuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_PHASE_SUCCESS
        })
    }
}

export function getPhases() {
    return function(dispatch) {
        const URL = config.url.API_URL + 'phase/'
        dispatch({
            type: LOAD_PHASES
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_PHASES_SUCCESS,
                    payload: json.results
                })
            })
    }
}