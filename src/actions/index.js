import {
    LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    AUTH_TOKEN,
    SET_AUTHENTICATED,
    LOAD_PROJECTS,
    LOAD_PROJECTS_SUCCESS,
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
    LOAD_PHASES,
    LOAD_PHASES_SUCCESS,
    LOAD_PHASES_FAILURE,
    SAVE_REPORT,
    SAVE_REPORT_SUCCESS,
    LOAD_FINDINGS,
    LOAD_FINDINGS_SUCCESS,
    LOAD_FINDINGS_FAILURE
} from '../constants/action-types';

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
                    payload: json
                })
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
                    payload: json
                })
            })
    }
}

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

export function uploadImage(f) {
    return async function(dispatch){
        console.log(f)
        const URL = config.url.API_URL + `upload/${f.name}`
        console.log(URL)
        const formData = new FormData
        formData.append('file', f, f.name)
        const res = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            body: f            
        })

        const json = await res.json()
        return `${config.url.API_URL}image/${json.id}`
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
        console.log('saving report')
        console.log(report)
        const URL = config.url.API_URL + `report/${report.id}/`
        dispatch({
            type: SAVE_REPORT
        })
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
                dispatch({
                    type: SAVE_REPORT_SUCCESS,
                    payload: json
                })
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
                    payload: json
                })
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
export function getCompanies() {
    return function(dispatch) {
        const URL = config.url.API_URL + 'company/'
        dispatch({
            type: LOAD_COMPANIES
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_COMPANIES_SUCCESS,
                    payload: json
                })
            })
    }
}

export function doLogin(creds) {
    const http_config = {
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `client_id=${config.url.CLIENT_ID}&grant_type=password&username=${creds.username}&password=${creds.password}`,
        mode: 'cors'
    };

    return function(dispatch) {
        const URL = config.url.AUTH_API_URL + 'token/';
        dispatch({
            type: LOGIN
        });
        return fetch(URL, http_config)
            .then(res =>
                res.json().then(user => ({user, res})) 
            ).then(({user, res}) => {
                if(!res.ok) {
                    // Login error
                    console.log('error login');
                    return Promise.reject(user)
                } else {
                    var date = new Date()
                    const expiry_time = date.getTime() + (user.expires_in - 1000) * 1000
                    localStorage.setItem(
                        AUTH_TOKEN,
                        user.access_token
                    )
                    localStorage.setItem(
                        'auth_expires',
                        expiry_time
                    )
                    dispatch({
                        type: LOGIN_SUCCESS
                    })
                }
            }).catch(err => console.log("Error: ", err))
    }
}

export function determineAuth() {
    return function(dispatch) {

        const token = localStorage.getItem(AUTH_TOKEN);
        const expires = localStorage.getItem('auth_expires')
        const date = new Date().getTime()

        if (token !== null && token !== undefined && date < expires) {
            dispatch({
                type: SET_AUTHENTICATED,
                payload: true
            })
        } else {
            dispatch({
                type: SET_AUTHENTICATED,
                payload: false
            })
        }
    }
}
