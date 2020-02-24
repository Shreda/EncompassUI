import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import { commonStyles } from '../../styles/index'
import Dock from '../Dock'
import FindingDetailRead from './FindingDetailRead'
import FindingDetailForm from './FindingDetailForm'

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton'

const FindingDetailDock = ({finding, saveSuccess}) => {
    const classes = commonStyles()
    const [readOnly, setReadOnly] = React.useState(true);

    const handleEditButton = event => {
        event.preventDefault()
        setReadOnly(!readOnly)
    }

    React.useEffect(() => {
        if(saveSuccess) {
            setReadOnly(true)
        }
    }, [saveSuccess])
    
    return (
    <Dock>
        <Grid className={classes.grow} item>
            <IconButton
                onClick={handleEditButton}
                aria-label="toggle edit"
                title="toggle edit"
            >
                <EditIcon 
                    
                    color={readOnly ? 'inherit' : 'primary'}/>
            </IconButton>                
        </Grid>
        {readOnly ? (
            <FindingDetailRead finding={finding} />
        ) : (
            <FindingDetailForm finding={finding} />
        )}
    </Dock>    
    )
}

export default FindingDetailDock