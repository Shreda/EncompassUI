import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ProjectPhaseList = (props) => {
    // Takes an array of Phases and displays them
    // in a list

    const {
        phases,
        showDelete
    } = props

    return (
    <List component="nav" aria-label="phases">
        {phases.map(p =>
            <React.Fragment key={p.id}>
                <ListItem button to={`/phase/${p.id}`} component={RouterLink}>
                    <ListItemText primary={p.name} />
                </ListItem>
                <Divider light={true} component='li' variant='middle' />
            </React.Fragment>
        )}
    </List>        
    )
}

export default ProjectPhaseList