import React from 'react'
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RoomIcon from '@material-ui/icons/Room'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import { commonStyles } from '../../styles/index'
import { editPhase, savePhase, toggleSavePhaseSuccess } from '../../actions/index'

const handleChange = (value, phase, callback, param) => {
    const r = {
        ...phase,
        [param]: value
    }
    callback(r)
}

const ConnectedPhaseDetailForm = ({
    phase, 
    editPhase, 
    savePhase,
    savePhaseSuccess,
    toggleSavePhaseSuccess
}) => {
    const classes = commonStyles()

    const handleSave = (event, phase) => {
        event.preventDefault()
        savePhase(phase)
    }

    return(
    <React.Fragment>
        <Grid 
            onSubmit={(e) => handleSave(e, phase)}
            component='form'
            container
            spacing={3}
            direction='column'
            className={classes.grow}
            item
        >
            <Grid item>
                <TextField 
                    onChange={(e) => handleChange(e.target.value, phase, editPhase, 'name')}
                    fullWidth value={phase.name}
                    label="Name" 
                />
            </Grid>
            <Grid item>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={(e) => handleSave(e, phase)}
                >
                    save
                </Button>
            </Grid>            
        </Grid>
    </React.Fragment>          
    )
}

const PhaseDetailForm = connect(
    null,
    {
        editPhase,
        savePhase,
        toggleSavePhaseSuccess
    }
)(ConnectedPhaseDetailForm)

export default PhaseDetailForm