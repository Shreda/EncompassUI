import React from 'react'
import { connect } from 'react-redux'
import CompanyListBreadcrumb from './CompanyListBreadcrumb'
import Dock from '../Dock'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { commonStyles } from '../../styles/index';

const mapStateToProps = state => {
    return {
        companies: state.companies,
        loadingCompanies: state.loadingCompanies,
        loadCompaniesSuccess: state.loadCompaniesSuccess
    }
}

const ConnectedCompanyList = (props) => {
    const {
        companies,
        loadingCompanies,
        loadCompaniesSuccess,
    } = props

    const classes = commonStyles()

    return (
        loadingCompanies ? <p>Loading...</p>: (
            (!loadCompaniesSuccess ? <p>Error loading companies</p>:
                <div className={classes.root}>
                    <Grid 
                        container 
                        direction='row'
                        justify='flex-start'
                        alignItems='flex-start'
                        spacing={3}
                    >
                        <CompanyListBreadcrumb />
                        <Dock>

                        </Dock>
                        <Grid item container xs={12} sm={6} lg={6}>
                            <Paper className={classes.paper}>

                            </Paper>
                        </Grid>
                    </Grid>                    
                </div>    
            )
        )
    )
}

const CompanyList = connect(
    mapStateToProps,
    {
    }
)(ConnectedCompanyList)

export default CompanyList