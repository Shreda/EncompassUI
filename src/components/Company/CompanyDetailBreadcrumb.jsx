import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

const CompanyDetailBreadcrumb = (props) => {
    const {
        company
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
                Company
            </Typography>                    
            <Chip 
                component={RouterLink}
                to={`/company/${company.id}`}
                clickable
                label={company.short_name}
            />

        </Breadcrumbs> 
    </WrapBreadcrumb>        
    )
}

export default CompanyDetailBreadcrumb