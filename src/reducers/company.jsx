import {
    LOAD_COMPANIES,
    LOAD_COMPANIES_SUCCESS,
    LOAD_COMPANIES_FAILURE,
    GET_COMPANY,
    GET_COMPANY_SUCCESS,
    EDIT_COMPANY,
    SAVE_COMPANY,
    SAVE_COMPANY_SUCCESS,
    SAVE_COMPANY_FAILURE,
    TOGGLE_SAVE_COMPANY_SUCCESS,
} from '../constants/action-types';
import unionBy from 'lodash/unionBy'


const initialState = {
    companies: [],
    nextCompanies: null,
    loadingCompanies: false,
    loadCompaniesSuccess: false,
    loadCompany: false,
    saveCompanySuccess: false,
    savingCompany: false,
}

export default function company(state=initialState, action) {
    switch(action.type) {
        case LOAD_COMPANIES:
            return Object.assign({}, state, {
                loadingCompanies: true
            });

        case LOAD_COMPANIES_SUCCESS:
            const a_new_companies = unionBy(state.companies, action.payload, 'id')
            return Object.assign({}, state, {
                loadCompaniesSuccess: true,
                companies: a_new_companies,
                loadingCompanies: false,
                nextCompanies: action.nextCompanies
            });

        case GET_COMPANY:
            return Object.assign({}, state, {
                loadCompany: true
            })

        case GET_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                companies: state.companies.concat(action.payload),
                loadCompany: false
            })
        case EDIT_COMPANY:
            const companies = state.companies.map(c => (
                (c.id !== action.payload.id) ?
                    c :
                    {
                        ...action.payload,
                        unsavedChanges: true
                    }
            ))
            return Object.assign({}, state, {
                companies: companies
            })
        case SAVE_COMPANY_SUCCESS:
            const new_companies = state.companies.map(c => (
                (c.id !== action.payload.id) ?
                    c :
                    {
                        ...action.payload
                    }
            ))
            return Object.assign({}, state, {
                companies: new_companies,
                saveCompanySuccess: true,
                savingCompany: false
            })

        case SAVE_COMPANY:
            return Object.assign({}, state, {
                savingCompany: true
            })

        case TOGGLE_SAVE_COMPANY_SUCCESS:
            return Object.assign({}, state, {
                saveCompanySuccess: !state.saveCompanySuccess
            })

        default:
            return state                    
    }
}
