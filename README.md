# CryptoCurrencyAppReactRedux

## `Fetching data from endpoint`

actually the Redux toolkit, creates a hook, that we can call instantly to get all the data for your query, that makes it so much simple to retrieve the data from API, they also gives us `Loading` states `finalizing` states, and everything we need while making API calls. 
###### `must check`
```js
// src/services/cryptoApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeader = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '868065a2c3msh3028016d4d037b5p13f02djsn2ed444dd03a9'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeader });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos:  builder.query({
            query : () => createRequest(`/coins`),
        })
    })
});

export const {
    useGetCryptosQuery,
} = cryptoApi;


```

now go to the `HomePage`
```js
import { useGetCryptosQuery } from '../../services/cryptoApi';

//......
function HomePage() {

    const { data, isFetching } = useGetCryptosQuery();  // calling

    console.log(data)

    return (
      // .....
    )
```


to create more endpoints, we just have to change the code of `getCryptos` rest of the code in the `cryptoApi` will be same.

we also Saw that at the starting the `data` in the console.log was undefiend that's why Redux toolkit give us `isFetching` state, that's how we can use it show the loading state.


```jsx
// src/components/homepage/HomePage.jsx
function HomePage() {



    const { data, isFetching } = useGetCryptosQuery();

    console.log(data)

    if (isFetching) {
        return(
            <Spin className="spinner" size="large" />
        )
    }

    //............
```
and that's where we can use a `loading` component.    

Now makeing use of  `data`.
    `const globalStates = data?.data?.stats;`

now we can use this globalStates object to get data from api. and we can do it like this in the `HomePage.jsx`.

```jsx
// src/components/homepage/HomePage.jsx
//............
<Col span={12}><Statistic title="Total Crypto Currencies" value={globalStats.total} /></Col>
<Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
<Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
<Col span={12}><Statistic title="Total 24th Volume" value={millify(globalStats.total24hVolume)} /></Col>
<Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
```

for the remaining data we are going to use `millify` to format our data.

at this point our api is successfully working, and fetching data.

* now it's time to fetch data about each specific cryptoCurrency, and then `map` over it display it in the `HomePage.jsx` 

```jsx
// /src/components/homepage/HomePage.jsx

//.....
return(
    <>
        // .....
        <Row>
            //.......
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
```

with `<News simplified />` and `<CryptoCurrencies simplified />` here the `simplified` attribute take cares of showing only `10 items` and not hundred 








