import React from 'react';
import {debounce} from 'lodash';
import { connect } from 'react-redux';
import {config} from '../constants/configuration';
import { Link as RouterLink } from 'react-router-dom';

import {
    editReport,
    saveReport,
    uploadImage,
    generateReport
} from '../actions/index'

import Editor from 'rich-markdown-editor';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import IconButton from '@material-ui/core/IconButton'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import WrapBreadcrumb from './WrapBreadcrumb'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    grow: {
        width: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        width: '100%'
    },
    controlBar: {
        width: '100%',
        // padding: theme.spacing(1)
    },
    rotate: {
        animation: "rotation 2s infinite linear"
      }
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
const handleSave = (opt, report, callback) => {
    callback(report)
}
const handleChange = debounce((value, report, callback, param) => {
    const r = {
        ...report,
        [param]: value()
    }
    callback(r)
}, 500)


const ConnectedProjectDetail = (props) => {
    const {
        reports,
        loadReportsSuccess,
        loadingReports,
        editReport, 
        saveReport,
        uploadImage,
        generateReport
    } = props
    const [generatingReport, setGeneratingReport] = React.useState(false);
    
    const handleGenerate = async (e, reportId) => {
        e.preventDefault()
        setGeneratingReport(true)
        await generateReport(reportId)
        setGeneratingReport(false)
    }

    const classes = useStyles()

    const report = getReportByURLId(props)

 
    return (
            loadingReports ? <p>Loading...</p>:(
                (!loadReportsSuccess ? <p>Error loading report</p>:
                    <div className={classes.root}>
                        <Grid 
                            container 
                            direction='column'
                            justify='center'
                            alignItems='center'
                            spacing={5}
                        >
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
                            <Grid item container xs={12} sm={8} lg={6}>
                                <Paper className={classes.controlBar}>
                                    <Grid
                                            direction='row'
                                            justify='center'
                                            alignItems='center'
                                            spacing={5}
                                            container
                                    >
                                        <Grid
                                            item
                                        >
                                            <IconButton 
                                                aria-label="generate report"
                                                onClick={(e) => handleGenerate(e, report.id)}
                                                title="generate report"
                                            >
                                                <AutorenewIcon 
                                                     className={[
                                                         generatingReport? "App-logo": null
                                                     ]}
                                                />
                                            </IconButton>
                                        </Grid>
                                        <Grid
                                            item
                                        >
                                            <IconButton 
                                                component={Link}
                                                href={`${config.url.MEDIA_ROOT}${report.report_url}`}
                                                aria-label="view report pdf"
                                                title="download report"
                                            >
                                                <CloudDownloadIcon
                                                />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item container xs={12} sm={8} lg={6}>
                                <Paper className={classes.paper}>
                                    <Grid
                                        direction='column'
                                        jusity='center'
                                        alignItems='center'
                                        spacing={5}
                                        item
                                        container
                                    >
                                        <Grid className={classes.grow} zeroMinWidth item>
                                            <Typography variant='h2'>
                                                Executive Summary
                                            </Typography>
                                                <Editor 
                                                    defaultValue={report.executive_summary} 
                                                    onSave={(opt) => handleSave(opt, report, saveReport)}
                                                    onChange={(value) => handleChange(value, report, editReport, 'executive_summary')}
                                                    uploadImage={async file => {
                                                        const result = await uploadImage(file)
                                                        return result
                                                    }}
                                                />
                                        </Grid>
                                        <Grid className={classes.grow} zeroMinWidth item>
                                            <Typography variant='h2'>
                                                Introduction
                                            </Typography>
                                                <Editor 
                                                    defaultValue={report.introduction} 
                                                    onSave={(opt) => handleSave(opt, report, saveReport)}
                                                    onChange={(value) => handleChange(value, report, editReport, 'introduction')}
                                                    uploadImage={async file => {
                                                        const result = await uploadImage(file)
                                                        return result
                                                    }}
                                                />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>                      
                        </Grid>                        
                    </div>
                )
            )
    )
}

const ProjectDetail = connect(
    mapStateToProps,
    {
        editReport,
        saveReport,
        uploadImage,
        generateReport
    }
)(ConnectedProjectDetail);

export default ProjectDetail;
