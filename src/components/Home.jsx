import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import {debounce} from 'lodash';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BusinessIcon from '@material-ui/icons/Business';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';
import Chip from '@material-ui/core/Chip'

import { commonStyles } from '../styles/index';

import WrapBreadcrumb from './WrapBreadcrumb'
import Dock from './Dock'
import ProjectFavouriteButton from './Favourite/ProjectFavouriteButton'
import CentreCircularProgress from './CentreCircularProgress'

import {
    updateFavourites
} from '../actions/index'

const mapStateToProps = state => {
    return {
        loadingProjects: state.project.loadingProjects,
        loadProjectsSuccess: state.project.loadProjectsSuccess,
        projects: state.project.projects,
        user: state.user.user,
        loadingUser: state.user.loadingUser,
        loadUserSuccess: state.user.loadUserSuccess
    }
}

const ConnectedApp = (props) => {
    const {
        loadingProjects,
        loadProjectsSuccess,
        projects,
        user,
        updateFavourites,
        loadingUser,
        loadUserSuccess
    } = props

    const classes = commonStyles()
    
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleChange = (value, callback) => {
        callback(value)
    }

    const debounceFilterValue = debounce((array, string) => {
        return array.filter(o => {
            if(o.name.toLowerCase().includes(string.toLowerCase()) || o.reference.toLowerCase().includes(string.toLowerCase())) {
                return true
            } else {
                return false
            }
        })
    }, 500, {leading:true})

    const filtered_projects = debounceFilterValue(projects, searchTerm)

    return (
            loadingProjects ? <CentreCircularProgress />:(
                (!loadProjectsSuccess ? <p>Error loading project</p>: (
                    loadingUser ? <CentreCircularProgress />: (
                        <div className={classes.root}>
                                <Grid 
                                    container 
                                    direction='row'
                                    justify='flex-start'
                                    alignItems='flex-start'
                                    spacing={3}
                                >
                                    <WrapBreadcrumb>
                                        <Breadcrumbs>
                                            <Chip 
                                                component={RouterLink} 
                                                to='/'
                                                label='Home'
                                                clickable
                                            />
                                        </Breadcrumbs>
                                    </WrapBreadcrumb>
                                    <Dock>
                                        <Grid item container direction='column' justify='flex-start' alignItems='flex-start'>
                                            <Grid item>
                                                <Typography variant='h5' component='h2'>
                                                    Favourites
                                                </Typography>
                                            </Grid>
                                            <Grid className={classes.grow} item>
                                                <List component="nav" aria-label="favourites">
                                                    {loadingUser ? <p>Loading user...</p>: (
                                                        user.favourite_projects.map(fp => 
                                                        <ListItem key={fp.id} to={`/project/${fp.id}`} component={RouterLink} button>
                                                            <ListItemText primary={fp.name} />
                                                            <ListItemSecondaryAction>
                                                                <ProjectFavouriteButton project={fp} />
                                                            </ListItemSecondaryAction>                                                
                                                        </ListItem>                                                                        
                                                        )
                                                    )}
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </Dock>  
                                    <Grid item container xs={12} sm={6} lg={6}>
                                        <Paper className={classes.paper}>
                                            <Grid item direction='column' spacing={2} justify='flex-start' alignItems='flex-start' container>
                                                <Grid item>
                                                    <Typography variant='h5' component='h2'>
                                                        Latest Projects
                                                    </Typography>                                                    
                                                </Grid>
                                                <Grid item>
                                                    <FormControl>
                                                        <InputLabel
                                                            htmlFor="search-field"
                                                        >
                                                            Search Latest
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
                                            </Grid>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                Project
                                                            </TableCell>
                                                            <TableCell>
                                                                Company
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {filtered_projects.slice(0,30).map(p =>
                                                            <TableRow key={p.id}>
                                                                <TableCell>
                                                                    <Typography variant='body1'>
                                                                        <Link component={RouterLink} to={`/project/${p.id}`}>
                                                                            {p.name}
                                                                        </Link>
                                                                        <ProjectFavouriteButton project={p} />
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Link component={RouterLink} to={`/company/${p.company.id}`}>
                                                                        <Typography variant='body1'>
                                                                            {p.company.name}
                                                                        </Typography>
                                                                    </Link>
                                                                </TableCell>
                                                            </TableRow>    
                                                        )}
                                                    </TableBody>
                                                </Table> 
                                            </TableContainer>                         
                                        </Paper>
                                    </Grid>                          
                                </Grid>                 
                        </div>
                    )
                )
                )
            )
    )
}

const App = connect(
    mapStateToProps,
    {
        updateFavourites
    }
)(ConnectedApp);

export default App;
