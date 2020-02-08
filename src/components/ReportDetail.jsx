import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Typography } from '@material-ui/core';
import {config} from '../constants/configuration';

const useStyles = makeStyles(theme => ({
}));

const mapStateToProps = state => {
    return {
        reports: state.reports,
        loadingReports: state.loadingReports,
        loadReportsSuccess: state.loadReportsSuccess
    }
}

const getReportByURLId = (props) => {
    const report = props.reports.filter(r => {
        if(r.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })

    return report[0]
}

const ConnectedProjectDetail = (props) => {
    const {
        reports,
        loadReportsSuccess,
        loadingReports,
    } = props

    const classes = useStyles()

    const report = getReportByURLId(props)
 
    return (
        <div>          
            {loadingReports ? <p>Loading...</p>:(
                (!loadReportsSuccess ? <p>Error loading report</p>:
                    <React.Fragment>
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
                        <Typography variant='body1'>
                            Generated report: 
                            <Link href={`${config.url.MEDIA_ROOT}${report.report_url}`}>
                                    download
                            </Link>
                        </Typography>                   
                    </React.Fragment>
                )
            )}
        </div>
    )
}

const ProjectDetail = connect(
    mapStateToProps,
    {
    }
)(ConnectedProjectDetail);

export default ProjectDetail;
