import axios from 'axios';

export const $clientHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
