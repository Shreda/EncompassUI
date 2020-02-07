import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { doLogin } from '../actions/index';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '15vh',
        padding: '8px',
    },
    welcome: {
        marginBottom: '20px'
    },
    bigAvatar: {
        // marginTop: '50px',
        height: '50px',
        width: '50px',
        fontSize: '30px'
    },
    expand: {
        flexGrow: 1
    }
}));

const ConnectedLogin = (props) => {
    const classes = useStyles();

    const handleChange = (event, callback) => {
        callback(event.target.value)
    }

    const handleLogin = async (event, username,password) => {
        event.preventDefault();
        const creds = {
            username,
            password
        }
        await props.doLogin(creds)
        props.history.replace('/')
        window.location.reload();
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <Grid
            container
            justify='center'
            direction='row'
            className={classes.root}
            spacing={0}
        >
            <Grid component='form' onSubmit={(e) => handleLogin(e, username, password)} 
                spacing={2} item alignItems='center' direction='column'container >
                <Grid item>
                    <Avatar className={classes.bigAvatar}>
                        <Person fontSize='inherit' />
                    </Avatar>
                </Grid>
                <Grid item>
                    <TextField 
                        autoFocus
                        variant='outlined'
                        label='Username'
                        value={username}
                        onChange={(e) => handleChange(e, setUsername)}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        label='Password'
                        variant='outlined'
                        type='password'
                        value={password}
                        onChange={(e) => handleChange(e, setPassword)}
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button
                        type='submit'
                        color='primary'
                        size='large'
                        variant='contained'
                        onClick={(e) => handleLogin(e, username, password)}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );

};

const Login = connect(
    null,
    {
        doLogin
    }
)(ConnectedLogin);

export default Login;

