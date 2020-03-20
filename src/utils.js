import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListItemIcon } from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

export const arrayIsEmpty = anArray => {
    if (Array.isArray(anArray) && !anArray.length) {
        return true
    } else {
        return false
    }
}

export const inGroup = (user, groupName) => {
    const x = user.groups.filter(g => {
        if (g.name === groupName) {
            return true
        } else {
            return false
        }
    })

    if (arrayIsEmpty(x)) {
        return false
    } else {
        return true
    }
}

export const getColor = (finding) => {
    if(finding.rating >=1 && finding.rating <=2) {
        return red[300]
    } else if(finding.rating >=3 && finding.rating <=6 && finding.rating != 5 ) {
        return orange[300]
    } else if (finding.rating >= 5 && finding.rating <=12 && finding.rating != 6) {
        return amber[300]
    } else if(finding.rating >= 15 && finding.rating <=25) {
        return green[300]
    } else if (finding.rating === 0) {
        return blue[300]
    }
}

export const getImpactWord = impact => {
    switch (impact) {
        case 0:
            return "Informational"
        case 1:
            return "Extreme"
        case 2:
            return "Major"
        case 3:
            return "Moderate"
        case 4:
            return "Low"
        case 5:
            return "Negligible"
        default:
            return "Didn't receice number"
    }
}

export const getLikelihoodWord = likelihood => {
    switch (likelihood) {
        case 0:
            return "Informational"
        case 1:
            return "Certain"
        case 2:
            return "Likely"
        case 3:
            return "Possible"
        case 4:
            return "Unlikely"
        case 5:
            return "Rare"
        default:
            return "Didn't recieve number"
    }
}