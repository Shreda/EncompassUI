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
    GET_REPORT,
    GET_REPORT_SUCCESS,
    GET_REPORT_FAILURE,
    LOAD_PHASES,
    LOAD_PHASES_SUCCESS,
    LOAD_PHASES_FAILURE,
    SAVE_REPORT,
    SAVE_REPORT_SUCCESS,
    LOAD_FINDINGS,
    LOAD_FINDINGS_SUCCESS,
    LOAD_FINDINGS_FAILURE,
    EDIT_FINDING,
    SAVE_FINDING,
    SAVE_FINDING_SUCCESS,
    SAVE_FINDING_FAILURE,
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    UPDATE_FAVOURITES,
    UPDATE_FAVOURITES_SUCCESS,
    GET_FINDING,
    GET_FINDING_SUCCESS,
    GET_FINDING_FAILURE,
    ADD_FINDING,
    ADD_FINDING_SUCCESS,
    ADD_FINDING_FAILURE,
    GET_PHASE,
    GET_PHASE_SUCCESS,
    GET_PHASE_FAILURE,
    GET_COMPANY_SUCCESS,
    GET_COMPANY,
    GET_COMPANY_FAILURE,
    EDIT_COMPANY,
    SAVE_COMPANY,
    SAVE_COMPANY_SUCCESS,
    SAVE_COMPANY_FAILURE,
    TOGGLE_SAVE_COMPANY_SUCCESS,
    TOGGLE_SAVE_FINDING_SUCCESS,
    TOGGLE_SAVE_REPORT_SUCCESS,
    GET_PROJECT_SUCCESS,
    GET_PROJECT,
    EDIT_PROJECT,
    TOGGLE_SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    LOGOUT,
    ADD_PHASE_SUCCESS,
    EDIT_PHASE,
    SAVE_PHASE,
    SAVE_PHASE_SUCCESS,
    SAVE_PHASE_FAILURE,
    TOGGLE_SAVE_PHASE_SUCCESS,
    ADD_REPORT_SUCCESS,
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
                    payload: json.results
                })
            })
    }
}

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

export function getCompany(id) {
    return function(dispatch) {
        const URL = config.url.API_URL + `company/${id}/`
        dispatch({
            type: GET_COMPANY
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },            
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: GET_COMPANY_SUCCESS,
                    payload: json
                })
                return json
            })
    }
}

export function searchCompanies(search) {
    return function(dispatch) {
        const URL = config.url.API_URL + `company/?name=${search}`
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
                    payload: json.results,
                    nextCompanies: json.next,
                })
            })        
    }
}

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

export function getUser() {
    return function(dispatch) {
        const URL = config.url.API_URL + 'me/'
        dispatch({
            type: LOAD_USER
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_USER_SUCCESS,
                    payload: json
                })
            })
    }
}

export function updateFavourites(user) {
    return function(dispatch) {
        const URL = config.url.API_URL + 'me/favourites/'
        return fetch(
            URL,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(user)
            }
        ).then(res => res.json())
            .then(json => {
                dispatch({
                    type: UPDATE_FAVOURITES_SUCCESS,
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
                    payload: json.results
                })
            })
    }
}
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

export function editFinding(finding) {
    return function(dispatch) {
        finding.rating = finding.impact * finding.likelihood
        dispatch({
            type: EDIT_FINDING,
            payload: finding
        })
    }
}

export function editCompany(company) {
    return function(dispatch) {
        dispatch({
            type: EDIT_COMPANY,
            payload: company
        })
    }
}

export function editProject(project) {
    return function(dispatch) {
        dispatch({
            type: EDIT_PROJECT,
            payload: project
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

export function saveCompany(company) {
    return function(dispatch) {
        const URL = config.url.API_URL + `company/${company.id}/`
        dispatch({
            type: SAVE_COMPANY
        })
        return fetch(URL, {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(company)
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: SAVE_COMPANY_SUCCESS,
                    payload: json
                })
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

export function addPhase(phase) {
    return function(dispatch) {
        const URL = config.url.API_URL + `phase/`
        // dispatch({
        //     type: SAVE_PROJECT
        // })
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

export function addReport(report) {
    return function(dispatch) {
        const URL = config.url.API_URL + `report/`
        // dispatch({
        //     type: SAVE_PROJECT
        // })
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

export function addFinding(finding) {
    return function(dispatch) {
        const URL = config.url.API_URL + `finding/`
        // dispatch({
        //     type: SAVE_PROJECT
        // })
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

export function toggleSaveCompanySuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_COMPANY_SUCCESS
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
export function toggleSaveProjectSuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_PROJECT_SUCCESS
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
export function toggleSaveFindingSuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_FINDING_SUCCESS
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
                    payload: json.results,
                    nextCompanies: json.next,
                })
            })
    }
}

export function getNextCompanies(url) {
    return function(dispatch) {
        dispatch({
            type: LOAD_COMPANIES
        })
        return fetch(url, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }            
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_COMPANIES_SUCCESS,
                    payload: json.results,
                    nextCompanies: json.next
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

export function logout() {
    return function(dispatch) {
        console.log('in action logout')
        dispatch({
            type: LOGOUT
        })
        localStorage.clear()
    }
}
