# CryptoCurrencyAppReactRedux

## `News Components`
use `rfce` to create functional component or `rafce` to create an arrow functional component
```jsx
// /src/components/news/News.jsx
import React from 'react';

function News() {
    return (
        <div>
            <h1>News</h1>
        </div>
    )
}

export default News
```

the situation is going to be similar as to `CryptoCurrencies.jsx`. but first we have to create a `service` and we will called it `cryptoNewsApi.js`

in this api we will be using `bing news search` api to fetch the news.

```js
// /src/services/cryptoNewsApi.js
// import the libraries from redux devtool to create api
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
```

after that we will have to define the Headers
```js
// /src/services/cryptoNewsApi.js
//......
// defining headers
const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '868065a2c3msh3028016d4d037b5p13f02djsn2ed444dd03a9'
  }
```
after defining the headers we will have to define the baseUrl that we are fetching from .


```js
// /src/services/cryptoNewsApi.js
//......
// defining baseUrl
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
```
after that we are going to define the request that what url is going to be fetched and what is the method that is going to be used.
```js
// /src/services/cryptoNewsApi.js
//......
// creating a request to the API
const createRequest = (url) => ({url, headers: cryptoNewsHeaders});
```

the last part of the `redux devtool api creation` is to use the `createApi` function to create the api.

```js
// /src/services/cryptoNewsApi.js
//......
// createAPi
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
});

//export the query 
export const { useGetCryptoNewsQuery } = cryptoNewsApi;

```

---
---
#### `complete cryptoNewsAp.js`
```js
// /src/services/cryptoNewsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// defining headers
const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '868065a2c3msh3028016d4d037b5p13f02djsn2ed444dd03a9'
  }

// defining baseUrl
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

// creating a request to the API
const createRequest = (url) => ({url, headers: cryptoNewsHeaders});

// createAPi
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

```
---
---

Now add this Query to the Store.
```js
// /src/app/store.js

//....
import { cryptoNewsApi } from '../services/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    }
});
```

---
---

Now we can use it in the `News.jsx` component
```jsx
// /src/components/news/news.jsx
import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi'

const { Text, Title } = Typography;
const { Option } = Select;
function News() {

    return (
        <div>
            <h1>News</h1>
        </div>
    )
}

export default News
```

* Now after the imports we are going to fetch the data.

for the `count` we are going to use the same `simplified` method.
```jsx
// /src/components/news/News.jsx
import React,{useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Spin} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi'

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  
    if (!cryptoNews?.value) return <Spin className="spinner" size="large" />;
  
    return (
      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.name}</Title>
                  <img style={{maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                </div>
                <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
export default News
```

---
---

#### `Select filter`
Now we are going to add a filter to the `News.jsx` component so that it will show news only related to the specific `coin`.

we already now all the names of the `coins` as it's in the `HomePage.jsx` and `CryptoCurrencies.jsx` components.
```jsx
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
```

we don't need `isFetchinig` and `Count` in the News component so the query will be.
```jsx
    const { data} = useGetCryptosQuery(100);
```
this way we will get all the 100 cryptos as a options, and now we have to `map` over it

* complete search and select option filter
```jsx
  // /src/components/news/News.jsx
  const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data} = useGetCryptosQuery(100);

  
    if (!cryptoNews?.value) return <Spin className="spinner" size="large" />;
  
    return (
      <Row gutter={[24, 24]}>
        {!simplified && (
            <Col span={24}>
                <Select
                    showSearch
                    className="select-news"
                    placeholder="Select crypto"
                    optionFilterProp="children"
                    onChange={(value) => setNewsCategory(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option className="option-news" value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => (
                          <Option value= {coin.name} key={coin.id}>{coin.name}</Option>
                        ))}
                    </Select>
            </Col>
        )}
        //......
        //.......
```
#### `Complete Code for News.jsx`
```jsx
import React,{useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card, Spin} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data} = useGetCryptosQuery(100);

  
    if (!cryptoNews?.value) return <Spin className="spinner" size="large" />;
  
    return (
      <Row gutter={[24, 24]}>
        {!simplified && (
            <Col span={24}>
                <Select
                    showSearch
                    className="select-news"
                    placeholder="Select crypto"
                    optionFilterProp="children"
                    onChange={(value) => setNewsCategory(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option className="option-news" value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => (
                          <Option value= {coin.name} key={coin.id}>{coin.name}</Option>
                        ))}
                    </Select>
            </Col>
        )}
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>{news.name}</Title>
                  <img style={{maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                </div>
                <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };
export default News
```




