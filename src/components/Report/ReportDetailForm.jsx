import React from 'react'
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RoomIcon from '@material-ui/icons/Room'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'

import { commonStyles } from '../../styles/index'
import { editReport, saveReport, toggleSaveReportSuccess } from '../../actions/index'

const handleChange = (value, report, callback, param) => {
    const r = {
        ...report,
        [param]: value
    }
    callback(r)
}

const ConnectedReportDetailForm = ({
    report, 
    editReport, 
    saveReport,
    saveReportSuccess,
    toggleSaveReportSuccess
}) => {
    const classes = commonStyles()

    const handleSave = (event, report) => {
        event.preventDefault()
        saveReport(report)
    }

    return(
    <React.Fragment>
        <Grid 
            onSubmit={(e) => handleSave(e, report)}
            component='form'
            container
            spacing={3}
            direction='column'
            className={classes.grow}
            item
        >
            <Grid item>
                <TextField 
                    onChange={(e) => handleChange(e.target.value, report, editReport, 'name')}
                    fullWidth value={report.name}
                    label="Name" 
                />
            </Grid>
            <Grid item>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={(e) => handleSave(e, report)}
                >
                    save
                </Button>
            </Grid>            
        </Grid>
    </React.Fragment>          
    )
}

const ReportDetailForm = connect(
    null,
    {
        editReport,
        saveReport,
        toggleSaveReportSuccess
    }
)(ConnectedReportDetailForm)

export default ReportDetailForm