import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Typography, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField'


import { config } from '../../constants/configuration';
import { commonStyles } from '../../styles/index'
import AddPhaseForm from '../Phase/AddPhaseForm'
import AddReportForm from '../Report/AddReportForm'

import {
    getProject,
    getProjectPhases
} from '../../actions/index'

import ProjectDetailBreadcrumb from './ProjectDetailBreadcrumb'
import ProjectDetailDock from './ProjectDetailDock'
import PhaseList from '../Phase/PhaseList'
import ReportList from '../Report/ReportList'
import Dock from '../Dock';
import MainStage from '../MainStage'

const mapStateToProps = (state, props) => {
    const project = state.projects.filter(p => {
        if (p.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })
    const phases = state.phases.filter(p => {
        if(p.project === props.match.params.id) {
            return true
        } else {
            return false
        }
    })
    const reports = state.reports.filter(r => {
        if(r.project === props.match.params.id) {
            return true
        } else {
            return false
        }
    })
    return {
        loadingProjects: state.loadingProjects,
        loadProjectsSuccess: state.loadProjectsSuccess,
        loadProject: state.loadProject,
        project: project[0],
        phases: phases,
        reports: reports
    }
}

const ConnectedProjectDetail = (props) => {
    const {
        loadProjectsSuccess,
        loadingProjects,
        loadProject,
        getProject,
        getProjectPhases,
        project,
        phases,
        reports
    } = props

    const classes = commonStyles()
    const [showAddProject, setShowAddProject] = React.useState(false)
    const [showAddReport, setShowAddReport] = React.useState(false)

    const toggleForm = event => {
        event.preventDefault()
        setShowAddProject(!showAddProject)
    }

    const toggleReportForm = event => {
        event.preventDefault()
        setShowAddReport(!showAddReport)
    }

    React.useEffect(() => {
        async function fetchProject() {
            props.getProject(props.match.params.id)
        }

        if (!project && !loadProject) {
            fetchProject()
        }
    })

    React.useEffect(() => {
        async function fetchPhases() {
            getProjectPhases(props.match.params.id)
        }
        fetchPhases()
    }, [])

    return (
        loadingProjects ? <p>Loading...</p> : (
            (!loadProjectsSuccess ? <p>Error loading project</p> : (
                loadProject ? <p>Loading project...</p> : (
                    !project ? <p>No project...</p> : (
                        <div className={classes.root}>
                            <Grid
                                container
                                direction='row'
                                jusify='flex-start'
                                alignItems='flex-start'
                                spacing={3}
                            >
                                <ProjectDetailBreadcrumb project={project} />
                                <ProjectDetailDock project={project} />
                                <MainStage>
                                    <Grid item direction='column' spacing={2} justify='flex-start' alignItems='flex-start' container>
                                        <Grid item>
                                            <Typography variant='h5' component='h2'>
                                                Phases
                                            </Typography>                                                    
                                        </Grid>
                                        <Grid className={classes.grow} item>
                                            <PhaseList showDelete={true} phases={phases} />
                                            {showAddProject ? (
                                                <React.Fragment>
                                                    <AddPhaseForm projectid={props.match.params.id}/>
                                                    <IconButton onClick={toggleForm}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </React.Fragment>
                                            ): (
                                                <IconButton onClick={toggleForm}>
                                                    <AddIcon 
                                                        color='secondary' 
                                                    />
                                                </IconButton>                                                
                                            )}
                                        </Grid>
                                        <Grid item className={classes.grow}>
                                        </Grid>
                                    </Grid>                                    
                                </MainStage>
                                <Dock>
                                <Grid item container spacing={2} direction='column' justify='flex-start' alignItems='flex-start'>
                                    <Grid item>
                                        <Typography variant='h5' component='h2'>
                                            Reports
                                        </Typography>
                                    </Grid>
                                    <Grid item className={classes.grow}>
                                        <ReportList reports={reports} />
                                        {showAddReport ? (
                                            <React.Fragment>
                                                <AddReportForm projectid={props.match.params.id}/>
                                                <IconButton onClick={toggleReportForm}>
                                                    <CloseIcon />
                                                </IconButton>                                                
                                            </React.Fragment>
                                        ) : (
                                            <IconButton onClick={toggleReportForm}>
                                                <AddIcon 
                                                    color='secondary' 
                                                />
                                            </IconButton>                                                
                                        )}
                                    </Grid>
                                </Grid>                                    
                                </Dock>
                            </Grid>
                        </div>
                    )
                )
            )
            )
        )
    )
}

const ProjectDetail = connect(
    mapStateToProps,
    {
        getProject,
        getProjectPhases
    }
)(ConnectedProjectDetail);

export default ProjectDetail;
