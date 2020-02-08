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
        projects: state.projects,
        loadingProjects: state.loadingProjects,
        loadProjectsSuccess: state.loadProjectsSuccess
    }
}

const getProjectByURLId = (props) => {
    const project = props.projects.filter(p => {
        if(p.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })

    return project[0]
}

const ConnectedProjectDetail = (props) => {
    const {
        projects,
        loadProjectsSuccess,
        loadingProjects
    } = props

    const classes = useStyles()

    const project = getProjectByURLId(props)

    return (
        // renderProject(props)
        <div>          
            {loadingProjects ? <p>Loading...</p>:(
                (!loadProjectsSuccess ? <p>Error loading project</p>:
                    <div>
                        <Breadcrumbs>
                            <Link component={RouterLink} to='/'>
                                Home
                            </Link>                    
                            <Typography>
                                Project
                            </Typography>                    
                            <Link 
                                component={RouterLink} 
                                to={`/project/${project.id}`}
                            >
                                {project.name}
                            </Link>                    
                        </Breadcrumbs>                          
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
                            :<p>No phases</p>}
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
                            ) : null }
                        </ul>
                    </div>                        
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
