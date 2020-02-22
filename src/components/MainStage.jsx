import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { commonStyles } from '../styles/index'

const MainStage = (props) => {
    // Main area of a page
    // MainStage should wrap some Grid items
    const {
        children
    } = props

    const classes = commonStyles()

    return (

        <Grid item container xs={12} sm={6} lg={6}>
            <Paper className={classes.paper}>
                {children}
            </Paper>    
        </Grid>
    )
}

export default MainStage