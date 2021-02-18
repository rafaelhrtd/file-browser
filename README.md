# File Browser Simulator
React application to simulate file browsing.
## Main Features
- Breadcrumbs.
- May contain files and directories.
- Directory information is available server-side only in a server that is run alongside app. This server is configured in *webpackDevServer.config.js*, and the information about the file tree and relevant functions are kept in a module *fileTree.js*.
## Implementation
- Stateful component *Home.js* keeps track of current location:
  - It reads this object according to the selected directory and passes the appropriate data to a funcional display component (DirectoryItem).
  - It stores the current directory in its state as an array of strings.
- Functional component *DirectoryItem.js* presents the items found within a directory, as well as file contents.
- Functional component *Breadcrumbs.js* receives currentAddress in form of array and processes into clickable links.
- The webpackDevServer takes get requests to the path "/path/", and responds with directory information (if the directory exists) or *null* if it does not. This information is saved in the state of *Home.js*.
## Important Files
- *Home.js*
  - src/Components/Containers/Home/Home.js
- *DirectoryItem.js*
  - src/Components/Containers/Home/DirectoryItem/DirectoryItem.js
- *Breadcrumbs.js*
  - src/Components/Containers/Home/Breadcrumbs/Breadcrumbs.js
- *fileTree.js*
  - config/fileTree.js
- *webpackDevServer.config.js*
  - config/webpackDevServer.config.js
## Running Website
[File browser](https://rafaelh-file-browser.herokuapp.com/)