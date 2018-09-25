import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Dashboard from './modules/Dashboard';
import './App.css';

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: '70px'
  },
  toolbar: {
    margin: '0 auto',
  },
};

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={ classes.root }>
          <AppBar position="fixed" color="default">
            <Toolbar className={ classes.toolbar }>
              <Typography variant="title" color="primary">
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <Dashboard />
      </div>
    );
  }
}

export default withStyles(styles)(App);
