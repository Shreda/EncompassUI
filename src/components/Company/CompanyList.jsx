import React, {useCallback} from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import sortBy from 'lodash/sortBy'
import CompanyListBreadcrumb from './CompanyListBreadcrumb'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search';

import { commonStyles } from '../../styles/index';
import MainStage from '../MainStage'
import {
    getNextCompanies,
    searchCompanies
} from '../../actions/companies'

const mapStateToProps = state => {
    return {
        companies: state.company.companies,
        loadingCompanies: state.company.loadingCompanies,
        loadCompaniesSuccess: state.company.loadCompaniesSuccess,
        nextCompanies: state.company.nextCompanies
    }
}

const ConnectedCompanyList = (props) => {
    const {
        companies,
        loadingCompanies,
        loadCompaniesSuccess,
        nextCompanies,
        getNextCompanies,
        searchCompanies
    } = props



      const debounceFilterValue = (array, string) => {
        return array.filter(o => {
            if(o.name.toLowerCase().includes(string.toLowerCase())) {
                return true
            } else {
                return false
            }
        })
    }

    const [searchTerm, setSearchTerm] = React.useState('');
    const handleChange = (value, callback) => {
        callback(value)
    }

    const throttleSearchCompanies = useCallback(throttle((searchTerm) => {
        searchCompanies(searchTerm)
    }, 750, {leading: true}), [])
    
    React.useEffect(() => {
        throttleSearchCompanies(searchTerm)
    },[searchTerm])
    
    React.useEffect(() => {
        window.onscroll = debounce(() => {
            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (loadingCompanies || !nextCompanies) return;
      
            // Checks that the page has scrolled to the bottom
            if (
              window.innerHeight + document.documentElement.scrollTop
              === document.documentElement.offsetHeight
            ) {
              getNextCompanies(nextCompanies);
            }
          }, 100);
        
        return () => {
            window.onscroll = () =>{}
        }
    })
        

    const classes = commonStyles()

    const filtered_companies = debounceFilterValue(companies, searchTerm)
    const sorted = sortBy(filtered_companies, 'name')

    return (
            !companies ? null:
                <div className={classes.root}>
                    <Grid 
                        container 
                        direction='row'
                        justify='center'
                        alignItems='flex-start'
                        spacing={3}
                    >
                        <CompanyListBreadcrumb />
                        <MainStage>
                            <Grid item direction='column' spacing={2} justify='flex-start' alignItems='flex-start' container>
                                <Grid item>
                                    <Typography gutterBottom={false} variant='h4' component='h1'>
                                        Companies
                                    </Typography>                                                    
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <InputLabel
                                            htmlFor="search-field"
                                        >
                                            Search
                                        </InputLabel>
                                        <Input
                                            id="search-field"
                                            startAdornment={
                                                <InputAdornment position='start'>
                                                    <SearchIcon />
                                                </InputAdornment>
                                            }
                                            value={searchTerm}
                                            onChange={(event) => handleChange(
                                                event.target.value,
                                                setSearchTerm
                                                )}
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                </Grid>                                                 
                                <Grid className={classes.grow} item>
                                    <List>
                                        {sorted.map(c => 
                                            <ListItem
                                                button
                                                key={c.id}
                                                to={`/company/${c.id}`}
                                                component={RouterLink}
                                            >
                                                <ListItemText primary={c.name} />
                                            </ListItem>  
                                        )}
                                    </List>
                                </Grid>
                            </Grid>                            
                        </MainStage>
                    </Grid>                    
                </div>    
            
        )
}

const CompanyList = connect(
    mapStateToProps,
    {
        getNextCompanies,
        searchCompanies
    }
)(ConnectedCompanyList)

export default CompanyList