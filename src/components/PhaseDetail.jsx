import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Typography } from '@material-ui/core';
import {config} from '../constants/configuration';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
}));

const mapStateToProps = state => {
    return {
        phases: state.phases,
        loadingPhases: state.loadingPhases,
        loadPhasesSuccess: state.loadPhasesSuccess
    }
}

const getPhaseByURLId = (props) => {
    const phase = props.phases.filter(ph => {
        if(ph.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })

    return phase[0]
}

const ConnectedPhaseDetail = (props) => {
    const {
        phases,
        loadPhasesSuccess,
        loadingPhases,
    } = props

    const classes = useStyles()

    const phase = getPhaseByURLId(props)
 
    return (
            loadingPhases ? <p>Loading...</p>:(
                (!loadPhasesSuccess ? <p>Error loading phase</p>:
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
                                to={`/project/${phase.project.id}`}
                            >
                                {phase.project.name}
                            </Link>                    
                            <Typography>
                                Phase
                            </Typography>                    
                            <Link 
                                component={RouterLink} 
                                to={`/phase/${phase.id}`}
                            >
                                {phase.name}
                            </Link>                    
                        </Breadcrumbs>
                        <Typography variant='body1'>Findings:</Typography>
                        <ul>
                        {phase.findings?
                                phase.findings.map(f =>
                                    <li key={f.id}>
                                        <Typography variant='body1'>
                                            <Link 
                                                component={RouterLink} 
                                                to={`/finding/${f.id}`}
                                            >
                                                {f.title}
                                            </Link>                                
                                        </Typography>
                                    </li>
                                )
                            :<p>No findings</p>}
                        </ul>                        
                    </div>
                )
            )
    )
}

const PhaseDetail = connect(
    mapStateToProps,
    {
    }
)(ConnectedPhaseDetail);

export default PhaseDetail;
