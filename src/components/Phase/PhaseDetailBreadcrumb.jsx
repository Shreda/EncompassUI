import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const PhaseDetailBreadcrumb = (props) => {
    const {
        phase
    } = props

    return (
    <WrapBreadcrumb>
        <Breadcrumbs>
            <Link component={RouterLink} to='/'>
                Home
            </Link>                    
            <Typography>
                Project
            </Typography>                    
            <Link 
                component={RouterLink} 
                to={`/project/${phase.project.id}`}
            >
                {phase.project.name}
            </Link>                    
            <Typography>
                Phase
            </Typography>                    
            <Link 
                component={RouterLink} 
                to={`/phase/${phase.id}`}
            >
                {phase.name}
            </Link>                    
        </Breadcrumbs>
    </WrapBreadcrumb>        
    )
}

export default PhaseDetailBreadcrumb