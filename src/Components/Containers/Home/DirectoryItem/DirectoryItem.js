import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import classes from './DirectoryItem.scss';

const directoryItem = (props) => {
    let icon = null
    if (props.type === "file"){
        icon = <FontAwesomeIcon icon={faFile} />
    } else if (props.type === "dir"){
        icon = <FontAwesomeIcon icon={faFolder} />
    } else {
        return null;
    }
    // show file name for files
    if (props.type === "file" && props.endFile){
        return (
            <div className={classes.File}>
                <h2>THIS IS FILE: {props.name}</h2>
            </div>
        )
    // show contents for directory
    } else {
        return (
            <div className={classes.DirectoryItem}>
                {icon}
                <h2>{props.name}</h2>
            </div>
        )
    }
}

export default directoryItem;