# CryptoCurrencyAppReactRedux

## `cryptoDetail component`

when we click on the `coin` in the `cryptoCurrencies` we should be directed to the `cryptoDetail` component. and now we are going to add data to that page for every specific coin.

```jsx
// src/components/cryptoDetails/CryptoDetails.jsx
import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Row, Col, Select, Typography } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined,
    TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {

    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod ] = useState('7d');

    return (
        <div>
            <h1>CryptoDetails {coinId}</h1>
        </div>
    )
}

export default CryptoDetails
```

`useParams` takes the id `coinId` in the URL and simply allows you to use it as a variable.

after this we are going to fetch details for that specific `coinId`., we can do that by going to `cryptoApi.js` service and simply add another service. and then export it.

```js
// /src/services/cryptoAp.js

//.......
({
    //......
    endpoints: (builder) => ({
        getCryptos:  builder.query({
            query : (count) => createRequest(`/coins?limit=${count}`),  
        }),
        getCryptoDetails:  builder.query({
            query : (coinId) => createRequest(`/coins/${coinId}`),  
        }),
    }),
    });

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
} = cryptoApi;

```

after that we are going to use it in the `cryptoDetails` component.

```jsx
// /src/components/cryptoDetails/CryptoDetails.jsx

//......
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';


const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {

    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod ] = useState('7d');
    const { data, isFetching} = useGetCryptoDetailsQuery(coinId);
    console.log(data)

///......
```

charts are not added yet. to add `charts` we will have to make another component for that
```js
import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Row, Col, Select, Typography, Spin } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined,
    TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';


const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {

    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod ] = useState('7d');
    const { data, isFetching} = useGetCryptoDetailsQuery(coinId);

    const cryptoDetails = data?.data?.coin;

    if(isFetching) return <Spin className="spinner" size="large" />

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];
    
    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.name} ({cryptoDetails.slug}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in US dollars.
                    views value statistics, market cap and supply.
                </p>
            </Col>
            <Select
                defaultValue='7d'
                className="select-timePeriod"
                placeholder="Select Time Period"
                onChange={(value) => setTimePeriod(value)}
                >
                    {time.map((date) => <Option key={date}>{date}</Option>)}
            </Select>

            {/* Line Chart */}

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {cryptoDetails.name} Value Statistics   
                        </Title>
                        <p>
                            An overview of showing the stats of {cryptoDetails.name}  
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value}) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>

                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            other Statistics   
                        </Title>
                        <p>
                            An overview of showing the stats of all CryptoCurrencies
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value}) => (
                        <Col className="coin-stats">
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title className="coin-detail-heading" level={3}>
                        what is {cryptoDetails.name}
                        {HTMLReactParser(cryptoDetails.description)}
                    </Title>
                </Row>
                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link) => (
                        <Row className="coin-link" key={link.name}>
                            <Title className="link-name" level={5}>
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails
```






