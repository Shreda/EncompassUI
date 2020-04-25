import {config} from '../constants/configuration';
import {
    AUTH_TOKEN,
    LOAD_COMPANIES,
    LOAD_COMPANIES_SUCCESS,
    LOAD_COMPANIES_FAILURE,
    GET_COMPANY_SUCCESS,
    GET_COMPANY,
    GET_COMPANY_FAILURE,
    SAVE_COMPANY,
    SAVE_COMPANY_SUCCESS,
    SAVE_COMPANY_FAILURE,
    TOGGLE_SAVE_COMPANY_SUCCESS,
    EDIT_COMPANY,
} from '../constants/action-types'

const API_KEY = localStorage.getItem(AUTH_TOKEN);

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

export function toggleSaveCompanySuccess() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_SAVE_COMPANY_SUCCESS
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

export function editCompany(company) {
    return function(dispatch) {
        dispatch({
            type: EDIT_COMPANY,
            payload: company
        })
    }
}