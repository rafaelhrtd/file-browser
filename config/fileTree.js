let root = {
    type: "dir",
    children: {
        home: {
            type: "dir",
            children: {
                rafael: {
                    type: "dir",
                    children: {
                        "filea.txt": {
                            type: "file",
                        },
                        "fileb.txt": {
                            type: "file",
                        },
                        projects: {
                            type: "dir",
                            children: {
                                mysupersecretproject: {
                                    type: "dir",
                                    children: {
                                        mysupersecretfile: {
                                            type: "file",
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// turns path into array that will be used in getDirectory
const getPath = (path) => {
    const pathName = path.split("/");
    let pathArray = [];
    for (let i = 0 ; i < pathName.length ; i++){
        if (pathName[i] !== ""){ pathArray = [...pathArray, pathName[i]]};
    }
    // remove "path"
    pathArray.splice(0, 1);
    return pathArray;
}
// returns directory information (or file information) obtained from
// "root" and provided path. Returns null if nothing is found.
exports.getDirectory = (path) => {
    const pathArray = getPath(path);
    let currentLocation = root;
    // directory information to be passed in response
    let directoryInformation = {}
    for (let i = 0 ; i < pathArray.length ; i++){
        // check if children exist to avoid null error
        if (currentLocation["children"]){
            currentLocation = currentLocation["children"][pathArray[i]];
            // if there are more paths in the array and currentLocation is a file, 
            // it should return null
            if (i < pathArray.length - 1 && currentLocation["type"] !== "dir"){
                currentLocation = null;
                break;
            }
        }
    }
    // copy superficial information from the current location to directoryInformation
    if (currentLocation){
        directoryInformation["type"] = currentLocation["type"];
        if (directoryInformation["type"] === "file"){
            directoryInformation["name"] = pathArray[pathArray.length - 1];
        } else if (currentLocation["type"] === "dir"){
            directoryInformation["children"] = {};
            for (let i = 0 ; i < Object.keys(currentLocation["children"]).length ; i++){
                const key = Object.keys(currentLocation["children"])[i];
                const child = currentLocation["children"][key];
                directoryInformation["children"][key] = {"type": child["type"]};
            }
        }
    }
    // return null if no object is found
    return Object.keys(directoryInformation).length === 0 ? null : directoryInformation;

}