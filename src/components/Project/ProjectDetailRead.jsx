import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RoomIcon from '@material-ui/icons/Room'
import red from '@material-ui/core/colors/red'

import { commonStyles } from '../../styles/index'

const ProjectDetailRead = ({project}) => {

    const classes = commonStyles()

    return (
    <React.Fragment>
        <Grid className={classes.grow} item>
            <Typography gutterBottom={false} variant='subtitle1'>
                {project.name}
            </Typography>
            <Typography color="textSecondary">
                {project.reference}
            </Typography>
        
        </Grid>
    </React.Fragment>        
    )
}

export default ProjectDetailRead