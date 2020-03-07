import React from 'react';
import {debounce} from 'lodash';
import { connect } from 'react-redux';
import {config} from '../../constants/configuration';
import { Link as RouterLink } from 'react-router-dom';

import {
    editReport,
    saveReport,
    uploadImage,
    generateReport,
    getReport,
    toggleSaveReportSuccess
} from '../../actions/index'
import ReportBreadcrumb from './ReportBreadcrumb'
import ReportDetailDock from './ReportDetailDock'
import SaveSuccessSnack from '../SaveSuccessSnack'

import Editor from 'rich-markdown-editor';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import WrapBreadcrumb from '../WrapBreadcrumb'


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
    rotate: {
        animation: "rotation 2s infinite linear"
      }
}));

const mapStateToProps = (state, props) => {
    const report = state.reports.filter(r => {
        if(r.id === props.match.params.id) return true;
        else return false;
    })    
    return {
        report: report[0],
        loadingReports: state.loadingReports,
        loadReportsSuccess: state.loadReportsSuccess,
        loadReport: state.loadReport,
        saveReportSuccess: state.saveReportSuccess,
        savingReport: state.savingReport
    }
}

const handleSave = (opt, report, callback) => {
    callback(report)
}

const handleSaveButton = (report, callback) => event => {
    event.preventDefault()
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
        report,
        loadReportsSuccess,
        loadingReports,
        editReport, 
        saveReport,
        uploadImage,
        generateReport,
        getReport,
        loadReport,
        saveReportSuccess,
        toggleSaveReportSuccess,
        savingReport
    } = props
    const [generatingReport, setGeneratingReport] = React.useState(false);

    const handleGenerate = async (e, reportId) => {
        e.preventDefault()
        setGeneratingReport(true)
        await generateReport(reportId)
        setGeneratingReport(false)
    }

    const classes = useStyles()

    // const report = getReportByURLId(props)

    React.useEffect(() => {
        async function fetchReport() {
            props.getReport(props.match.params.id)
        }

        if (!report && !loadReport) {
            fetchReport()
        }
    })

 
    return (
            loadingReports ? <p>Loading...</p>:(
                (!loadReportsSuccess ? <p>Error loading report</p>:
                    <div className={classes.root}>
                        <SaveSuccessSnack saveSuccess={saveReportSuccess} callback={toggleSaveReportSuccess} />
                        <Grid 
                            container 
                            direction='row'
                            justify='flex-start'
                            alignItems='flex-start'
                            spacing={3}
                        >
                            <ReportBreadcrumb report={report} />
                            <ReportDetailDock report={report} />
                            <Grid item container xs={12} sm={8} lg={6}>
                                <Paper className={classes.paper}>
                                    <Grid item spacing={2} justify='flex-start' alignItems='center' container>
                                        {/* <Grid item>
                                            <IconButton
                                                onClick={handleEditButton}
                                                aria-label="toggle edit"
                                                title="toggle edit"
                                            >
                                                <EditIcon 
                                                    
                                                    color={readOnly ? 'default' : 'primary'}/>
                                            </IconButton>
                                        </Grid> */}
                                        <Grid item>
                                            <IconButton
                                                onClick={handleSaveButton(report, saveReport)}
                                                aria-label="save report"
                                                title="save report"
                                            >
                                                <SaveIcon 
                                                    
                                                  
                                                />
                                            </IconButton>
                                        </Grid>                                         
                                        <Grid item>
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
                                        <Grid item>
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
                                    <Grid
                                        direction='column'
                                        jusity='center'
                                        alignItems='center'
                                        spacing={2}
                                        item
                                        container
                                    >
                                        <Grid className={classes.grow} zeroMinWidth item>
                                            <Typography noWrap variant='h4'>
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
                                            <Typography noWrap variant='h4'>
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
        generateReport,
        getReport,
        toggleSaveReportSuccess
    }
)(ConnectedProjectDetail);

export default ProjectDetail;
