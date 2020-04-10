import React from 'react'
import {connect} from 'react-redux'
import {getUser, determineAuth} from '../actions/index'
import RootAuthScreen from './RootAuthScreen'
import RootUnauthScreen from './RootUnauthScreen'
import CenterCircularProgress from '../components/CentreCircularProgress'

const mapStateToProps = (state, props) => {
    return {
        loadUserSuccess: state.user.loadUserSuccess,
        loadingUser: state.user.loadingUser,
        isAuthenticated: state.auth.isAuthenticated,
        authDetermined: state.auth.authDetermined
    }
}

const ConnectedRootScreen = (props) => {
    const {
        loadingUser,
        loadUserSuccess,
        isAuthenticated,
        authDetermined
    } = props

    React.useEffect(() => {
        function authStatus() {
            props.determineAuth();
        }

        function fetchUser() {
            props.getUser()
        }

        authStatus()

        if (!loadUserSuccess && !loadingUser) {
            fetchUser()
        }
    });

    return (
        !authDetermined ? (<CenterCircularProgress message='Check yo creds...' />) : (
            (loadingUser ? (
                <CenterCircularProgress message="Check yo privilege..." />
            ) : (
                (isAuthenticated? (<RootAuthScreen/>):(<RootUnauthScreen/>)
            ))
        )))
}

const RootScreen = connect(
    mapStateToProps,
    {
        getUser,
        determineAuth
    }
)(ConnectedRootScreen)

export default RootScreen