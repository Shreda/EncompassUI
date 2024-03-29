import {
    AUTH_TOKEN,
    LOAD_TEMPLATE_FINDINGS,
    LOAD_TEMPLATE_FINDINGS_SUCCESS,
    LOAD_TEMPLATE_FINDINGS_FAILURE,
    GET_TEMPLATE_FINDING,
    GET_TEMPLATE_FINDING_SUCCESS

} from '../constants/action-types';

import {config} from '../constants/configuration';

const API_KEY = localStorage.getItem(AUTH_TOKEN);

export function getTemplateFinding(id) {
    return function(dispatch) {
        const URL = config.url.API_URL + `template/finding/${id}/`
        dispatch({
            type: GET_TEMPLATE_FINDING
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            },            
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: GET_TEMPLATE_FINDING_SUCCESS,
                    payload: json
                })
                return json
            })
    }
}

export function getTemplateFindings() {
    return function(dispatch) {
        const URL = config.url.API_URL + 'template/finding/'
        dispatch({
            type: LOAD_TEMPLATE_FINDINGS
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_TEMPLATE_FINDINGS_SUCCESS,
                    payload: json.results,
                    nextTemplateFindings: json.next,
                })
            })
    }
}

export function getNextTemplateFindings(url) {
    return function(dispatch) {
        dispatch({
            type: LOAD_TEMPLATE_FINDINGS
        })
        return fetch(url, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }            
        }).then(res => res.json())
            .then(json => {
                // console.log(json.next)
                dispatch({
                    type: LOAD_TEMPLATE_FINDINGS_SUCCESS,
                    payload: json.results,
                    nextTemplateFindings: json.next
                })
            })
    }
}

export function searchTemplateFindings(search) {
    return function(dispatch) {
        const URL = config.url.API_URL + `template/finding/?title=${search}`
        dispatch({
            type: LOAD_TEMPLATE_FINDINGS
        })
        return fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        }).then(res => res.json())
            .then(json => {
                dispatch({
                    type: LOAD_TEMPLATE_FINDINGS_SUCCESS,
                    payload: json.results,
                    nextTemplateFindings: json.next,
                })
            })        
    }
}
