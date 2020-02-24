import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { sortBy } from 'lodash'
import { getColor } from '../../utils'

// Material-ui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListItemIcon } from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';

const FindingList = (props) => {
    // Takes an array of findings and displays
    // them in a list
    const {
        findings
    } = props

    const sorted_findings = sortBy(findings, 'rating')
    
    return (
    <List component="nav" aria-label="findings">
        {sorted_findings.map(f =>
            <ListItem button key={f.id} to={`/finding/${f.id}`} component={RouterLink}>
                <ListItemIcon>
                    <BugReportIcon style={{color: getColor(f)}}/>
                </ListItemIcon>
                <ListItemText primary={f.title} />
            </ListItem>
        )}
    </List>
    )
}

export default FindingList