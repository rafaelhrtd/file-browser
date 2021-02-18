import React, { Component } from 'react';
import classes from './App.scss';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Containers/Home/Home'

class App extends Component {
  render() {
    return (
      <div className={classes.Container}>
        <BrowserRouter>
            <Route path="/" render={() => (
              <Home />
            )} />
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
