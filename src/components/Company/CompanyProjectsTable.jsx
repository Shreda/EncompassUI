import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
// Material-ui table styles
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Other styles
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

// Components
import ProjectFavouriteButton from '../Favourite/ProjectFavouriteButton'

const CompanyProjectsTable = (props) => {
    
    const {
        projects
    } = props

    return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Date
                    </TableCell>
                    <TableCell>
                        Project
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projects.map(p =>
                    <TableRow key={p.id}>
                        <TableCell>
                            <Typography variant='body1'>
                                {new Date (p.created).getFullYear()}-{((new Date(p.created).getMonth() + 1) < 10 ? '0': '') + (new Date(p.created).getMonth()+1)}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                <Link component={RouterLink} to={`/project/${p.id}`}>
                                    {p.name}
                                </Link>
                                <ProjectFavouriteButton project={p} />
                            </Typography>
                        </TableCell>
                    </TableRow>    
                )}
            </TableBody>
        </Table> 
    </TableContainer>     
    )
}

export default CompanyProjectsTable