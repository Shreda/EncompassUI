import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import UnauthRoutes from '../routes/UnauthRoutes'
import UnauthButtonAppBar from '../components/UnauthButtonAppBar'

const RootUnauthScreen = (props) => {
    return (
        <Router>
            <UnauthButtonAppBar />
            <UnauthRoutes />
        </Router>
    )
}

export default RootUnauthScreen