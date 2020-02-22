import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Typography, Paper } from '@material-ui/core';
import {config} from '../../constants/configuration';

import Grid from '@material-ui/core/Grid'

import FindingList from '../Finding/FindingList'
import PhaseDetailBreadcrumb from './PhaseDetailBreadcrumb'
import Dock from '../Dock'
import MainStage from '../MainStage'
import {commonStyles} from '../../styles/index'
import {
    getPhase,
    getPhaseFindings
} from '../../actions/index'

const mapStateToProps = (state, props) => {
    const phase = state.phases.filter(ph => {
        if(ph.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })
    const findings = state.findings.filter(f => {
        if(f.phase.id === props.match.params.id) {
            return true
        } else {
            return false
        }
    })
    return {
        phases: state.phases,
        loadingPhases: state.loadingPhases,
        loadPhasesSuccess: state.loadPhasesSuccess,
        loadPhase: state.loadPhase,
        isAuthenticated: state.isAuthenticated,
        phase: phase[0],
        findings: findings
    }
}

const ConnectedPhaseDetail = (props) => {
    const {
        phases,
        loadPhasesSuccess,
        loadingPhases,
        loadPhase,
        isAuthenticated,
        phase,
        findings
    } = props
    
    const classes = commonStyles()
    
    React.useEffect(() => {
        async function fetchPhase() {
            props.getPhase(props.match.params.id)
        }

        async function fetchFindings() {
            props.getPhaseFindings(props.match.params.id)
        }



        if (!phase && !loadPhase) {
            fetchPhase()
        }

        fetchFindings()
    }, [])
    return (
            loadingPhases ? <p>Loading...</p>:(
                (!loadPhasesSuccess ? <p>Error loading phase</p>: (
                    loadPhase ? <p>Loading phase...</p> : (
                        !phase ? <p>No phase...</p>: (
                            <div className={classes.root}>
                                <Grid 
                                    container 
                                    direction='row'
                                    justify='flex-start'
                                    alignItems='flex-start'
                                    spacing={3}
                                >
                                    <PhaseDetailBreadcrumb phase={phase} />
                                    <Dock>
                                        <Grid item container direction='column' justify='flex-start' alignItems='flex-start'>
                                            <Grid item>
                                                <Typography variant='subtitle1'>
                                                    {phase.name}
                                                </Typography>
                                            </Grid>
                                        </Grid>                                        
                                    </Dock>
                                    <MainStage>
                                        <Grid className={classes.grow} item container direction='column' justify='flex-start' alignItems='flex-start'>
                                            <Grid item>
                                                <Typography variant='subtitle1'>
                                                    Findings
                                                </Typography>
                                            </Grid>
                                            <Grid className={classes.grow} item>
                                                {findings? (
                                                    <FindingList findings={findings}/>
                                                ) : (null)}
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

const PhaseDetail = connect(
    mapStateToProps,
    {
        getPhase,
        getPhaseFindings
    }
)(ConnectedPhaseDetail);

export default PhaseDetail;
