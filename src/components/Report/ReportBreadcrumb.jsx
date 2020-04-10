import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'

import { getProject } from '../../actions/index'

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip';

const mapStateToProps = (state, props) => {
    const project = state.project.projects.filter(p => {
        if(p.id === props.report.project) {
            return true
        } else {
            return false
        }
    })
    return {
        project: project[0],
        loadProject: state.project.loadProject
    }
}

const ConnectedReportBreadcrumb = (props) => {
    const {
        report,
        project,
        loadProject
    } = props

    React.useEffect(() => {
        async function fetchProject() {
            props.getProject(report.project)
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
                Report
            </Typography>                    
            <Chip 
                component={RouterLink} 
                to={`/report/${report.id}`}
                label={report.name}
                clickable
            />
                
        </Breadcrumbs>
    </WrapBreadcrumb>     
    )
}
const ReportBreadcrumb = connect(
    mapStateToProps,
    {
        getProject
    }
)(ConnectedReportBreadcrumb)
export default ReportBreadcrumb