import React from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'

import { commonStyles } from '../../styles/index';
import Dock from '../Dock'
import MainStage from '../MainStage'
import TemplateFindingsPageBreadcrumb from './TemplateFindingsPageBreadcrumb'
import TemplateFindingTable from './TemplateFindingTable'


const ConnectedTemplateFindingsPage = (props) => {
    const classes = commonStyles()
    
    return(
        <div className={classes.root}>
            <Grid
                container
                direction='row'
                jusify='flex-start'
                alignItems='flex-start'
                spacing={3}
            >
                <TemplateFindingsPageBreadcrumb />
                <Dock>

                </Dock>
                <MainStage>
                    <Grid item direction='column' spacing={2} justify='flex-start' alignItems='flex-start' container>
                        <Grid item>
                            <Typography variant='h5' component='h1'>Template Findings</Typography>
                        </Grid>
                        <Grid className={classes.grow} item>
                            <TemplateFindingTable />
                        </Grid>
                    </Grid>
                </MainStage>
            </Grid>
        </div>
    )
}

const TemplateFindingsPage = connect(
    null,
    {

    }
)(ConnectedTemplateFindingsPage)

export default TemplateFindingsPage