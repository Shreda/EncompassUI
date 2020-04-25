import React from 'react'
import { connect } from 'react-redux'
import clsx from 'clsx'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import {
    toggleDraw
} from '../actions/ui'
import TesterDrawList from './TesterDrawList'

const mapStateToProps = (state, props) => {
    return {
        drawOpen: state.ui.drawOpen
    }
}

const ConnectedTemporaryDrawer = (props) => {
    const { drawOpen, toggleDraw } = props
    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        toggleDraw();
    }

    return (
        <div>
            <SwipeableDrawer anchor={'left'} open={drawOpen} onClose={toggleDrawer()}>
                <TesterDrawList />
            </SwipeableDrawer>
        </div>        
    )

}

// function ATemporaryDrawer() {
//     const [state, setState] = React.useState({
//         top: false,
//         left: false,
//         bottom: false,
//         right: false,
//     })

//     const toggleDrawer = (anchor, open) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return
//         }
//         setState({ ...state, [anchor]: open })
//     }

//     const list = (anchor) => (
//         <div
//             className={clsx(classes.list, {
//                 [classes.fullList]: anchor === 'top' || anchor === 'bottom',
//             })}
//             role="presentation"
//             onClick={toggleDrawer(anchor, false)}
//             onKeyDown={toggleDrawer(anchor, false)}
//         >
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     )

//     return (
//         <div>
//             <Drawer anchor={left} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
//                 {list(anchor)}
//             </Drawer>
//         </div>
//     )
// }

const TemporaryDraw = connect(
    mapStateToProps,
    {
        toggleDraw
    }
)(ConnectedTemporaryDrawer)

export default TemporaryDraw