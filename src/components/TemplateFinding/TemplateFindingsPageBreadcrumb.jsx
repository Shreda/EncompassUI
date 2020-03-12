import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

const TemplateFindingsPageBreadcrumb = (props) => {
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
                Template
            </Typography>                    
            <Chip 
                component={RouterLink} 
                to={`/template/findings`}
                clickable
                label='findings'
            />
        </Breadcrumbs>
    </WrapBreadcrumb>        
    )
}

export default TemplateFindingsPageBreadcrumb