import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';

const CentreCircularProgress = (props) => {
    return (
        <Grid style={{height:'80vh'}} container direction='column' alignItems='center' justify='center' spacing={2}>
            <Grid item>
                <CircularProgress />
            </Grid>
            <Grid item>
            {props.message ? (
                <Typography variant='subtitle1'>
                    {props.message}
                </Typography>
            ) : (
                null
            )}
        </Grid>
        </Grid>
    )
}

export default CentreCircularProgress