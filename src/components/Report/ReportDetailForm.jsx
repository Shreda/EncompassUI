import React from 'react'
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RoomIcon from '@material-ui/icons/Room'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'

import { commonStyles } from '../../styles/index'
import { editReport, saveReport, toggleSaveReportSuccess } from '../../actions/reports'

const mapStateToProps = (state, props) => {
    const phases = state.phase.phases.filter(p => {
        if(p.project === props.report.project) return true
        else return false
    })
    return({
        phases: phases
    })
}

const handleChange = (value, report, callback, param) => {
    console.log('value')
    console.log(value)
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
    toggleSaveReportSuccess,
    phases
}) => {
    const classes = commonStyles()

    const handleSave = (event, report) => {
        event.preventDefault()
        saveReport(report)
    }

    const handleMultiSelect = (callback, report, param) => event => {
        event.preventDefault()
        const {options} = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                const ph = phases.filter(p => {
                    if(p.id === options[i].value) return true
                    else return false
                })
                value.push(ph[0]);
            }
        }
        const r = {
            ...report,
            [param]: value
        }
        callback(r)
    }

    const phase_ids = report.phases.map(p => {
        return p.id
    })

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
                <FormControl>
                    <Select 
                        multiple
                        native
                        value={phase_ids}
                        onChange={handleMultiSelect(editReport, report, 'phases')}
                    >
                    {phases.map(p => (
                        <option value={p.id} key={p.id}>{p.name}</option>
                    ))}
                    </Select>
                </FormControl>
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
    mapStateToProps,
    {
        editReport,
        saveReport,
        toggleSaveReportSuccess
    }
)(ConnectedReportDetailForm)

export default ReportDetailForm