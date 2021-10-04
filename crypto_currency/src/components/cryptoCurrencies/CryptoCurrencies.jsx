import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Spin } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi.js';

function CryptoCurrencies({ simplified}) {

    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [ cryptos, setCryptos ] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins?.filter((coin) => {
            return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
        }); 

        setCryptos(filteredData);

    } , [cryptosList, searchTerm]);

    if (isFetching) {
        return(
            <Spin className="spinner" size="large" />
        )
    }

    return (
        <>
            <div className="search-crypto">
                <Input placeholder="Search Crypto Currency" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={currency.id} className="crypto-card">
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                            title={`${currency.rank}. ${currency.name}`}
                            extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
                            hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Price: {millify(currency.marketCap)}</p>
                                <p>Price: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default CryptoCurrencies
