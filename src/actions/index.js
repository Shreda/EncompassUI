import {
    LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    AUTH_TOKEN,
    SET_AUTHENTICATED,
    LOAD_FINDINGS,
    LOAD_FINDINGS_SUCCESS,
    LOAD_USER,
    LOAD_USER_SUCCESS,
    UPDATE_FAVOURITES,
    UPDATE_FAVOURITES_SUCCESS,
    LOGOUT,
} from '../constants/action-types';

import {config} from '../constants/configuration';

const API_KEY = localStorage.getItem(AUTH_TOKEN);

export function getUser() {
    // console.log('in get user function')
    return async function(dispatch) {
        const URL = config.url.API_URL + 'me/'
        dispatch({
            type: LOAD_USER
        })
        const res = await fetch(URL, {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        })
        const json = await res.json()

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: json
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
                    // console.log('error login');
                    dispatch({
                        type: LOGIN_FAILURE
                    })
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
