import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { logout } from '../actions/index'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
  }));
  
  const ConnectedButtonAppBar = (props) => {
    const {
        isAuthenticated,
        logout
    } = props
    const classes = useStyles();

    const handleLogout = event => {
        event.preventDefault()
        logout()
        props.history.push('/')
    }
  
    return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Encompass
                </Typography>
                {isAuthenticated ? (
                    <Button onClick={handleLogout} color="inherit">Logout</Button>
                    
                    ) : (
                    <Button color="inherit">Login</Button>
                )}
            </Toolbar>
        </AppBar>
    </div>
    );
}

const ButtonAppBar = withRouter(connect(
    null,
    {
        logout
    }
)(ConnectedButtonAppBar))

export default ButtonAppBar