import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {withRouter, Link} from 'react-router-dom';
import classes from './Breadcrumbs.scss';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const breadcrumbs = (props) => {
    let links = []
    // build breadcrumbs links from path array
    for (let i = 0 ; i < props.currentAddress.length ; i++){
        let path = "/"
        for (let j = 0 ; j <= i ; j++){
            path += props.currentAddress[j] + "/";
        }
        links = [...links, (
            // do not add arrow if link is the last one
            <Link 
                key={i}    
                to={{
                    pathname: path}}>
                        {props.currentAddress[i]}{ i !== props.currentAddress.length - 1 ? <FontAwesomeIcon icon={faChevronRight} /> : null}
        </Link>
        )];
    }
    // add root link
    links = [
        <Link key="first" to={{pathname: "/"}}>
            root{props.currentAddress.length !== 0 ? <FontAwesomeIcon icon={faChevronRight} /> : null}
        </Link>,
        ...links
        ]
    return(
        <div className={classes.breadcrumbsHolder}>
            {links.map(link => {return link})}
        </div>
    )
}

export default withRouter(breadcrumbs);