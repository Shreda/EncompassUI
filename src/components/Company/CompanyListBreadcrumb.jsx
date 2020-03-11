import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

const CompanyListBreadcrumb = (props) => {
    return (
    <WrapBreadcrumb>
        <Breadcrumbs>
            <Chip 
                component={RouterLink} 
                to='/'
                label='Home'
                clickable
            />
            <Typography >
                Company
            </Typography>                                       
        </Breadcrumbs>
    </WrapBreadcrumb>        
    )
}

export default CompanyListBreadcrumb