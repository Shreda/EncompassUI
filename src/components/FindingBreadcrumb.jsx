import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from './WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const FindingBreadcrumb = (props) => {
    const {
        finding
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
                to={`/project/${finding.phase.project.id}`}
            >
                {finding.phase.project.name}
            </Link>                    
            <Typography>
                Phase
            </Typography>                    
            <Link 
                component={RouterLink} 
                to={`/phase/${finding.phase.id}`}
            >
                {finding.phase.name}
            </Link>                    
            <Typography>
                Finding
            </Typography>                    
            <Link 
                component={RouterLink} 
                to={`/finding/${finding.id}`}
            >
                {finding.title}
            </Link>                    
        </Breadcrumbs>
    </WrapBreadcrumb>        
    )
}

export default FindingBreadcrumb