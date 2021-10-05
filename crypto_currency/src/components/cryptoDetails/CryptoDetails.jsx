import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Row, Col, Select, Typography } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined,
    TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

// import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';


const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {

    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod ] = useState('7d');
    // const { data, isFetching} = useGetCryptoDetailsQuery(coinId);
    // console.log(data)

    return (
        <div>
            <h1>CryptoDetails {coinId}</h1>
        </div>
    )
}

export default CryptoDetails
