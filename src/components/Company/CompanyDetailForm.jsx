import React from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RoomIcon from '@material-ui/icons/Room'
import red from '@material-ui/core/colors/red'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import { commonStyles } from '../../styles/index'
import SaveSuccessSnack from '../SaveSuccessSnack'
import { editCompany, saveCompany, toggleSaveCompanySuccess } from '../../actions/companies'

const handleChange = (value, company, callback, param) => {
    const r = {
        ...company,
        [param]: value
    }
    callback(r)
}

const mapStateToProps = state => {
    return {
        saveCompanySuccess: state.company.saveCompanySuccess
    }
}


const ConnectedCompanyDetailForm = ({
    company, 
    editCompany, 
    saveCompany,
    saveCompanySuccess,
    toggleSaveCompanySuccess
}) => {
    const classes = commonStyles()

    const handleSave = (event, company) => {
        event.preventDefault()
        saveCompany(company)
    }

    return(
    <React.Fragment>
        <SaveSuccessSnack callback={toggleSaveCompanySuccess} saveSuccess={saveCompanySuccess}/>
        <Grid 
            onSubmit={(e) => handleSave(e, company)} 
            component='form' 
            container 
            spacing={3} 
            direction='column' 
            className={classes.grow} 
            item
        >
            <Grid item>
                <TextField 
                    onChange={(e) => handleChange(e.target.value, company, editCompany, 'name')} 
                    fullWidth value={company.name} 
                    label="Name" 
                />
            </Grid>
            <Grid item>
                <TextField 
                    fullWidth 
                    onChange={(e) => handleChange(e.target.value, company, editCompany, 'short_name')}
                    value={company.short_name} 
                    label="Short Name" />
            </Grid>
            <Grid item>
                <TextField 
                    fullWidth
                    onChange={(e) => handleChange(e.target.value, company, editCompany, 'address')}
                    value={company.address} 
                    label="Address" 
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RoomIcon style={{color: red[400]}} />
                          </InputAdornment>
                        ),
                      }}                    
                />
            </Grid>
            <Grid item>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={(e) => handleSave(e, company)}
                >
                    save
                </Button>
            </Grid>            
        </Grid>
    </React.Fragment>          
    )
}

const CompanyDetailForm = connect(
    mapStateToProps,
    {
        editCompany,
        saveCompany,
        toggleSaveCompanySuccess
    }
)(ConnectedCompanyDetailForm)

export default CompanyDetailForm