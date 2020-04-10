import {
    LOAD_PROJECTS,
    LOAD_PROJECTS_SUCCESS,
    LOAD_PROJECTS_FAILURE,
    GET_PROJECT,
    GET_PROJECT_SUCCESS,
    EDIT_PROJECT,
    SAVE_PROJECT,
    SAVE_PROJECT_SUCCESS,
    SAVE_PROJECT_FAILURE,
    TOGGLE_SAVE_PROJECT_SUCCESS,
} from '../constants/action-types';

import unionBy from 'lodash/unionBy'

const initialState = {
    projects: [],
    loadingProjects: false,
    loadProjectsSuccess: false,
    loadProject: false,
    saveProjectSuccess: false,
    savingProject: false,    
}

export default function project(state = initialState, action) {
    switch(action.type) {
        case LOAD_PROJECTS:
            return Object.assign({}, state, {
                loadingProjects: true
            });
        
        case LOAD_PROJECTS_SUCCESS:
            return Object.assign({}, state, {
                loadProjectsSuccess: true,
                projects: action.payload,
                loadingProjects: false
            });
        
        case GET_PROJECT:
            return Object.assign({}, state, {
                loadProject: true
            })
        
        case GET_PROJECT_SUCCESS:
            return Object.assign({}, state, {
                projects: state.projects.concat(action.payload),
                loadProject: false
            })
        
        case EDIT_PROJECT:
            const projects = state.projects.map(p => (
                (p.id !== action.payload.id) ?
                    p :
                    {
                        ...action.payload,
                        unsavedChanges: true
                    }
            ))
            return Object.assign({}, state, {
                projects: projects
            })
        
            case SAVE_PROJECT_SUCCESS:
                const new_projects = state.projects.map(c => (
                    (c.id !== action.payload.id) ?
                        c :
                        {
                            ...action.payload
                        }
                ))
                return Object.assign({}, state, {
                    projects: new_projects,
                    saveProjectSuccess: true,
                    savingProject: false
                })
        
            case SAVE_PROJECT:
                return Object.assign({}, state, {
                    savingProject: true
                })
        
            case TOGGLE_SAVE_PROJECT_SUCCESS:
                return Object.assign({}, state, {
                    saveProjectSuccess: !state.saveProjectSuccess
                })   
                
            default:
                return state
    }
}



