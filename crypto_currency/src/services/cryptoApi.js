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
            query : (count) => createRequest(`/coins?limit=${count}`),  
        }),
        getCryptoDetails:  builder.query({
            query : (coinId) => createRequest(`/coin/${coinId}`),  
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
} = cryptoApi;


