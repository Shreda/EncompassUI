import React from 'react';
import {debounce} from 'lodash';
import { connect } from 'react-redux';

import {
    uploadImage,
} from '../../actions/index'
import {
    editFinding, 
    getFinding, 
    saveFinding,
    toggleSaveFindingSuccess
} from '../../actions/findings'
import Editor from 'rich-markdown-editor';

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Typography, Input } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress';

import FindingBreadcrumb from './FindingBreadcrumb'
import { commonStyles } from '../../styles/index';
import Dock from '../Dock'
import FindingDetailForm from './FindingDetailForm'
import SaveSuccessSnack from '../SaveSuccessSnack'
import FindingDetailDock from './FindingDetailDock';
import CentreCircularProgress from '../CentreCircularProgress'

const mapStateToProps = (state, props) => {
    const finding = state.finding.findings.filter(f => {
        if(f.id === props.match.params.id) {
            return true;
        } else {
            return false;
        }
    })
    return {
        findings: state.finding.findings,
        loadingFindings: state.finding.loadingFindings,
        loadFindingsSuccess: state.finding.loadFindingsSuccess,
        savingFinding: state.finding.savingFinding,
        loadFinding: state.finding.loadFinding,
        saveFindingSuccess: state.finding.saveFindingSuccess,
        finding: finding[0]
    }
}


const handleSave = (opt, finding, callback) => {
    callback(finding)
}

const handleSaveButton = (finding, callback) => event => {
    event.preventDefault()
    callback(finding)
}

const handleChange = (value, finding, callback, param) => {
    const r = {
        ...finding,
        [param]: value()
    }
    callback(r)
}

const ConnectedFindingDetail = (props) => {
    const {
        findings,
        loadFindingsSuccess,
        loadingFindings,
        uploadImage,
        generateReport,
        editFinding,
        saveFinding,
        savingFinding,
        loadFinding,
        toggleSaveFindingSuccess,
        saveFindingSuccess,
        finding
    } = props
    
    const classes = commonStyles()
    
    React.useEffect(() => {
        async function fetchFinding() {
            props.getFinding(props.match.params.id)
        }

        if (!finding && !loadFinding) {
            fetchFinding()
        }
    })

    const [readOnly, setReadOnly] = React.useState(true);

    const handleEditButton = event => {
        event.preventDefault()
        setReadOnly(!readOnly)
    }
    
    return (
            loadingFindings ? <CentreCircularProgress />:(
                (!loadFindingsSuccess ? <p>Error loading findings</p>: (
                    loadFinding ? <CentreCircularProgress /> : (
                        !finding ? null: (
                            <div className={classes.root}>
                                <SaveSuccessSnack saveSuccess={saveFindingSuccess} callback={toggleSaveFindingSuccess} />
                                <Grid 
                                    container 
                                    direction='row'
                                    justify='flex-start'
                                    alignItems='flex-start'
                                    spacing={3}
                                >
                                    <FindingBreadcrumb finding={finding}/>
                                    <FindingDetailDock saveSuccess={saveFindingSuccess} finding={finding} />

                                    <Grid item container xs={12} sm={6} lg={6}>
                                        <Paper className={classes.paper}>
                                            <Grid item spacing={2} justify='flex-start' alignItems='center' container>
                                                {/* <Grid item>
                                                    <IconButton
                                                        onClick={handleEditButton}
                                                        aria-label="toggle edit"
                                                        title="toggle edit"
                                                    >
                                                        <EditIcon 
                                                            
                                                            color={readOnly ? 'default' : 'primary'}/>
                                                    </IconButton>
                                                </Grid> */}
                                                <Grid item>
                                                    <IconButton
                                                        onClick={handleSaveButton(finding, saveFinding)}
                                                        aria-label="save finding"
                                                        title="save finding"
                                                    >
                                                        <SaveIcon 
                                                            
                                                            color={!savingFinding ? 'secondary': 'primary'}
                                                        />
                                                    </IconButton>
                                                </Grid>                                                                     
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
                                                        <Typography noWrap variant='h5' component='h2'>
                                                            Background
                                                        </Typography>
                                                        <Editor 
                                                            defaultValue={finding.background}
                                                            className={classes.shadow}
                                                            onSave={(opt) => handleSave(opt, finding, saveFinding)}
                                                            onChange={(value) => handleChange(value, finding, editFinding, 'background')}
                                                            uploadImage={async file => {
                                                                const result = await uploadImage(file)
                                                                return result
                                                            }}
                                                            // readOnly={readOnly}
                                                        />
                                                </Grid>
                                                <Grid className={classes.grow} zeroMinWidth item>
                                                        <Typography noWrap variant='h5' component='h2'>
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
                                                            // readOnly={readOnly}
                                                        />
                                                </Grid>
                                                <Grid className={classes.grow} zeroMinWidth item>
                                                        <Typography noWrap variant='h5' component='h2'>
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
                                                            // readOnly={readOnly}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Dock>
                                        <Grid item>
                                            <Typography variant='h5' component='h2'>
                                                Affected Assets
                                            </Typography>
                                        </Grid>
                                    </Dock>                                                    
                                </Grid>
                            </div>
                        )
                    )
                )
                )
            )
    )
}

const FindingDetail = connect(
    mapStateToProps,
    {
        uploadImage,
        editFinding,
        saveFinding,
        getFinding,
        toggleSaveFindingSuccess
    }
)(ConnectedFindingDetail);

export default FindingDetail;
