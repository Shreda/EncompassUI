import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AutorenewIcon from '@material-ui/icons/Autorenew';
import SendIcon from '@material-ui/icons/Send';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import {commonStyles} from '../../styles/index'
import { Link as RouterLink } from 'react-router-dom';
import './LandingPage.css'

const LandingPage = (props) => {
    const classes = commonStyles()

    return(
        <div className={classes.rootest}>
            <Grid container direction='column'>
                <Grid item container direction='column'>
                    <Grid 
                        className='main' 
                        item 
                        container
                        direction='column'
                        justify='center'
                        alignItems='center'
                    >
                        <Grid item>
                            <Typography variant='h2' component='h1'>
                                Encompass
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle1'>
                                The penetration test reporting tool
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid 
                    className={`negTopMargin ${classes.root}`} 
                    item 
                    container 
                    direction='column'
                >
                    <Grid
                        item
                        container
                        direction='row'
                        justify='center'
                        alignItems='center'
                        spacing={5}
                    >
                        <Grid className={`infoCard`} item container xs={10} sm={4} md={2}>
                            <Paper className={classes.paper}>
                                <Grid item container direction='column' alignItems='center'>
                                    <Grid item>
                                        <AutorenewIcon fontSize='large'/>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.grow} item container direction='column'>
                                    <Grid item>
                                        <Typography gutterBottom={true} variant='h5' component='h2'>Automation</Typography>
                                    </Grid>
                                    <Grid item>
                                    Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid className={`infoCard`} item container xs={10} sm={4} md={2}>
                            <Paper className={classes.paper}>
                                <Grid item container direction='column' alignItems='center'>
                                    <Grid item>
                                        <SendIcon fontSize='large'/>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.grow} item container direction='column'>
                                    <Grid item>
                                        <Typography gutterBottom={true} variant='h5' component='h2'>Speed</Typography>
                                    </Grid>
                                    <Grid item>
                                    Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid className={`infoCard`} item container xs={10} sm={4} md={2}>
                            <Paper className={classes.paper}>
                                <Grid item container direction='column' alignItems='center'>
                                    <Grid item>
                                        <PersonAddIcon fontSize='large'/>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.grow} item container direction='column'>
                                    <Grid item>
                                        <Typography gutterBottom={true} variant='h5' component='h2'>Retention</Typography>
                                    </Grid>
                                    <Grid item>
                                    Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid className={`footer ${classes.root}`} item container justify='center' direction='row'>
                    <Grid item container direction='column' xs={10} sm={4} md={2}>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' xs={10} sm={4} md={2}>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' xs={10} sm={4} md={2}>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>test</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default LandingPage