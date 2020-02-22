import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Typography, Paper } from '@material-ui/core';
import { config } from '../../constants/configuration';

import Grid from '@material-ui/core/Grid'

import { commonStyles } from '../../styles/index'

import {
    getProject,
    getProjectPhases
} from '../../actions/index'

import ProjectDetailBreadcrumb from './ProjectDetailBreadcrumb'
import ProjectDetailDock from './ProjectDetailDock'
import ProjectPhaseList from './ProjectPhaseList'
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
    return {
        projects: state.projects,
        loadingProjects: state.loadingProjects,
        loadProjectsSuccess: state.loadProjectsSuccess,
        loadProject: state.loadProject,
        project: project[0],
        phases: phases
    }
}

const ConnectedProjectDetail = (props) => {
    const {
        projects,
        loadProjectsSuccess,
        loadingProjects,
        loadProject,
        getProject,
        getProjectPhases,
        project,
        phases
    } = props

    const classes = commonStyles()

    React.useEffect(() => {
        async function fetchProject() {
            props.getProject(props.match.params.id)
        }

        async function fetchPhases() {
            getProjectPhases(props.match.params.id)
        }

        if (!project && !loadProject) {
            fetchProject()
        }

        fetchPhases()
    },[])

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
                                            <Typography variant='subtitle1'>
                                                Phases
                                            </Typography>                                                    
                                        </Grid>
                                        <Grid className={classes.grow} item>
                                            <ProjectPhaseList phases={phases} />
                                        </Grid>
                                    </Grid>                                    
                                </MainStage>
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
