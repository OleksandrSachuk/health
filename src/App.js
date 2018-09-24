import React, { Component } from 'react';
import Dashboard from './modules/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dashboard</h1>
        </header>
        <Dashboard />
      </div>
    );
  }
}

export default App;
