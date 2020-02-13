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
import { Typography } from '@material-ui/core';
import TextAreaAutosize from '@material-ui/core/TextareaAutosize'
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import WrapBreadcrumb from './WrapBreadcrumb'

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
    }
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
                            direction='column'
                            justify='center'
                            alignItems='center'
                            spacing={5}
                        >
                            <WrapBreadcrumb>
                                <Breadcrumbs>
                                    <Link component={RouterLink} to='/'>
                                        Home
                                    </Link>                    
                                    <Typography>
                                        Project
                                    </Typography>                    
                                    <Link 
                                        component={RouterLink} 
                                        to={`/project/${finding.phase.project.id}`}
                                    >
                                        {finding.phase.project.name}
                                    </Link>                    
                                    <Typography>
                                        Phase
                                    </Typography>                    
                                    <Link 
                                        component={RouterLink} 
                                        to={`/phase/${finding.phase.id}`}
                                    >
                                        {finding.phase.name}
                                    </Link>                    
                                    <Typography>
                                        Finding
                                    </Typography>                    
                                    <Link 
                                        component={RouterLink} 
                                        to={`/finding/${finding.id}`}
                                    >
                                        {finding.title}
                                    </Link>                    
                                </Breadcrumbs>
                            </WrapBreadcrumb>
                            <Grid item container xs={12} sm={8} lg={6}>
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
                                                <Typography noWrap variant='h2'>
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
                                                <Typography noWrap variant='h2'>
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
                                                <Typography noWrap variant='h2'>
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
