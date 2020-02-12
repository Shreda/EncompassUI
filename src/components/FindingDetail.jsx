import React from 'react';
import {debounce} from 'lodash';
import { connect } from 'react-redux';
import {config} from '../constants/configuration';
import { Link as RouterLink } from 'react-router-dom';

import {
    uploadImage
} from '../actions/index'

import Editor from 'rich-markdown-editor';

import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    grow: {
        width: '100%'
    },
    paper: {
        padding: theme.spacing(2)
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

// const handleSave = (opt, report, callback) => {
//     callback(report)
// }
// const handleChange = debounce((value, report, callback, param) => {
//     const r = {
//         ...report,
//         [param]: value()
//     }
//     callback(r)
// }, 500)


const ConnectedFindingDetail = (props) => {
    const {
        findings,
        loadFindingsSuccess,
        loadingFindings,
        uploadImage,
        generateReport
    } = props
    
    const handleUpload = async (f) => {
        const return_url = await uploadImage(f)
        console.log('returned url: ' + return_url)
        return return_url
    }

    const classes = useStyles()

    const finding = getFindingByURLId(props)
 
    return (
            loadingFindings ? <p>Loading...</p>:(
                (!loadFindingsSuccess ? <p>Error loading findings</p>:
                    <div className={classes.root}>
                        <Breadcrumbs>
                            <Link component={RouterLink} to='/'>
                                Home
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
                        <Grid 
                            container 
                            direction='column'
                            justify='center'
                            alignItems='center'
                            spacing={2}
                        >
                            <Grid className={classes.grow} zeroMinWidth xs={12} s={8} lg={6} item>
                                <Paper className={classes.paper}>
                                    <Typography noWrap variant='h4'>
                                        Background
                                    </Typography>
                                    <Editor 
                                        defaultValue={finding.background} 
                                        // onSave={(opt) => handleSave(opt, report, saveReport)}
                                        // onChange={(value) => handleChange(value, report, editReport, 'executive_summary')}
                                        uploadImage={async file => {
                                            const result = await uploadImage(file)
                                            return result
                                        }}
                                    />
                                </Paper>
                            </Grid>
                            <Grid className={classes.grow} zeroMinWidth item xs={12} s={8} lg={6}>
                                <Paper className={classes.paper}>
                                    <Typography noWrap variant='h4'>
                                        Story
                                    </Typography>
                                    <Editor 
                                        defaultValue={findings.story} 
                                        // onSave={(opt) => handleSave(opt, report, saveReport)}
                                        // onChange={(value) => handleChange(value, report, editReport, 'introduction')}
                                        uploadImage={async file => {
                                            const result = await uploadImage(file)
                                            return result
                                        }}
                                    />
                                </Paper>
                            </Grid>
                            <Grid className={classes.grow} xs={12} s={8} lg={6} zeroMinWidth item>
                                <Paper className={classes.paper}>
                                    <Typography noWrap variant='h4'>
                                        Recommendation
                                    </Typography>
                                    <Editor 
                                        defaultValue={finding.recommendation} 
                                        // onSave={(opt) => handleSave(opt, report, saveReport)}
                                        // onChange={(value) => handleChange(value, report, editReport, 'introduction')}
                                        uploadImage={async file => {
                                            const result = await uploadImage(file)
                                            return result
                                        }}
                                    />
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
    }
)(ConnectedFindingDetail);

export default FindingDetail;
