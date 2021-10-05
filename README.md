# CryptoCurrencyAppReactRedux

## `Small screen Navbar Button`

Right now our Navbar looks like this
```jsx
// /src/components/navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Menu, Button } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';


import icon from '../../assets/images/cryptocurrency.png'

function NavBar() {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoVerse</Link>
                </Typography.Title>
                <Button className="menu-control-container"><MenuOutlined /></Button>
            </div>

                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            </div>

    )
}

export default NavBar

```

to add that button we have used `Button` component from `antd`, now we are going to make it work on small screen, for that we have to import `useState, useEffect`

we will have to use 2 different `useEffects`

the first useEffect is going to have nothing in the dependency array, so it will be a function which is going to happen once at the start of the rendered.

```jsx
// /src/components/navbar/Navbar.jsx
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Menu, Button } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';


import icon from '../../assets/images/cryptocurrency.png'

function NavBar() {

    const [activeMenu, setActiveMenu ] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)     // this is how we get the width of the screen

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    },[])

    useEffect(() => {
        // this useEffect will be called whenever the screen size changes.
        if(screenSize < 768){
            setActiveMenu(false);
        }else{
            setActiveMenu(true)
        }
    },[screenSize])

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoVerse</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
                {activeMenu && (
                    <Menu theme="dark">
                        <Menu.Item icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item icon={<FundOutlined />}>
                            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        </Menu.Item>
                        <Menu.Item icon={<MoneyCollectOutlined />}>
                            <Link to="/exchanges">Exchanges</Link>
                        </Menu.Item>
                        <Menu.Item icon={<BulbOutlined />}>
                            <Link to="/news">News</Link>
                        </Menu.Item>
                    </Menu>
                )}
            </div>

    )
}

export default NavBar
```

```jsx
// /src/components/exchanges/Exchanges.jsx
import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Spin } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Spin className="spinner" size="large" />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
```