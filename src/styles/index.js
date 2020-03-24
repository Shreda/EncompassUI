import { makeStyles } from '@material-ui/core/styles';

export const commonStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20,
        paddingTop: '80px'
    },
    grow: {
        width: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        width: '100%'
    },
    rootest: {
        flexGrow: 1
    }
}));