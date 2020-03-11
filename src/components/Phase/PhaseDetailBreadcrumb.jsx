import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'


import WrapBreadcrumb from '../WrapBreadcrumb'
import { getProject } from '../../actions/index'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

const mapStateToProps = (state, props) => {
    const project = state.projects.filter(p => {
        if(p.id === props.phase.project) {
            return true
        } else {
            return false
        }
    })
    return {
        project: project[0],
        loadProject: state.loadProject
    }
}

const ConnectedPhaseDetailBreadcrumb = (props) => {
    const {
        phase,
        project,
        loadProject
    } = props

    React.useEffect(() => {
        async function fetchProject() {
            props.getProject(phase.project)
        }

        if (!project && !loadProject) {
            fetchProject()
        }
    },[])

    return (
    <WrapBreadcrumb>
        <Breadcrumbs>
            <Chip 
                component={RouterLink}
                to='/'
                clickable
                label='Home'
            />                   
            <Typography>
                Project
            </Typography>
            {project ? (
                <Chip 
                    component={RouterLink} 
                    to={`/project/${project.id}`}
                    label={project.name}
                    clickable
                />
            ) : (null)}               
            <Typography>
                Phase
            </Typography>                    
            <Chip 
                component={RouterLink} 
                to={`/phase/${phase.id}`}
                label={phase.name}
                clickable
            />
        </Breadcrumbs>
    </WrapBreadcrumb>        
    )
}

const PhaseDetailBreadcrumb = connect(
    mapStateToProps,
    {
        getProject
    }
)(ConnectedPhaseDetailBreadcrumb)

export default PhaseDetailBreadcrumb