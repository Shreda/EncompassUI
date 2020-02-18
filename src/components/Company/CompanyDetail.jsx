import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import {getCompany} from '../../actions/index'
import { commonStyles } from '../../styles/index'
import Dock from '../Dock'
import CompanyDetailDock from './CompanyDetailDock'

import RoomIcon from '@material-ui/icons/Room';
import red from '@material-ui/core/colors/red'

import CompanyDetailBreadcrumb from './CompanyDetailBreadcrumb'

const mapStateToProps = state => {
    return {
        companies: state.companies,
        loadingCompanies: state.loadingCompanies,
        loadCompaniesSuccess: state.loadCompaniesSuccess,
        loadCompany: state.loadCompany
    }
}

const getCompanyByURLId = async (props) => {
    const company = await props.companies.filter(f => {
        if(f.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })
    if (Array.isArray(company) && company.length) {
        return company[0]
    }
    else {
        const company = await props.getCompany(props.match.params.id)
        return company
    }
}

const ConnectedCompanyDetail = (props) => {
    const {
        companies,
        loadingCompanies,
        loadCompaniesSuccess,
        loadCompany,
        getCompany
    } = props

    const classes = commonStyles()
    const [company, setCompany] = React.useState(null);

    const fetchCompany = async () => {
        const company = await getCompanyByURLId(props)
        setCompany(company)
    }

    React.useEffect(() => {
        fetchCompany()
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
