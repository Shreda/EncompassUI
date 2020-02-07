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
                        <p>Reference: {project.reference}</p>
                        <p>Name: {project.name}</p>
                        <p>Description: {project.description}</p>
                        <p>Phases:</p>
                        <ul>
                            {project.phases ? 
                                project.phases.map(ph =>
                                    <li key={ph.id}>
                                        <Link 
                                            component={RouterLink} 
                                            to={`/phase/${ph.id}`}
                                        >
                                            {ph.name}
                                        </Link>                                
                                    </li>
                                )
                            :<p>No phases</p>}                        
                        </ul>
                        {project.report_url ?
                            <p>Generated report:  
                                <Link href={`${config.url.MEDIA_ROOT}${project.report_url}`}>
                                    download
                                </Link>
                            </p>
                        : null}
                        
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
