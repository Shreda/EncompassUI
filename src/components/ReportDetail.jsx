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
        maxHeight: '300px',
        overflow: 'scroll'
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
    
    const handleGenerate = (e, reportId) => {
        e.preventDefault()
        generateReport(reportId)
    }
    
    // const handleUpload = async (f) => {
    //     const return_url = await uploadImage(f)
    //     console.log('returned url: ' + return_url)
    //     return return_url
    // }

    const classes = useStyles()

    const report = getReportByURLId(props)
 
    return (
            loadingReports ? <p>Loading...</p>:(
                (!loadReportsSuccess ? <p>Error loading report</p>:
                    <div className={classes.root}>
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
                            <Link href={`${config.url.MEDIA_ROOT}${report.report_url}`}> download</Link>
                        </Typography>
                        <Button onClick={(e) => handleGenerate(e, report.id)}>Generate report</Button>
                        <Grid 
                            container 
                            direction='column'
                            justify='center'
                            alignItems='center'
                            spacing={2}
                        >
                            <Grid className={classes.grow} zeroMinWidth xs={12} s={8} lg={6} item>
                                <Typography variant='h4'>
                                    Executive Summary
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Editor 
                                        defaultValue={report.executive_summary} 
                                        onSave={(opt) => handleSave(opt, report, saveReport)}
                                        onChange={(value) => handleChange(value, report, editReport, 'executive_summary')}
                                        uploadImage={async file => {
                                            const result = await uploadImage(file)
                                            return result
                                        }}
                                    />
                                </Paper>
                            </Grid>

                            <Grid className={classes.grow} zeroMinWidth xs={12} s={8} lg={6} item>
                                <Typography variant='h4'>
                                    Introduction
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Editor 
                                        defaultValue={report.introduction} 
                                        onSave={(opt) => handleSave(opt, report, saveReport)}
                                        onChange={(value) => handleChange(value, report, editReport, 'introduction')}
                                        uploadImage={async file => {
                                            const result = await uploadImage(file)
                                            return result
                                        }}
                                    />
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
