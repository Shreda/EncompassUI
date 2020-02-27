import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux'

import { getProject } from '../../actions/index'

import WrapBreadcrumb from '../WrapBreadcrumb'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const mapStateToProps = (state, props) => {
    const project = state.projects.filter(p => {
        if(p.id === props.report.project) {
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
            <Link component={RouterLink} to='/'>
                Home
            </Link>                    
            <Typography>
                Project
            </Typography>
            {project ? (
                <Link 
                    component={RouterLink} 
                    to={`/project/${project.id}`}
                >
                    {project.name}
                </Link>                    
            ) : (null)}                
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
    )
}
const ReportBreadcrumb = connect(
    mapStateToProps,
    {
        getProject
    }
)(ConnectedReportBreadcrumb)
export default ReportBreadcrumb