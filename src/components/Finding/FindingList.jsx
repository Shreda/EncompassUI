import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { sortBy } from 'lodash'

// Material-ui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListItemIcon } from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';


const FindingList = (props) => {
    // Takes an array of findings and displays
    // them in a list
    const {
        findings
    } = props
    const getColor = (finding) => {
        if(finding.rating >=1 && finding.rating <=2) {
            return red[400]
        } else if(finding.rating >=3 && finding.rating <=6 && finding.rating != 5 ) {
            return orange[400]
        } else if (finding.rating >= 5 && finding.rating <=12 && finding.rating != 6) {
            return yellow[400]
        } else if(finding.rating >= 15 && finding.rating <=25) {
            return green[400]
        } else if (finding.rating === 0) {
            return blue[400]
        }
    }
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