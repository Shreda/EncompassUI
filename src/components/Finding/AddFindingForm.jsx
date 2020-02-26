import React from 'react'
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {addFinding} from '../../actions/index'

const useStyles = makeStyles(theme => ({
    leftMargin: {
        marginLeft: theme.spacing(2),
    },
  }));

const ConnectedAddFindingForm = (props) => {

    const {
        addFinding
    } = props

    const [title, setTitle] = React.useState('')

    const handleSave = async (event, title) => {
        event.preventDefault()
        const finding = {
            title: title,
            phase: props.phaseid,
            impact: 0,
            likelihood: 0,
        }
        await addFinding(finding)
        setTitle('')
    }

    const classes = useStyles()

    return(
        <Grid onSubmit={(e) => handleSave(e, title)} component='form' alignItems='center' item container spacing={2} directon='row'>
            <Grid item>
                <TextField 
                    autoComplete='off' 
                    className={classes.leftMargin} 
                    fullWidth id="outlined-basic" 
                    label="New Finding Title" 
                    variant="outlined"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    autoFocus
                />
            </Grid>
            <Grid className={classes.leftMargin} item>
                <Button 
                    color='primary'
                    variant='contained'
                    onClick={(e) => handleSave(e, title)}
                    type='submit'
                >
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}

const AddFindingForm = connect(
    null,
    {
        addFinding
    }
)(ConnectedAddFindingForm)

export default AddFindingForm