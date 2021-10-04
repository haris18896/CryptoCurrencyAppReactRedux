import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Spin} from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import CryptoCurrencies from '../cryptoCurrencies/CryptoCurrencies';
import News from '../news/News'



const { Title } = Typography;

function HomePage() {

    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if (isFetching) {
        return(
            <Spin className="spinner" size="large" />
        )
    }

    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title="Total Crypto Currencies" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24th Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>

            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 Cryptocurrencies</Title>
                <Title level={2} className="home-more">
                    <Link to="/cryptocurrencies">Show More</Link>
                </Title>
            </div>
            <CryptoCurrencies simplified />

            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={2} className="home-more">
                    <Link to="/news">Show More</Link>
                </Title>
            </div>
            <News simplified />
        </>
    )
}

export default HomePage
