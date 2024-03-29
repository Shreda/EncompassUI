import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import RoomIcon from '@material-ui/icons/Room'
import red from '@material-ui/core/colors/red'

import { commonStyles } from '../../styles/index'

const CompanyDetailRead = ({company}) => {

    const classes = commonStyles()

    return (
    <React.Fragment>
        <Grid className={classes.grow} item>
            <Typography gutterBottom={false} variant='h4' component='h1'>
                {company.name}
            </Typography>
            <Typography color="textSecondary">
                {company.short_name}
            </Typography>
        
        </Grid>
        <Grid spacing={2} container alignItems='center' className={classes.grow} item>
            <Grid item> 
                <RoomIcon 
                    style={{color: red[400]}}
                />
            </Grid>
            <Grid>
                <Typography gutterBottom={false} variant='body2'>
                {company.address}
                </Typography>
            </Grid>
        </Grid>
    </React.Fragment>        
    )
}

export default CompanyDetailRead