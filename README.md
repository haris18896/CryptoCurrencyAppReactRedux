# CryptoCurrencyAppReactRedux

## `Crypto Currencies component`

```jsx
// /src/components/cryptooCurrencies/CryptoCurrencies.jsx
import React, { useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Spin } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi.js';

function CryptoCurrencies() {

    const { data: cryptosList, isFetching } = useGetCryptosQuery();
    const [ cryptos, setCryptos ] = useState(cryptosList?.data?.coins);
    console.log(cryptos);

    if (isFetching) {
        return(
            <Spin className="spinner" size="large" />
        )
    }

    return (
        <>
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos.map((currency) => (
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
```
if you want to add `space` between cards in a row then add the `gutter` attribute to the `Row` tag like this.
`<Row gutter={[32, 32]} className="crypto-card-container">` the [32, 32] is the upper, lower and left, right margins for the cards in the row.

now adding a counter to the `CryptoCurrencies.jsx` component, so that only 10 Cards will be rendered on the HomeScreen.

```jsx
// //src/components/cryptoCurrencies/CryptoCurrencies.jsx
//.....
function CryptoCurrencies({ simplified}) {

    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

```

after that add this count to the `services/cryptoApi.js` file, so that the API will only return 10 cryptos.
```js
// /src/services/cryptoApi.js

//....
        getCryptos:  builder.query({
            query : (count) => createRequest(`/coins?limit=${count}`),  
        })
//.....
```

to get the count of 10, if we are only on the `HomePage.jsx` for that.
```jsx
// /src/components/homePage/HomePage.jsx
function HomePage() {

    const { data, isFetching } = useGetCryptosQuery(10);
    //.....
```


* TypeError: Cannot read properties of undefined (reading 'map')
* *  some Times the list may be empty bcz of that the data cannot be mapped over. so for that add a `?` to the mapping array like this. `{cryptos?.map((currency) => (`

---
---

adding `Searching` Functionality to the `CryptoCurrencies.jsx` component.

for that we will have to use `useEffect`
```jsx
// src/components/cryptoCurrencies/CryptoCurrencies.jsx
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
                //.....
                //.....
                //.....
```

* * 1. first of all add a div at the top for the `Input` tag
* * 2. add a placeholder and onChange functionality to that `Input` tag
* * 3. create a state called `searchTerm` and set it to an empty string `const [searchTerm, setSearchTerm] = useState('');`
* * 4. after that use `useEffect` to update the `cryptos` state and when updating here we don't have to pass the hard coded state to the `useState` hook for cryptos. we can filter the data here in the `useEffect` hook.


```js
    useEffect(() => {
        const filteredData = cryptosList?.data?.coins?.filter((coin) => {
            return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
        }); 

        setCryptos(filteredData);
        } , [cryptosList, searchTerm]);
``` 


---
---

### `Removing Search from HomePage`

to do that we will have to go to the `CryptoCurrencies.jsx` and use the property that we have created and called `simplified`. we will say that if the `simplified` is not true then we will render the `Search`

```jsx
// /src/components/cryptoCurrencies/CryptoCurrencies.jsx
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Crypto Currency" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
```





