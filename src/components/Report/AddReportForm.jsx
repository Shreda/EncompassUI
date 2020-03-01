import React from 'react'
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {addReport} from '../../actions/index'

const useStyles = makeStyles(theme => ({
    leftMargin: {
        marginLeft: theme.spacing(2),
    },
  }));

const ConnectedAddReportForm = (props) => {

    const {
        addReport
    } = props

    const [name, setName] = React.useState('')

    const handleSave = async (event, name) => {
        event.preventDefault()
        const report = {
            name: name,
            project: props.projectid
        }
        await addReport(report)
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
                    label="New Report" 
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

const AddReportForm = connect(
    null,
    {
        addReport
    }
)(ConnectedAddReportForm)

export default AddReportForm