import React from 'react';
import {debounce} from 'lodash';
import { connect } from 'react-redux';
import {config} from '../constants/configuration';
import { Link as RouterLink } from 'react-router-dom';

import {
    uploadImage,
    editFinding,
    saveFinding
} from '../actions/index'

import Editor from 'rich-markdown-editor';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Typography, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'

import FindingBreadcrumb from './FindingBreadcrumb'
const useStyles = makeStyles(theme => ({
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

const mapStateToProps = state => {
    return {
        findings: state.findings,
        loadingFindings: state.loadingFindings,
        loadFindingsSuccess: state.loadFindingsSuccess
    }
}

const getFindingByURLId = (props) => {
    const finding = props.findings.filter(f => {
        if(f.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })
    return finding[0]
}

const handleSave = (opt, finding, callback) => {
    callback(finding)
}
const handleChange = debounce((value, finding, callback, param) => {
    const r = {
        ...finding,
        [param]: value()
    }
    callback(r)
}, 500)

const handleSelect = (name, finding, callback) => event => {
    const f = {
        ...finding,
        [name]: event.target.value
    }
    callback(f)
};



const ConnectedFindingDetail = (props) => {
    const {
        findings,
        loadFindingsSuccess,
        loadingFindings,
        uploadImage,
        generateReport,
        editFinding,
        saveFinding
    } = props
    
    const classes = useStyles()
    
    const finding = getFindingByURLId(props)
    
    return (
            loadingFindings ? <p>Loading...</p>:(
                (!loadFindingsSuccess ? <p>Error loading findings</p>:
                    <div className={classes.root}>
                        <Grid 
                            container 
                            direction='row'
                            justify='flex-start'
                            alignItems='flex-start'
                            spacing={5}
                        >
                            <FindingBreadcrumb finding={finding}/>
                            <Grid item container xs={12} sm={3} lg={3}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid className={classes.grow} item>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <InputLabel htmlFor='impact-select'>
                                                    Impact
                                                </InputLabel>
                                                <Select
                                                    native
                                                    value={finding.impact}
                                                    onChange={handleSelect('impact', finding, editFinding)}
                                                    inputProps={{
                                                        name: 'impact',
                                                        id: 'impact-select'
                                                    }}
                                                >
                                                    <option value={1}>Extreme</option>
                                                    <option value={2}>Major</option>
                                                    <option value={3}>Moderate</option>
                                                    <option value={4}>Low</option>
                                                    <option value={5}>Negligible</option>
                                                </Select>
                                            </FormControl>                  
                                        </Grid>
                                        <Grid className={classes.grow} item>
                                            <FormControl fullWidth className={classes.formControl}>
                                                <InputLabel htmlFor='likelihood-select'>
                                                    Likelihood
                                                </InputLabel>
                                                <Select
                                                    native
                                                    value={finding.likelihood}
                                                    onChange={handleSelect('likelihood', finding, editFinding)}
                                                    inputProps={{
                                                        name: 'likelihood',
                                                        id: 'likelihood-select'
                                                    }}
                                                >
                                                    <option value={1}>Certain</option>
                                                    <option value={2}>Likely</option>
                                                    <option value={3}>Possible</option>
                                                    <option value={4}>Unlikely</option>
                                                    <option value={5}>Rare</option>
                                                </Select>
                                            </FormControl>                  
                                        </Grid>
                                    </Grid>
                                    {finding.unsavedChanges ? <p>There are unsaved changes</p> : null}
                                </Paper>
                            </Grid>                            
                            <Grid item container xs={12} sm={9} lg={6}>
                                <Paper className={classes.paper}>
                                    <Grid 
                                        direction='column' 
                                        justify='center' 
                                        alignItems='center' 
                                        spacing={5} 
                                        item 
                                        container
                                    >
                                        <Grid className={classes.grow} zeroMinWidth item>
                                                <Typography noWrap variant='h3'>
                                                    Background
                                                </Typography>
                                                <Editor 
                                                    defaultValue={finding.background} 
                                                    onSave={(opt) => handleSave(opt, finding, saveFinding)}
                                                    onChange={(value) => handleChange(value, finding, editFinding, 'background')}
                                                    uploadImage={async file => {
                                                        const result = await uploadImage(file)
                                                        return result
                                                    }}
                                                />
                                        </Grid>
                                        <Grid className={classes.grow} zeroMinWidth item>
                                                <Typography noWrap variant='h3'>
                                                    Story
                                                </Typography>
                                                <Editor 
                                                    defaultValue={finding.story} 
                                                    onSave={(opt) => handleSave(opt, finding, saveFinding)}
                                                    onChange={(value) => handleChange(value, finding, editFinding, 'story')}
                                                    uploadImage={async file => {
                                                        const result = await uploadImage(file)
                                                        return result
                                                    }}
                                                />
                                        </Grid>
                                        <Grid className={classes.grow} zeroMinWidth item>
                                                <Typography noWrap variant='h3'>
                                                    Recommendation
                                                </Typography>
                                                <Editor 
                                                    defaultValue={finding.recommendation} 
                                                    onSave={(opt) => handleSave(opt, finding, saveFinding)}
                                                    onChange={(value) => handleChange(value, finding, editFinding, 'recommendation')}
                                                    uploadImage={async file => {
                                                        const result = await uploadImage(file)
                                                        return result
                                                    }}
                                                />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>                            
                        </Grid>
                    </div>
                )
            )
    )
}

const FindingDetail = connect(
    mapStateToProps,
    {
        uploadImage,
        editFinding,
        saveFinding
    }
)(ConnectedFindingDetail);

export default FindingDetail;
