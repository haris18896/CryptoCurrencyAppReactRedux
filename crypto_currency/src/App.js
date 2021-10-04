import React from 'react';
import { BrowserRouter as Router ,Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import './App.css';

import Navbar from './components/navbar/Navbar.jsx'
import HomePage from './components/homepage/HomePage';
import Exchanges from './components/exchanges/Exchanges';
import CryptoCurrencies from './components/cryptoCurrencies/CryptoCurrencies';
import CryptoDetails from './components/cryptoDetails/CryptoDetails';
import News from './components/news/News';



const App = () => (
  <Router>
      <div className="app">
        <div className="navbar">
            <Navbar />
        </div>

        <div className="main">
            <Layout>
                <div className="routes">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/exchanges" component={Exchanges} />
                        <Route exact path="/cryptocurrencies" component={CryptoCurrencies} />
                        <Route exact path="/crypto/:coinId" component={CryptoDetails} />
                        <Route exact path="/news" component={News} />
                    </Switch>

                </div>
            </Layout>


          <div className="footer" >
              <Typography.Title level={5} style={{color: 'white', textAlign: 'center' }}>
                &copy; CryptoVerse <br />
                  All rights Reserved
              </Typography.Title>
              <Space>
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
              </Space>
          </div>
        </div>
    </div>
  </Router>
  
);

export default App;