import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
}));

const mapStateToProps = state => {
    return {
        companies: state.companies,
        loadingCompanies: state.loadingCompanies,
        loadCompaniesSuccess: state.loadCompaniesSuccess
    }
}

const getCompanyByURLId = (props) => {
    const company = props.companies.filter(c => {
        if(c.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })

    return company[0]
}

const ConnectedCompanyDetail = (props) => {
    const {
        companies,
        loadingCompanies,
        loadCompaniesSuccess
    } = props
    console.log(companies)

    const classes = useStyles()

    const company = getCompanyByURLId(props)

    return (
        <div>          
            {loadingCompanies ? <p>Loading...</p>:(
                (!loadCompaniesSuccess ? <p>Error loading company</p>:
                    <div>
                        <Breadcrumbs>
                            <Link component={RouterLink} to='/'>
                                Home
                            </Link>                    
                            <Typography>
                                Company
                            </Typography>                    
                            <Link 
                                component={RouterLink} 
                                to={`/company/${company.id}`}
                            >
                                {company.short_name}
                            </Link>                    
                        </Breadcrumbs>                                                 
                    </div>                        
                )
            )}
        </div>
    )
}

const CompanyDetail = connect(
    mapStateToProps,
    {
    }
)(ConnectedCompanyDetail);

export default CompanyDetail;
