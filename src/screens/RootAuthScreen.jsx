import React from 'react'
import {connect} from 'react-redux'

import {arrayIsEmpty, inGroup} from '../utils'
import TesterRootScreen from './Testers/TesterRootScreen'

const mapStateToProps = (state, props) => {
    return {
        user: state.user.user
    }
}

const ConnectedRootAuthScreen = (props) => {
    const {
        user
    } = props
    
    return (
        inGroup(user, 'Testers') ? (<TesterRootScreen />) : (
            inGroup(user, 'Clients') ? (<p>Client</p>) : (<p>No Client</p>)
        )
    )
}

const RootAuthScreen = connect(
    mapStateToProps,
    {

    }
)(ConnectedRootAuthScreen)

export default RootAuthScreen