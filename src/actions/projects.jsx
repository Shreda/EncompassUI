import {
    LOAD_PROJECTS,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    GET_PROJECT,
    GET_PROJECT_FAILURE,
    GET_PROJECT_SUCCESS,
    SAVE_PROJECT,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    EDIT_PROJECT,
    TOGGLE_SAVE_PROJECT_SUCCESS,
    LOAD_PHASES_SUCCESS,
    AUTH_TOKEN,
    LOAD_PHASES
} from '../constants/action-types'

import {config} from '../constants/configuration';

const API_KEY = localStorage.getItem(AUTH_TOKEN);

export function getProjects() {
    return function(dispatch) {
        const URL = config.url.API_URL + 'project/'
        dispatch({
            type: LOAD_PROJECTS
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_PROJECTS_SUCCESS,
                    payload: json.results
                })
            })
    }
}

export function getProject(id) {
    return async function(dispatch) {
        const URL = config.url.API_URL + `project/${id}/`
        dispatch({
            type: GET_PROJECT
        })
        const res = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },            
        })

        const json = await res.json()
        dispatch({
            type: GET_PROJECT_SUCCESS,
            payload: json
        })
        return json
}}

export function editProject(project) {
    return function(dispatch) {
        dispatch({
            type: EDIT_PROJECT,
            payload: project
        })
    }
}

export function saveProject(project) {
    return function(dispatch) {
        const URL = config.url.API_URL + `project/${project.id}/`
        dispatch({
            type: SAVE_PROJECT
        })
        return fetch(URL, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: SAVE_PROJECT_SUCCESS,
                    payload: json
                })
            })
    }
}

export function toggleSaveProjectSuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_PROJECT_SUCCESS
        })
    }
}

export function getProjectPhases(id) { 
    return function(dispatch) {
        const URL = config.url.API_URL + `project/${id}/phase/`
        dispatch({
            type: LOAD_PHASES
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_PHASES_SUCCESS,
                    payload: json
                })
            })
    }
}

