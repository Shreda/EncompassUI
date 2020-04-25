import React from 'react'
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { Typography, Input } from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import Button from '@material-ui/core/Button'


import {commonStyles} from '../../styles/index'
import {editFinding, saveFinding} from '../../actions/findings'
import { getColor } from '../../utils'

const handleSelect = (name, finding, callback) => event => {
    const f = {
        ...finding,
        [name]: event.target.value
    }
    callback(f)
};

const ConnectedFindingDetailForm = props => {
    const {
        finding,
        editFinding,
        saveFinding
    } = props

    const classes = commonStyles()

    const handleSave = (event, finding) => {
        event.preventDefault()
        saveFinding(finding)
    }

    return(
        <React.Fragment>
            <Grid item className={classes.grow}>
                <TextField 
                    fullWidth
                    onChange={handleSelect('title', finding, editFinding)}
                    value={finding.title}
                    label="Title"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BugReportIcon 
                                    style={{color: getColor(finding)}} 
                                />
                            </InputAdornment>
                        )
                    }}
                />                
            </Grid>
            <Grid className={classes.grow} item>
                <FormControl fullWidth>
                    <InputLabel htmlFor='impact-select'>
                        Impact
                    </InputLabel>
                    <Select
                        native
                        value={finding.impact}
                        onChange={handleSelect('impact', finding, editFinding)}
                        inputProps={{
                            name: 'impact',
                            id: 'impact-select'
                        }}
                    >
                        <option value={0}>Informational</option>
                        <option value={1}>Extreme</option>
                        <option value={2}>Major</option>
                        <option value={3}>Moderate</option>
                        <option value={4}>Low</option>
                        <option value={5}>Negligible</option>
                    </Select>
                </FormControl>                  
            </Grid>
            <Grid className={classes.grow} item>
                <FormControl fullWidth>
                    <InputLabel htmlFor='likelihood-select'>
                        Likelihood
                    </InputLabel>
                    <Select
                        native
                        value={finding.likelihood}
                        onChange={handleSelect('likelihood', finding, editFinding)}
                        inputProps={{
                            name: 'likelihood',
                            id: 'likelihood-select'
                        }}
                    >
                        <option value={0}>Informational</option>
                        <option value={1}>Certain</option>
                        <option value={2}>Likely</option>
                        <option value={3}>Possible</option>
                        <option value={4}>Unlikely</option>
                        <option value={5}>Rare</option>
                    </Select>
                </FormControl>           
            </Grid>
            <Grid item>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={(e) => handleSave(e, finding)}
                >
                    save
                </Button>
            </Grid>                                                    
        </React.Fragment>
    )
}

const FindingDetailForm = connect(
    null,
    {
        editFinding,
        saveFinding
    }
)(ConnectedFindingDetailForm);

export default FindingDetailForm;