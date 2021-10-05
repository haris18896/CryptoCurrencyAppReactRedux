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
const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news/trendingtopics';
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
const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news/trendingtopics';

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









