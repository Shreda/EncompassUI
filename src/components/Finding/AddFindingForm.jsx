import React, {useCallback} from 'react'
import { connect } from 'react-redux';
import throttle from 'lodash/throttle'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {addFinding} from '../../actions/index'
import { searchTemplateFindings } from '../../actions/templateFindings'
import { Typography } from '@material-ui/core';
import AddTemplateToFindingList from './AddTemplateToFindingList'

const mapStateToProps = (state, props) => {
    return {
        templateFindings: state.templateFinding.templateFindings
    }
}

const useStyles = makeStyles(theme => ({
    leftMargin: {
        marginLeft: theme.spacing(2),
    },
  }));

const ConnectedAddFindingForm = (props) => {

    const {
        addFinding,
        templateFindings,
        searchTemplateFindings
    } = props

    const [title, setTitle] = React.useState('')

    const handleSave = async (event, title) => {
        event.preventDefault()
        const finding = {
            title: title,
            phase: props.phaseid,
            impact: 0,
            likelihood: 0,
        }
        await addFinding(finding)
        setTitle('')
    }

    const throttleSearchTemplateFindings = useCallback(throttle((title) => {
        searchTemplateFindings(title)
    }, 750, {leading: true}), [])

    React.useEffect(() => {
        throttleSearchTemplateFindings(title)
    }, [title])

    const classes = useStyles()

    return(
        <Grid container direction='column' spacing={2} item>
            <Grid onSubmit={(e) => handleSave(e, title)} component='form' alignItems='center' item container spacing={2} directon='row'>
                <Grid item>
                    <TextField 
                        autoComplete='off' 
                        className={classes.leftMargin} 
                        fullWidth id="outlined-basic" 
                        label="New Finding Title" 
                        variant="outlined"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        autoFocus
                    />
                </Grid>
                <Grid className={classes.leftMargin} item>
                    <Button 
                        color='primary'
                        variant='contained'
                        onClick={(e) => handleSave(e, title)}
                        type='submit'
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
            <Grid item direction='column' spacing={2} container>
                <Grid item>
                    <Typography variant='subtitle1' component='h2'>Template Findings</Typography>
                </Grid>
                <Grid item>
                    <AddTemplateToFindingList phaseid={props.phaseid} title={title} findings={templateFindings}/>
                </Grid>
            </Grid>

        </Grid>
        
        )
}

const AddFindingForm = connect(
    mapStateToProps,
    {
        addFinding,
        searchTemplateFindings
    }
)(ConnectedAddFindingForm)

export default AddFindingForm
