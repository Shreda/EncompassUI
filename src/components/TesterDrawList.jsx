import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BusinessIcon from '@material-ui/icons/Business';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import { toggleDraw } from '../actions/ui'

const mapStateToProps = (state, props) => {
    return {}
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

const ConnectedTesterDrawList = (props) => {
    const classes = useStyles()
    const { toggleDraw } = props
    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        toggleDraw();
    }

    return (
        <div
            role='presentation'
            onClick={toggleDrawer()}
        >
            <List className={classes.list}>
                <ListItem component={RouterLink} to='/company' button>
                    <ListItemIcon>
                        <BusinessIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Companies'}/>
                </ListItem>
                <ListItem component={RouterLink} to='/template/findings' button>
                    <ListItemIcon>
                        <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Template Findings'}/>
                </ListItem>
                <ListItem component={RouterLink} to='/project' button>
                    <ListItemIcon>
                        <LibraryBooksIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Projects'}/>
                </ListItem>
            </List>
        </div>
    )
}

const TesterDrawList = connect(
    mapStateToProps,
    {
        toggleDraw
    }
)(ConnectedTesterDrawList)

export default TesterDrawList