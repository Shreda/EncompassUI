import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import BugReportIcon from '@material-ui/icons/BugReport';
import WarningIcon from '@material-ui/icons/Warning';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { getColor, 
    getImpactWord, 
    getLikelihoodWord } from '../../utils';


import { commonStyles } from '../../styles/index'

const ProjectDetailRead = ({finding}) => {

    const classes = commonStyles()

    return (
    <React.Fragment>
        <Grid spacing={2} container alignItems='center' className={classes.grow} item>
            <Grid item> 
                <BugReportIcon
                    style={{color: getColor(finding)}}
                    fontSize='large'
                />
            </Grid>
            <Grid>
                <Typography gutterBottom={false} variant='h4' component='h1'>
                {finding.title}
                </Typography>
            </Grid>
        </Grid>
        <Grid spacing={2} container alignItems='center' className={classes.grow} item>
            <Grid item> 
                <WarningIcon
                    style={{color: getColor(finding)}}
                />
            </Grid>
            <Grid>
                <Typography gutterBottom={false} variant='body2'>
                    {getImpactWord(finding.impact)}
                </Typography>
            </Grid>
        </Grid> 
        <Grid spacing={2} container alignItems='center' className={classes.grow} item>
            <Grid item> 
                <AccessTimeIcon
                    style={{color: getColor(finding)}}
                />
            </Grid>
            <Grid>
                <Typography gutterBottom={false} variant='body2'>
                    {getLikelihoodWord(finding.likelihood)}
                </Typography>
            </Grid>
        </Grid> 
    </React.Fragment>        
    )
}

export default ProjectDetailRead
