import {
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    UPDATE_FAVOURITES,
    UPDATE_FAVOURITES_SUCCESS,
    UPDATE_FAVOURITES_FAILURE,
} from '../constants/action-types';

const initialState = {
    user: null,
    loadingUser: false,
    loadUserSuccess: false,
};

export default function user(state = initialState, action) {
    switch(action.type) {
        case LOAD_USER:
            return Object.assign({}, state, {
                loadingUser: true
            })

        case LOAD_USER_SUCCESS:
            return Object.assign({}, state, {
                loadUserSuccess: true,
                loadingUser: false,
                user: action.payload
            })

        case UPDATE_FAVOURITES_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload
            })

        default:
            return state        
    }
}