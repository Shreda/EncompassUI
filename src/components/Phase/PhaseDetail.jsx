import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {config} from '../../constants/configuration';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Typography, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';

import FindingList from '../Finding/FindingList'
import AddFindingForm from '../Finding/AddFindingForm'
import PhaseDetailBreadcrumb from './PhaseDetailBreadcrumb'
import PhaseDetailDock from './PhaseDetailDock'
import SaveSuccessSnack from '../SaveSuccessSnack'
import Dock from '../Dock'
import MainStage from '../MainStage'
import {commonStyles} from '../../styles/index'
import {
    getPhase,
    getPhaseFindings,
    toggleSavePhaseSuccess
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
        findings: findings,
        savePhaseSuccess: state.savePhaseSuccess
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
        findings,
        toggleSavePhaseSuccess,
        savePhaseSuccess
    } = props
    
    const classes = commonStyles()
    const [addFinding, setAddFinding] = React.useState(false)

    const toggleForm = event => {
        event.preventDefault()
        setAddFinding(!addFinding)
    }
    
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
                                <SaveSuccessSnack saveSuccess={savePhaseSuccess} callback={toggleSavePhaseSuccess} />
                                <Grid 
                                    container 
                                    direction='row'
                                    justify='flex-start'
                                    alignItems='flex-start'
                                    spacing={3}
                                >
                                    <PhaseDetailBreadcrumb phase={phase} />
                                    {/* <Dock>
                                        <Grid item container direction='column' justify='flex-start' alignItems='flex-start'>
                                            <Grid item>
                                                <Typography variant='h4' component='h2'>
                                                    {phase.name}
                                                </Typography>
                                            </Grid>
                                        </Grid>                                        
                                    </Dock> */}
                                    <PhaseDetailDock phase={phase}/>
                                    <MainStage>
                                        <Grid className={classes.grow} item container direction='column' justify='flex-start' alignItems='flex-start'>
                                            <Grid item>
                                                <Typography variant='h5' component='h2'>
                                                    Findings
                                                </Typography>
                                            </Grid>
                                            <Grid className={classes.grow} item>
                                                {findings? (
                                                    <FindingList findings={findings}/>
                                                ) : (null)}
                                                {addFinding ? (
                                                <React.Fragment>
                                                    <AddFindingForm phaseid={props.match.params.id}/>
                                                    <IconButton onClick={toggleForm}>
                                                        <CloseIcon />
                                                    </IconButton>                                                    

                                                </React.Fragment>
                                                ) : (
                                                <IconButton onClick={toggleForm}>
                                                    <AddIcon 
                                                        color='secondary' 
                                                    />
                                                </IconButton>     
                                                )}
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
        getPhaseFindings,
        toggleSavePhaseSuccess
    }
)(ConnectedPhaseDetail);

export default PhaseDetail;
