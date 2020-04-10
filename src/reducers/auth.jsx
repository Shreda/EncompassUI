import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SET_AUTHENTICATED,    
    LOGOUT
} from '../constants/action-types'

const initialState = {
    loggingIn: false,
    isAuthenticated: false,
    authDetermined: false,    
}

export default function auth(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                loggingIn: true,
            });

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                isAuthenticated: true,
            });


        case SET_AUTHENTICATED:
            return Object.assign({}, state, {
                isAuthenticated: action.payload,
                authDetermined: true
            });

        case LOGOUT:
            return initialState
            
        default:
            return state            
    }
}