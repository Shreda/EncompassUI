import React from 'react';
import {debounce} from 'lodash';
import { connect } from 'react-redux';

import {
    uploadImage,
    editFinding,
    saveFinding
} from '../../actions/index'

import Editor from 'rich-markdown-editor';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Typography, Input } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton'

import FindingBreadcrumb from './FindingBreadcrumb'
import { commonStyles } from '../../styles/index';
import Dock from '../Dock'
import RiskRatingForm from './RiskRatingForm'

const mapStateToProps = state => {
    return {
        findings: state.findings,
        loadingFindings: state.loadingFindings,
        loadFindingsSuccess: state.loadFindingsSuccess,
        savingFinding: state.savingFinding,
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

const handleSaveButton = (finding, callback) => event => {
    event.preventDefault()
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
        saveFinding,
        savingFinding
    } = props
    
    const classes = commonStyles()
    
    const finding = getFindingByURLId(props)

    const [readOnly, setReadOnly] = React.useState(true);

    const handleEditButton = event => {
        event.preventDefault()
        setReadOnly(!readOnly)
    }
    
    return (
            loadingFindings ? <p>Loading...</p>:(
                (!loadFindingsSuccess ? <p>Error loading findings</p>:
                    <div className={classes.root}>
                        <Grid 
                            container 
                            direction='row'
                            justify='flex-start'
                            alignItems='flex-start'
                            spacing={3}
                        >
                            <FindingBreadcrumb finding={finding}/>
                            <Dock>
                                <RiskRatingForm finding={finding} />
                            </Dock>

                            <Grid item container xs={12} sm={6} lg={6}>
                                <Paper className={classes.paper}>
                                    <Grid item spacing={2} justify='flex-start' alignItems='center' container>
                                        <Grid item>
                                            <IconButton
                                                onClick={handleEditButton}
                                                aria-label="toggle edit"
                                                title="toggle edit"
                                            >
                                                <EditIcon 
                                                    
                                                    color={readOnly ? 'default' : 'primary'}/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                onClick={handleSaveButton(finding, saveFinding)}
                                                aria-label="save finding"
                                                title="save finding"
                                            >
                                                <SaveIcon 
                                                    
                                                    color={!savingFinding ? 'default': 'primary'}
                                                />
                                            </IconButton>
                                        </Grid>
                                        {finding.unsavedChanges ?
                                            <Grid item>
                                                <Typography variant='body1'>
                                                    Don't forget to save 🐳
                                                </Typography>
                                            </Grid>
                                        : null}                                                                      
                                    </Grid>                                        
                                    <Grid 
                                        direction='column' 
                                        justify='center' 
                                        alignItems='center' 
                                        spacing={2} 
                                        item 
                                        container
                                    >
                                        <Grid className={classes.grow} zeroMinWidth item>
                                                <Typography noWrap variant='h4'>
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
                                                    readOnly={readOnly}
                                                />
                                        </Grid>
                                        <Grid className={classes.grow} zeroMinWidth item>
                                                <Typography noWrap variant='h4'>
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
                                                    readOnly={readOnly}
                                                />
                                        </Grid>
                                        <Grid className={classes.grow} zeroMinWidth item>
                                                <Typography noWrap variant='h4'>
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
                                                    readOnly={readOnly}
                                                />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Dock>
                                <Grid item>
                                    <Typography variant='subtitle1'>
                                        Affected Assets
                                    </Typography>
                                </Grid>
                            </Dock>                                                    
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
