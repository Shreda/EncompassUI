import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { commonStyles } from '../../styles/index'

const PhaseDetailForm = ({phase}) => {

    const classes = commonStyles()

    return (
        <Grid item className={classes.grow}>
            <Typography variant='h4' component='h2'>
                {phase.name}
            </Typography>
        </Grid>
    )
}

export default PhaseDetailForm
