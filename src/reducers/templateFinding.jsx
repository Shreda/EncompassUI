import {
    LOAD_TEMPLATE_FINDINGS,
    LOAD_TEMPLATE_FINDINGS_SUCCESS,
    LOAD_TEMPLATE_FINDINGS_FAILURE

} from '../constants/action-types';
import unionBy from 'lodash/unionBy'

const initialState = {
    templateFindings: [],
    nextTemplateFindings: null,
    loadingTemplateFindings: false,
    loadTemplateFindingsSuccess: false,
}
export default function templateFindingReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_TEMPLATE_FINDINGS:
            return Object.assign({}, state, {
                loadingTemplateFindings: true
            })

        case LOAD_TEMPLATE_FINDINGS_SUCCESS:
            const a_new_template_findings = unionBy(state.templateFindings, action.payload, 'id')
            console.log(action.nextTemplateFindings)
            return Object.assign({}, state, {
                loadTemplateFindingsSuccess: true,
                templateFindings: a_new_template_findings,
                loadingTemplateFindings: false,
                nextTemplateFindings: action.nextTemplateFindings
            })
            
        default:
            return state
    }
} 