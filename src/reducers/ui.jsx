import {
    TOGGLE_DRAW
} from '../actions/ui'

const initialState = {
    drawOpen: false
}

export default function uiReducer(state = initialState, action) {
    switch(action.type){
        case TOGGLE_DRAW:
            return Object.assign({}, state, {
                drawOpen: !state.drawOpen
            });

        default:
            return state            
    }
}
