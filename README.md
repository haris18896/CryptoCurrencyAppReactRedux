# CryptoCurrencyAppReactRedux

## `Chart js`

```jsx
// /src/component/linechart/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { Col, Row, Typography, Spin} from 'antd';

const { Title } = Typography;

function LineChart() {
    return (
        <div>
            
        </div>
    )
}

export default LineChart
```

and then import it in the `cryptoDetials.jsx1` component.
```jsx
// /src/component/cryptoDetails/CryptoDetails.jsx
<LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />

```

* right now we don't have a `coinHistory` but that's what we are going too build

now making `coinHistory` endpoint.
```js
// /src/services/cryptoApii.js

//......
        getCryptoDetails:  builder.query({
            query : (coinId) => createRequest(`/coin/${coinId}`),  
        }),
        getCryptoHistory:  builder.query({
            query : (coinId, timePeriod) => createRequest(`/coin/${coinId}/history/${timePeriod}`),  
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;

```

now we can import this `useGetCryptoHistory` in the `cryptoDetails.jsx`

```jsx
// /src/components/CryptoDetails.jsx
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';

import LineChart from '../linechart/LineChart'
//....

function CryptoDetails() {

    //....
    //....
    const { data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory} = useGetCryptoHistoryQuery(coinId , timePeriod);
    //.....
    //.....
    {/* Line Chart */}
    <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
    //.....
    //.....
```

now we can go to the `LineChart.js` and add charts

