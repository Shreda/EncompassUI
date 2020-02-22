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
import { editProject, saveProject, toggleSaveProjectSuccess } from '../../actions/index'

const handleChange = debounce((value, project, callback, param) => {
    const r = {
        ...project,
        [param]: value
    }
    callback(r)
})

const mapStateToProps = state => {
    return {
        saveProjectSuccess: state.saveProjectSuccess
    }
}


const ConnectedProjectDetailForm = ({
    project, 
    editProject, 
    saveProject,
    saveProjectSuccess,
    toggleSaveProjectSuccess
}) => {
    const classes = commonStyles()

    const handleSave = (event, project) => {
        event.preventDefault()
        saveProject(project)
    }

    return(
    <React.Fragment>
        <SaveSuccessSnack callback={toggleSaveProjectSuccess} saveSuccess={saveProjectSuccess}/>
        <Grid 
            onSubmit={(e) => handleSave(e, project)} 
            component='form' 
            container 
            spacing={3} 
            direction='column' 
            className={classes.grow} 
            item
        >
            <Grid item>
                <TextField 
                    onChange={(e) => handleChange(e.target.value, project, editProject, 'name')} 
                    fullWidth value={project.name} 
                    label="Name" 
                />
            </Grid>
            <Grid item>
                <TextField 
                    fullWidth 
                    onChange={(e) => handleChange(e.target.value, project, editProject, 'reference')}
                    value={project.reference} 
                    label="Short Name" />
            </Grid>
            <Grid item>
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={(e) => handleSave(e, project)}
                >
                    save
                </Button>
            </Grid>            
        </Grid>
    </React.Fragment>          
    )
}

const ProjectDetailForm = connect(
    mapStateToProps,
    {
        editProject,
        saveProject,
        toggleSaveProjectSuccess
    }
)(ConnectedProjectDetailForm)

export default ProjectDetailForm