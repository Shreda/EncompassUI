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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
}));

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

    const classes = useStyles()

    return (
        <div>
            {loadingProjects ? <p>Loading...</p>:(
                (!loadProjectsSuccess ? <p>Error loading project</p>:
                <div className={classes.root}>
                    <Breadcrumbs>
                        <Link component={RouterLink} to='/'>
                            Home
                        </Link>                    
                    </Breadcrumbs>
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
                </div>
                )
            )}
        </div>
    )
}

const App = connect(
    mapStateToProps,
    {
    }
)(ConnectedApp);

export default App;
