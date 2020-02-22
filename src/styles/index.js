import { makeStyles } from '@material-ui/core/styles';

export const commonStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    grow: {
        width: '100%'
    },
    paper: {
        padding: theme.spacing(2),
        width: '100%'
    },
}));