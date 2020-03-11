import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

const ProjectDetailBreadcrumb = (props) => {
    const {
        project
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
                to={`/project/${project.id}`}
                label={project.name}
                clickable
            />
        </Breadcrumbs> 
    </WrapBreadcrumb>        
    )
}

export default ProjectDetailBreadcrumb