import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Spin} from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';



const { Title } = Typography;

function HomePage() {



    const { data, isFetching } = useGetCryptosQuery();

    console.log(data)

    if (isFetching) {
        return(
            <Spin className="spinner" size="large" />
        )
    }

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
