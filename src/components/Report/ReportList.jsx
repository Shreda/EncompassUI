import React from 'react'

import { Link as RouterLink } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MenuBookIcon from '@material-ui/icons/MenuBook';


const ReportList = (props) => {
    // Takes an array of reports and displays them
    // in a list

    const {
        reports
    } = props

    return (
    <List component="nav" aria-label="reports">
        {reports.map(r =>
            <ListItem button key={r.id} to={`/report/${r.id}`} component={RouterLink}>
                <ListItemIcon>
                    <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary={r.name} />
            </ListItem>
        )}
    </List>        
    )    
}

export default ReportList