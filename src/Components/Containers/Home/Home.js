import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import DirectoryItem from './DirectoryItem/DirectoryItem';
import classes from "./Home.scss";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import Axios from 'axios';

class Home extends Component {
    state = {
        currentAddress: [],
        currentDirectory: "loading",
        errors: false
    }


    errorHandler = () => {
        this.setState({errors: "true"});
    }

    // make Axios call to server
    // change currentAddress simultaneously to avoid
    // errors in the path used for the links

    getDirectoryInformation = () => {
        let url = window.location.origin + "/path/";
        const pathName = this.props.location.pathname.split("/");
        let pathArray = [];
        for (let i = 0 ; i < pathName.length ; i++){
            if (pathName[i] !== ""){ pathArray = [...pathArray, pathName[i]]};
        }
        for (let i = 0 ; i < pathArray.length ; i++){
            url += pathArray[i];
            if (i < pathArray.length - 1){
                url += "/"
            }
        }
        Axios.get(url)
        .then(response => {
            this.setState(() => {
                return {currentDirectory: response.data, currentAddress: pathArray};
            })
        }, error => {
            this.errorHandler(error.response)
        })
    }

    componentDidMount = () => {
        // set to true to request data from server
        this.getDirectoryInformation(true);
    }
     
    // only update if new path is given or new directory information is received
    shouldComponentUpdate = (nextProps, nextState) => {
        return (JSON.stringify(this.state.currentDirectory) !== JSON.stringify(nextState.currentDirectory) ||
        this.props.location.pathname !== nextProps.location.pathname)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (JSON.stringify(this.state.currentDirectory) !== JSON.stringify(prevState.currentDirectory) ||
            this.props.location.pathname !== prevProps.location.pathname){
            this.getDirectoryInformation();
        }
    }


    render (){
        let currentDirectory = this.state.currentDirectory;
        // get current pathname from state, so that it changes
        // at the same time that directory information is obtained
        // and therefore does not cause issues with links
        let pathname = "/"
        for (let i = 0 ; i < this.state.currentAddress.length ; i++){
            pathname += this.state.currentAddress[i] + "/";
        }

        let content = "";
        // if the currentDirectory is null, provide an error message
        if (this.state.errors){
            content = <div className={classes.notFound}><h2>There has been an error communicating with the server.</h2></div>;            
        } else if (currentDirectory === null){
            content = <div className={classes.notFound}><h2>This directory does not exist.</h2></div>;            
        } else if (currentDirectory === "loading"){
            content = <div className={classes.notFound}><h2>Loading directory...</h2></div>;            

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
                                pathname: pathname + key + "/"
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