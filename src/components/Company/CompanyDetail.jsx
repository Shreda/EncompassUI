import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {getCompany} from '../../actions/index'
import { commonStyles } from '../../styles/index'
import Dock from '../Dock'
import CompanyDetailDock from './CompanyDetailDock'

import RoomIcon from '@material-ui/icons/Room';
import red from '@material-ui/core/colors/red'

import CompanyDetailBreadcrumb from './CompanyDetailBreadcrumb'
import CompanyProjectsTable from './CompanyProjectsTable'

const mapStateToProps = (state, props) => {
    const company = state.companies.filter(f => {
        if(f.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })
    return {
        companies: state.companies,
        loadingCompanies: state.loadingCompanies,
        loadCompaniesSuccess: state.loadCompaniesSuccess,
        loadCompany: state.loadCompany,
        company: company[0]
    }
}

const ConnectedCompanyDetail = (props) => {
    const {
        companies,
        loadingCompanies,
        loadCompaniesSuccess,
        loadCompany,
        getCompany,
        company
    } = props

    const classes = commonStyles()

    React.useEffect(() => {
        async function fetchCompany() {
            props.getCompany(props.match.params.id)
        }

        if (!company && !loadCompany) {
            fetchCompany()
        }
    })    

    return (
    loadingCompanies ? <p>Loading...</p>:(
        (!loadCompaniesSuccess ? <p>Error loading company</p>: (
            loadCompany ? <p>Loading company...</p>: (
                !company ? null: (
                    <div className={classes.root}>
                        <Grid 
                            container 
                            direction='row'
                            justify='flex-start'
                            alignItems='flex-start'
                            spacing={3}
                        >
                            <CompanyDetailBreadcrumb company={company} />
                            <CompanyDetailDock company={company} />
                            <Grid item container xs={12} sm={6} lg={6}>
                                <Paper className={classes.paper}>
                                <Grid 
                                    item 
                                    direction='column' 
                                    spacing={2} 
                                    justify='flex-start' 
                                    alignItems='flex-start' 
                                    container
                                >
                                    <Grid item>
                                        <Typography variant='subtitle1'>
                                            Projects
                                        </Typography>
                                    </Grid>
                                    {company.projects ? (
                                    <CompanyProjectsTable projects={company.projects} />
                                    ) : (null)}
                                </Grid>
                                </Paper>
                            </Grid>                                    
                        </Grid>                                    
                    </div>                        
                        )
                    )
                )
                )
            )
    )
}

const CompanyDetail = connect(
    mapStateToProps,
    {
        getCompany
    }
)(ConnectedCompanyDetail);

export default CompanyDetail;
