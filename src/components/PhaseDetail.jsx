import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Typography, Paper } from '@material-ui/core';
import {config} from '../constants/configuration';

import Grid from '@material-ui/core/Grid'

import WrapBreadcrumb from './WrapBreadcrumb'

import {
    getPhase
} from '../actions/index'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    paper: {
        padding: theme.spacing(2),
        // maxHeight: '400px',
        // overflow: 'scroll'
    }
}));

const mapStateToProps = state => {
    return {
        phases: state.phases,
        loadingPhases: state.loadingPhases,
        loadPhasesSuccess: state.loadPhasesSuccess,
        loadPhase: state.loadPhase,
        isAuthenticated: state.isAuthenticated
    }
}

const getPhaseByURLId = async (props) => {
    const phase = await props.phases.filter(ph => {
        if(ph.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })
    if (Array.isArray(phase) && phase.length) {
        return phase[0]
    }
    else {
        const phase = await props.getPhase(props.match.params.id)
        return phase
    }    
}

const ConnectedPhaseDetail = (props) => {
    const {
        phases,
        loadPhasesSuccess,
        loadingPhases,
        loadPhase,
        isAuthenticated
    } = props

    
    const [phase, setPhase] = React.useState(null);
    
    const classes = useStyles()
    
    const fetchPhase = async () => {
        const phase = await getPhaseByURLId(props)
        setPhase(phase)
    }
    
    React.useEffect(() => {
        fetchPhase()
    }, [phase])
    
    return (
            loadingPhases ? <p>Loading...</p>:(
                (!loadPhasesSuccess ? <p>Error loading phase</p>: (
                    loadPhase ? <p>Loading phase...</p> : (
                        !phase ? <p>No phase...</p>: (
                            <div className={classes.root}>
                                <WrapBreadcrumb>
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
                                </WrapBreadcrumb>
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
                )
            )
    )
}

const PhaseDetail = connect(
    mapStateToProps,
    {
        getPhase
    }
)(ConnectedPhaseDetail);

export default PhaseDetail;
