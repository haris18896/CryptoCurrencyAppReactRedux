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
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        }),
    }),
});


export const { useGetCryptoNewsQuery } = cryptoNewsApi;