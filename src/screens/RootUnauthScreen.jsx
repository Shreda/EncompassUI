import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
import UnauthRoutes from '../routes/UnauthRoutes'

const RootUnauthScreen = (props) => {
    return (
        <Router>
            <UnauthRoutes />
        </Router>
    )
}

export default RootUnauthScreen