import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const ReportBreadcrumb = (props) => {
    const {
        report
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
                to={`/project/${report.project.id}`}
            >
                {report.project.name}
            </Link>                    
            <Typography>
                Report
            </Typography>                    
            <Link 
                component={RouterLink} 
                to={`/report/${report.id}`}
            >
                {report.name}
            </Link>                    
        </Breadcrumbs>
    </WrapBreadcrumb>     
    )
}

export default ReportBreadcrumb