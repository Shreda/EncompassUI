import React from 'react'
// import { Link as RouterLink } from 'react-router-dom';
import { sortBy } from 'lodash'
import { getColor } from '../../utils'

// Material-ui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListItemIcon } from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    scrollList: {
        maxHeight: '300px',
        overflowY: 'scroll',
        overflowX: 'hidden'
    }
}));

const AddTemplateToFindingList = (props) => {
    // Takes an array of findings and displays
    // them in a list
    const {
        findings,
        title
    } = props

    const filterTemplateFindings = (array, string) => {
        return array.filter(f => {
            if(f.title.toLowerCase().includes(string.toLowerCase())) {
                return true
            } else {
                return false
            }
        })
    }

    const classes = useStyles()
    const filtered_companies = filterTemplateFindings(findings, title)
    const sorted_findings = sortBy(filtered_companies, 'rating')
    
    return (
    <List className={classes.scrollList} component="nav" aria-label="findings">
        {sorted_findings.map(f =>
        <React.Fragment key={f.id}>
            <ListItem>
                <ListItemIcon>
                    <BugReportIcon style={{color: getColor(f)}}/>
                </ListItemIcon>
                <ListItemText primary={f.title} />
            </ListItem>
            <Divider light={true} component='li' variant='middle'/>
        </React.Fragment>
        )}
    </List>
    )
}

export default AddTemplateToFindingList