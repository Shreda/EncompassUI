import React from 'react'
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {addPhase} from '../../actions/index'

const useStyles = makeStyles(theme => ({
    leftMargin: {
        marginLeft: theme.spacing(2),
    },
  }));

const ConnectedAddPhaseForm = (props) => {

    const {
        addPhase
    } = props

    const [name, setName] = React.useState('')

    const handleSave = (event, name) => {
        event.preventDefault()
        const phase = {
            name: name,
            project: props.projectid
        }
        addPhase(phase)
        setName('')
    }

    const classes = useStyles()

    return(
        <Grid onSubmit={(e) => handleSave(e, name)} component='form' alignItems='center' item container spacing={2} directon='row'>
            <Grid item>
                <TextField 
                    autoComplete='off' 
                    className={classes.leftMargin} 
                    fullWidth id="outlined-basic" 
                    label="New Phase" 
                    variant="outlined"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoFocus
                />
            </Grid>
            <Grid className={classes.leftMargin} item>
                <Button 
                    color='primary'
                    variant='contained'
                    onClick={(e) => handleSave(e, name)}
                    type='submit'
                >
                    Save
                </Button>
            </Grid>
        </Grid>
    )
}

const AddPhaseForm = connect(
    null,
    {
        addPhase
    }
)(ConnectedAddPhaseForm)

export default AddPhaseForm