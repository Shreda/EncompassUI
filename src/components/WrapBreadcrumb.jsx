import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    paper: {
        padding: theme.spacing(2),
        // maxHeight: '400px',
        // overflow: 'scroll'
    }
}));


const WrapBreadcrumb = (props) => {
    const classes = useStyles()
    const {
        children
    } = props
    return (
        <Grid 
            item 
            container 
            direction='column' 
            justify='flex-start' 
            alignItems='flex-start'
        >
            <Grid item>
                <Paper className={classes.paper}>
                    {children}
                </Paper>
            </Grid>
        </Grid>                        
    )
}

export default WrapBreadcrumb