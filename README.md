# CryptoCurrencyAppReactRedux

## `rapid Api and Redux`

Now we are going to fetch real data from `Rapid API` using Redux.

go to the `https://rapidapi.com/Coinranking/api/coinranking1/` Rapid Api, and test the api,

create a directory in the `/src/` called `services` inside `/src/services/` create a file called `cryptoApi.js`.

* this is the new way of redux to fetch data from an API. 

inside `/src/services/cryptoApi.js` paste the `options` from the Rapid Api. (check this in the cryptoApi.js)


```js
// /src/services/cryptoApi.js

// var options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/exchanges',
//     headers: {
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//       'x-rapidapi-key': '868065a2c3msh3028016d4d037b5p13f02djsn2ed444dd03a9'
//     }
//   };
```

here in the `cryptoApi.js` file we will do the logic of fetching data.

but before any logic we have to create a `Store`.

```js
// /src/app/store.js
import { configureStore } from '@reduxjs/toolkit';


export default configureStore({
    reducer: {}
});
```

after that use it in the `index.js` as a `<Provider store={store}><App /></Provider>`

now as we have store, we can create the 1st piece of data of fetching Functionality.

---
---

to fetch data from the api we have to 
```js
// /src/services/cryptoApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
```

after that we have to define the headers
```js
// /src/services/cryptoApi.js
const cryptoApiHeader = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '868065a2c3msh3028016d4d037b5p13f02djsn2ed444dd03a9'
}
```

along with the headers we also have to define the baseURL
```js
// /src/services/cryptoApi.js
const baseUrl = 'https://coinranking1.p.rapidapi.com/exchanges';
```

now we can remove the options that we have copied from the Rapid Api.

and then we are going to export the `cryptoApi` and then we have to pass some options inside of the object.

in that object we have to pass the endpoints, which is going to be a function, with a `builder` as a first parameter and then that function instantly returns an object. inside that object we can specify the names of the `endpoints`. also we can name it anything we want e.g `getCrypto` etc.

```js
// /src/services/cryptoApi.js
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCrypto:  builder.query({
            query : () =>'/coins'
        })
    })
});
```

also remember, if we want to make that request of `/exchanges` endpoint we have to pass the `Headers`,   

so we can create a simply `utility function` that is going to add `URL` and the `Headers` to our `core`.
and then we can use that `utility function` instead of `/exchanges` and pass that `/exchanges` endpoint to the function.

this way we are going to get all the `Exchanges`

```js
// /src/services/cryptoApi.js
const createRequest = (url) => ({ url, headers: cryptoApiHeader });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCrypto:  builder.query({
            query : () => createRequest(`/coins`),
        })
    })
});
```
---

#### `complete CryptoApi code`

```jsx
// src/services/cryptoApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';


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
        getCrypto:  builder.query({
            query : () => createRequest(`/coins`),
        })
    })
});
```

---
---

Now we have to find a way to connect the `cryptoApi` to our store

```js
// /src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi'


export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    }
});
```

we have to specify this for every single reducer that we create.

Now our application is connected. Now we just have to see what data that we have to get first and then fetch it from the appropriate endpoint.
