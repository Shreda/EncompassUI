import {
    LOAD_PHASES,
    LOAD_PHASES_SUCCESS,
    LOAD_PHASES_FAILURE,
    GET_PHASE,
    GET_PHASE_FAILURE,
    GET_PHASE_SUCCESS,
    ADD_PHASE,
    ADD_PHASE_SUCCESS,
    ADD_PHASE_FAILURE,
    SAVE_PHASE,
    SAVE_PHASE_SUCCESS,
    SAVE_PHASE_FAILURE,
    EDIT_PHASE,
    TOGGLE_SAVE_PHASE_SUCCESS,
} from '../constants/action-types';

import unionBy from 'lodash/unionBy'

const initialState = {
    phases: [],
    loadingPhases: false,
    loadPhasesSuccess: false,
    loadPhase: false,
    savePhaseSuccess: false,
    savingPhase: false,    
};

export default function phase(state = initialState, action) {
    switch(action.type) {
        case LOAD_PHASES:
            return Object.assign({}, state, {
                loadingPhases: true
            });

        case LOAD_PHASES_SUCCESS:
            const a_new_phases = unionBy(state.phases, action.payload, 'id')
            return Object.assign({}, state, {
                loadPhasesSuccess: true,
                phases: a_new_phases,
                loadingPhases: false
            });

        case GET_PHASE:
            return Object.assign({}, state, {
                loadPhase: true
            })

        case GET_PHASE_SUCCESS:
            return Object.assign({}, state, {
                phases: state.phases.concat(action.payload),
                loadPhase: false
            })

        case ADD_PHASE_SUCCESS:
            return Object.assign({}, state, {
                phases: state.phases.concat(action.payload),
            })

        case EDIT_PHASE:
            const phases = state.phases.map(p => (
                (p.id !== action.payload.id) ?
                    p :
                    {
                        ...action.payload,
                        unsavedChanges: true
                    }
            ))
            return Object.assign({}, state, {
                phases: phases
            })

        case SAVE_PHASE_SUCCESS:
            const new_phases = state.phases.map(c => (
                (c.id !== action.payload.id) ?
                    c :
                    {
                        ...action.payload
                    }
            ))
            return Object.assign({}, state, {
                phases: new_phases,
                savePhaseSuccess: true,
                savingPhase: false
            })

        case SAVE_PHASE:
            return Object.assign({}, state, {
                savingPhase: true
            })

        case TOGGLE_SAVE_PHASE_SUCCESS:
            return Object.assign({}, state, {
                savePhaseSuccess: !state.savePhaseSuccess
            })        

        default:
            return state            
    }
}