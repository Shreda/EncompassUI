import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'


const ProjectPhaseList = (props) => {
    // Takes an array of Phases and displays them
    // in a list

    const {
        phases
    } = props

    return (
    <List component="nav" aria-label="phases">
        {phases.map(p =>
                <ListItem key={p.id} button to={`/phase/${p.id}`} component={RouterLink}>
                    <ListItemText primary={p.name} />
                </ListItem>
        )}
    </List>        
    )
}

export default ProjectPhaseList