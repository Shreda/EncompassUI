import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import PhaseList from '../Phase/PhaseList'

import { commonStyles } from '../../styles/index'

const ReportDetailRead = ({report}) => {

    const classes = commonStyles()

    return (
    <React.Fragment>
        <Grid spacing={2} container alignItems='center' className={classes.grow} item>
            {/* <Grid item> 
                <BugReportIcon
                    style={{color: getColor(finding)}}
                    fontSize='large'
                />
            </Grid> */}
            <Grid item>
                <Typography gutterBottom={false} variant='h4' component='h1'>
                {report.name}
                </Typography>
            </Grid>
        </Grid>
        <Grid item className={classes.grow}>
            <Typography variant='subtitle1'>
                Phases
            </Typography>
            <PhaseList phases={report.phases} />
        </Grid>
        {/* <Grid spacing={2} container alignItems='center' className={classes.grow} item>
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
        </Grid>  */}
    </React.Fragment>        
    )
}

export default ReportDetailRead
