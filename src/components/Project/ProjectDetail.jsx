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
    getProject
} from '../../actions/index'

import ProjectDetailBreadcrumb from './ProjectDetailBreadcrumb'
import ProjectDetailDock from './ProjectDetailDock'
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
    return {
        projects: state.projects,
        loadingProjects: state.loadingProjects,
        loadProjectsSuccess: state.loadProjectsSuccess,
        loadProject: state.loadProject,
        project: project[0]
    }
}

const ConnectedProjectDetail = (props) => {
    const {
        projects,
        loadProjectsSuccess,
        loadingProjects,
        loadProject,
        getProject,
        project
    } = props

    const classes = commonStyles()

    React.useEffect(() => {
        async function fetchProject() {
            props.getProject(props.match.params.id)
        }

        if (!project && !loadProject) {
            fetchProject()
        }
    })

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
                                <MainStage></MainStage>
                            </Grid>
                            <Typography variant='body1'>
                                Reference: {project.reference}
                            </Typography>
                            <Typography variant='body1'>
                                Name: {project.name}
                            </Typography>
                            <Typography variant='body1'>
                                Description: {project.description}
                            </Typography>
                            <Typography variant='body1'>
                                Phases:
                                </Typography>
                            <ul>
                                {project.phases ?
                                    project.phases.map(ph =>
                                        <li key={ph.id}>
                                            <Typography variant='body1'>
                                                <Link
                                                    component={RouterLink}
                                                    to={`/phase/${ph.id}`}
                                                >
                                                    {ph.name}
                                                </Link>
                                            </Typography>
                                        </li>
                                    )
                                    : <p>No phases</p>}
                            </ul>
                            <Typography variant='body1'>
                                Reports:
                                </Typography>
                            <ul>
                                {project.reports ? project.reports.map(r =>
                                    <li key={r.id}>
                                        <Typography variant='body1'>
                                            <Link
                                                component={RouterLink}
                                                to={`/report/${r.id}`}
                                            >
                                                {r.name}
                                            </Link>
                                        </Typography>
                                    </li>
                                ) : null}
                            </ul>
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
        getProject
    }
)(ConnectedProjectDetail);

export default ProjectDetail;
