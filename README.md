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








