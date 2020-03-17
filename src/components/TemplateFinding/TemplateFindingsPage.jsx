import React, {useCallback} from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField'

import { commonStyles } from '../../styles/index';
import Dock from '../Dock'
import MainStage from '../MainStage'
import TemplateFindingsPageBreadcrumb from './TemplateFindingsPageBreadcrumb'
import TemplateFindingTable from './TemplateFindingTable'
import {searchTemplateFindings} from '../../actions/templateFindings'

const mapStateToProps = (state, props) => {
    return {
        templateFindings: state.templateFindings,
    }
}

const ConnectedTemplateFindingsPage = (props) => {

    const filterTemplateFindings = (array, string) => {
        return array.filter(f => {
            if(f.title.toLowerCase().includes(string.toLowerCase())) {
                return true
            } else {
                return false
            }
        })
    }

    const classes = commonStyles()
    const {
        searchTemplateFindings,
        templateFindings,
    } = props

    const [title, setTitle] = React.useState('')

    const throttleSearchTemplateFindings = useCallback(throttle((title) => {
        searchTemplateFindings(title)
    }, 750, {leading: true}), [])

    React.useEffect(() => {
        throttleSearchTemplateFindings(title)
    }, [title])

    const filtered_findings = filterTemplateFindings(templateFindings, title)

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
                    <Grid item container spacing={2} className={classes.grow} alignItems='center'>
                        <Grid item>
                            <FilterListIcon fontSize='small' />
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle1' component='p'>
                                Refine
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField 
                            label='Title'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </Grid>
                </Dock>
                <MainStage>
                    <Grid item direction='column' spacing={2} justify='flex-start' alignItems='flex-start' container>
                        <Grid item>
                            <Typography variant='h5' component='h1'>Template Findings</Typography>
                        </Grid>
                        <Grid className={classes.grow} item>
                            <TemplateFindingTable templateFindings={filtered_findings}/>
                        </Grid>
                    </Grid>
                </MainStage>
            </Grid>
        </div>
    )
}

const TemplateFindingsPage = connect(
    mapStateToProps,
    {
        searchTemplateFindings
    }
)(ConnectedTemplateFindingsPage)

export default TemplateFindingsPage
