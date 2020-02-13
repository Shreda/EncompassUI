import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { commonStyles } from '../styles/index'

const Dock = (props) => {
    // Dock should wrap some Grid items
    const {
        children
    } = props

    const classes = commonStyles()

    return (
        <Grid item container xs={12} sm={3} lg={3}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    {children}
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Dock