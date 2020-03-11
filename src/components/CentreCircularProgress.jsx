import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'

const CentreCircularProgress = (props) => {
    return (
        <Grid style={{height:'80vh'}} container direction='row' alignItems='center' justify='center'>
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    )
}

export default CentreCircularProgress