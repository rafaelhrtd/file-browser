import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import DirectoryItem from './DirectoryItem/DirectoryItem';
import classes from "./Home.scss";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import Axios from 'axios';

class Home extends Component {
    state = {
        currentAddress: [],
        currentDirectory: null,
        errors: false
    }

    // get current address and turn it into array for future use
    getCurrentAddress = (justMounted = false) => {
        const pathName = this.props.location.pathname.split("/");
        let pathArray = [];
        for (let i = 0 ; i < pathName.length ; i++){
            if (pathName[i] !== ""){ pathArray = [...pathArray, pathName[i]]};
        }
        // used to trigger directory update after currentAddress is updated
        // set as true during mounting
        let shouldUpdateDirectory = justMounted;
        this.setState(prevState => {
            // check if current address has changed
            shouldUpdateDirectory = justMounted || JSON.stringify(prevState.currentAddress) !== JSON.stringify(pathArray);
            if (JSON.stringify(prevState.currentAddress) !== JSON.stringify(pathArray)){
                return {
                    currentAddress: pathArray
                }
            }
        }, () => {
            if (shouldUpdateDirectory){
                this.getDirectoryInformation()
            }
        })
    }

    errorHandler = () => {
        this.setState({errors: "true"});
    }

    // make Axios call to server
    getDirectoryInformation = () => {
        let url = window.location.origin + "/path/";
        for (let i = 0 ; i < this.state.currentAddress.length ; i++){
            url += this.state.currentAddress[i];
            if (i < this.state.currentAddress.length - 1){
                url += "/"
            }
        }
        Axios.get(url)
        .then(response => {
            this.setState({currentDirectory: response.data})
        }, error => {
            this.errorHandler(error.response)
        })
    }

    componentDidMount = () => {
        // set to true to request data from server
        this.getCurrentAddress(true);
    }
    componentDidUpdate = (prevProps, prevState) => {
        this.getCurrentAddress();
    }


    render (){
        let currentDirectory = this.state.currentDirectory;

        let content = "";
        // if the currentDirectory is null, provide an error message
        if (this.state.errors){
            content = <div className={classes.notFound}><h2>There has been an error communicating with the server.</h2></div>;            
        } else if (currentDirectory === null){
            content = <div className={classes.notFound}><h2>This directory does not exist.</h2></div>;            
        }

        // show if currentDirectory is defined and the type is an acceptable type
        if (currentDirectory !== null && (currentDirectory["type"] === "file" || currentDirectory["type"] === "dir")){
            // show the icons for the directory children
            if (currentDirectory["children"]){
                content = Object.keys(currentDirectory["children"]).map(key => {
                    const child = currentDirectory["children"][key];
                    return(
                        <Link 
                            to={{
                                pathname: this.props.location.pathname + key + "/"
                            }}
                            key={key}>
                            <DirectoryItem
                                name={key}
                                type={child["type"]}
                            />
                        </Link>
                    )
                })
            // if not a directory, show file contents (title)
            } else {
                content = (
                    <DirectoryItem
                        name={currentDirectory["name"]}
                        type={currentDirectory["type"]}
                        endFile={true}
                    />
                )
            }
        }

        return (
            <div className={classes.Home}>
                <Breadcrumbs currentAddress={this.state.currentAddress} />
                {content}
            </div>
        )
    }

}



export default withRouter(Home);