import React from 'react'
import { connect } from 'react-redux';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';

import {
    updateFavourites
} from '../../actions/index'

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const ConnectedProjectFavouriteButton = ({
    project,
    updateFavourites,
    user,
    ...rest
}) => {

    const handleFavButton = (user, action, projectid) => event => {
        const favs = []
        if(action === 'delete') {
            user.favourite_projects.map(f =>(
                (f.id !== projectid) ? (
                    favs.push(f.id)
                ):(null)
            ))
        } else if(action === 'add') {
            user.favourite_projects.map(f => (
                favs.push(f.id)
            ))
            favs.push(projectid)
        }
        const payload = {
            favourite_projects: favs
        }
        updateFavourites(payload)
    }

    const inFavs = (project) => {
        const r = user.favourite_projects.filter(f => {
            if(f.id === project.id) {
                return true
            } else {
                return false
            }
        })
        if (Array.isArray(r) && r.length) {
            return true; 

        } else {
            return false;         
        }
    }

    const inFavourites = inFavs(project)

    return (
        inFavourites ? (
            <IconButton
            {...rest}
            aria-label="favourite"
            onClick={handleFavButton(user, 'delete', project.id)}
            >
                <FavoriteIcon />
            </IconButton>

        ):(
            <IconButton
            {...rest}
            aria-label="favourite"
            onClick={handleFavButton(user, 'add', project.id)}
            >
                <FavoriteBorderIcon />
            </IconButton>
        )
    )
}

const ProjectFavouriteButton = connect(
    mapStateToProps,
    {
        updateFavourites
    }
)(ConnectedProjectFavouriteButton)

export default ProjectFavouriteButton