import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Typography, Row, Col, Statistic} from 'antd';


const { Title } = Typography;

function HomePage() {
    return (
        <>
            <Title level={2} className="heading">Global Crypto Status</Title>
            <Row>
                <Col span={12}><Statistic title="Total Crypto Currencies" value="5" /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value="5" /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value="5" /></Col>
                <Col span={12}><Statistic title="Total 24th Volume" value="5" /></Col>
                <Col span={12}><Statistic title="Total Markets" value="5" /></Col>
            </Row>
        </>
    )
}

export default HomePage
