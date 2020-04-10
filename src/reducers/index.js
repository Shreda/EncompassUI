import {combineReducers} from 'redux'
import templateFinding from './templateFinding'
import auth from './auth'
import project from './project'
import company from './company'
import report from './report'
import phase from './phase'
import user from './user'
import finding from './finding'

export default combineReducers({
    templateFinding,
    auth,
    project,
    company,
    report,
    phase,
    user,
    finding
})
