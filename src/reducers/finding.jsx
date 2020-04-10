import {
    LOAD_FINDINGS,
    LOAD_FINDINGS_SUCCESS,
    LOAD_FINDINGS_FAILURE,
    EDIT_FINDING,
    SAVE_FINDING,
    SAVE_FINDING_SUCCESS,
    SAVE_FINDING_FAILURE,
    ADD_FINDING,
    ADD_FINDING_SUCCESS,
    ADD_FINDING_FAILURE,
    GET_FINDING,
    GET_FINDING_SUCCESS,
    GET_FINDING_FAILURE,
    TOGGLE_SAVE_FINDING_SUCCESS,
} from '../constants/action-types';
import unionBy from 'lodash/unionBy'


const initialState = {
    findings: [],
    loadingFindings: false,
    loadFindingsSuccess: false,
    savingFinding: false,
    saveFindingSuccess: false,
    loadFinding: false,    
}

export default function finding(state = initialState, action) {
    switch(action.type) {
        case LOAD_FINDINGS:
            return Object.assign({}, state, {
                loadingFindings: true
            });

        case LOAD_FINDINGS_SUCCESS:
            const a_new_findings = unionBy(state.findings, action.payload, 'id')
            return Object.assign({}, state, {
                loadFindingsSuccess: true,
                findings: a_new_findings,
                loadingFindings: false
            });

        case EDIT_FINDING:
            const findings = state.findings.map(f => (
                (f.id !== action.payload.id) ?
                    f :
                    {
                        ...action.payload,
                        unsavedChanges: true
                    }
            ))
            return Object.assign({}, state, {
                findings: findings
            })

        case SAVE_FINDING_SUCCESS:
            const new_findings = state.findings.map(f => (
                (f.id !== action.payload.id) ?
                    f :
                    {
                        ...action.payload
                    }
            ))
            return Object.assign({}, state, {
                findings: new_findings,
                saveFindingSuccess: true,
                savingFinding: false
            })

        case SAVE_FINDING:
            return Object.assign({}, state, {
                savingFinding: true
            })

        case GET_FINDING:
            return Object.assign({}, state, {
                loadFinding: true
            })

        case GET_FINDING_SUCCESS:
            return Object.assign({}, state, {
                findings: state.findings.concat(action.payload),
                loadFinding: false
            })

        case TOGGLE_SAVE_FINDING_SUCCESS:
            return Object.assign({}, state, {
                saveFindingSuccess: !state.saveFindingSuccess
            })
        
        case ADD_FINDING_SUCCESS:
            return Object.assign({}, state, {
                findings: state.findings.concat(action.payload),
            })            
        
        default:
            return state
    }
}