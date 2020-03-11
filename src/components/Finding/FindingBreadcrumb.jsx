import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

const FindingBreadcrumb = (props) => {
    const {
        finding
    } = props

    return (
    <WrapBreadcrumb>
        <Breadcrumbs>
            <Chip 
                component={RouterLink}
                to='/'
                clickable
                label='Home'
            />                   
            <Typography>
                Project
            </Typography>                    
            <Chip 
                component={RouterLink} 
                to={`/project/${finding.phase.project.id}`}
                label={finding.phase.project.name}
                clickable
            />
            <Typography>
                Phase
            </Typography>                    
            <Chip 
                component={RouterLink} 
                to={`/phase/${finding.phase.id}`}
                label={finding.phase.name}
                clickable
            />
            <Typography>
                Finding
            </Typography>                    
            <Chip 
                component={RouterLink} 
                to={`/finding/${finding.id}`}
                label={finding.title}
                clickable
            />
        </Breadcrumbs>
    </WrapBreadcrumb>        
    )
}

export default FindingBreadcrumb