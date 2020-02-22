import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import { commonStyles } from '../../styles/index'
import Dock from '../Dock'
import ProjectDetailRead from './ProjectDetailRead'
import ProjectDetailForm from './ProjectDetailForm'

import RoomIcon from '@material-ui/icons/Room';
import red from '@material-ui/core/colors/red'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton'

const ProjectDetailDock = ({project}) => {
    const classes = commonStyles()
    const [readOnly, setReadOnly] = React.useState(true);

    const handleEditButton = event => {
        event.preventDefault()
        setReadOnly(!readOnly)
    }
    
    return (
    <Dock>
        <Grid item>
            <IconButton
                onClick={handleEditButton}
                aria-label="toggle edit"
                title="toggle edit"
            >
                <EditIcon 
                    
                    color={readOnly ? 'inherit' : 'primary'}/>
            </IconButton>                
        </Grid>
        {readOnly ? (
            <ProjectDetailRead project={project} />
        ) : (
            <ProjectDetailForm project={project} />
        )}
    </Dock>    
    )
}

export default ProjectDetailDock