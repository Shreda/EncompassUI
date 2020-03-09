import React, { useRef } from 'react'
import { connect } from 'react-redux'
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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import { addFinding } from '../../actions/index'
import { getNextTemplateFindings } from '../../actions/templateFindings'

const useStyles = makeStyles(theme => ({
    scrollList: {
        maxHeight: '300px',
        overflowY: 'scroll',
        overflowX: 'hidden'
    }
}));

const mapStateToProps = (state, props) => {
    return {
        nextTemplateFindings: state.nextTemplateFindings
    }
}

const ConnectedAddTemplateToFindingList = (props) => {
    // Takes an array of findings and displays
    // them in a list
    const {
        findings,
        title,
        addFinding,
        phaseid,
        getNextTemplateFindings,
        nextTemplateFindings
    } = props

    const handleSave = async (event, finding) => {
        event.preventDefault()
        const f = {
            ...finding,
            phase: phaseid
        }
        addFinding(f)
    //     const finding = {
    //         title: title,
    //         phase: props.phaseid,
    //         impact: 0,
    //         likelihood: 0,
    //     }
    //     await addFinding(finding)
    //     setTitle('')
    }

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
    const listRef = useRef(<div></div>)

    React.useEffect(() => {
        listRef.current.onscroll = () => {
            if(listRef.current.scrollTop === (listRef.current.scrollHeight - listRef.current.offsetHeight)) {
                getNextTemplateFindings(nextTemplateFindings)
            }            
        }
    }, [listRef])
    
    return (
    <List ref={listRef} className={classes.scrollList} component="nav" aria-label="findings">
        {sorted_findings.map(f =>
        <React.Fragment key={f.id}>
            <ListItem>
                <ListItemIcon>
                    <BugReportIcon style={{color: getColor(f)}}/>
                </ListItemIcon>
                <ListItemText primary={f.title} />
                <ListItemSecondaryAction>
                    <IconButton onClick={(e) => handleSave(e, f)}>
                        <AddIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider light={true} component='li' variant='middle'/>
        </React.Fragment>
        )}
    </List>
    )
}

const AddTemplateToFindingList = connect(
    mapStateToProps,
    {
        addFinding,
        getNextTemplateFindings
    }
)(ConnectedAddTemplateToFindingList)

export default AddTemplateToFindingList