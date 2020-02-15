import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

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
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import { commonStyles } from '../styles/index';

import WrapBreadcrumb from './WrapBreadcrumb'
import Dock from './Dock'
import { IconButton } from '@material-ui/core';

const mapStateToProps = state => {
    return {
        loadingProjects: state.loadingProjects,
        loadProjectsSuccess: state.loadProjectsSuccess,
        projects: state.projects
    }
}

const ConnectedApp = (props) => {
    const {
        loadingProjects,
        loadProjectsSuccess,
        projects        
    } = props

    const classes = commonStyles()

    return (
            loadingProjects ? <p>Loading...</p>:(
                (!loadProjectsSuccess ? <p>Error loading project</p>:
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
                                    <Link component={RouterLink} to='/'>
                                        Home
                                    </Link>                    
                                </Breadcrumbs>
                            </WrapBreadcrumb>
                            <Dock>
                                <Grid item container direction='column' justify='flex-start' alignItems='flex-start'>
                                    <Grid item>
                                        <Typography variant='subtitle1'>
                                            Useful Links
                                        </Typography>
                                    </Grid>
                                    <Grid className={classes.grow} item>
                                        <List component="nav" aria-label="useful links">
                                            <ListItem to='company' component={RouterLink} button>
                                                <ListItemIcon>
                                                    <BusinessIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Companies" />
                                            </ListItem>
                                            <ListItem component={RouterLink} to='project' button>
                                                <ListItemIcon>
                                                    <LibraryBooksIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Projects" />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Dock>
                            <Grid item container xs={12} sm={6} lg={6}>
                                <Paper className={classes.paper}>
                                    <Grid item spacing={2} justify='flex-start' alignItems='center' container>
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
                                                {projects.map(p =>
                                                    <TableRow key={p.id}>
                                                        <TableCell>
                                                            <Link component={RouterLink} to={`/project/${p.id}`}>
                                                                {p.name}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link component={RouterLink} to={`/company/${p.company.id}`}>
                                                                {p.company.name}
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>    
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>                         
                                </Paper>
                            </Grid>
                            <Dock>
                                <Grid item container direction='column' justify='flex-start' alignItems='flex-start'>
                                    <Grid item>
                                        <Typography variant='subtitle1'>
                                            Favourites
                                        </Typography>
                                    </Grid>
                                    <Grid className={classes.grow} item>
                                        <List component="nav" aria-label="useful links">
                                            <ListItem to='company' component={RouterLink} button>
                                                <ListItemIcon>
                                                    <BusinessIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Companies" />
                                            </ListItem>
                                            <ListItem component={RouterLink} to='project' button>
                                                <ListItemText primary="Projects" />
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                    <LibraryBooksIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Dock>                            
                        </Grid>                 
                </div>
                )
            )
    )
}

const App = connect(
    mapStateToProps,
    {
    }
)(ConnectedApp);

export default App;
