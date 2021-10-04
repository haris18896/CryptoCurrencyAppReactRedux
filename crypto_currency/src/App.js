import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <Router>
        <div className="App">
        <div className="navbar">
          <NavBar />
        </div>

        <div className="main">
        
        </div>

        <div className="footer">
        
        </div>
      </div>
    </Router>
   
  );
}

export default App;
