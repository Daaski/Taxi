'use server';

import axios from 'axios';

export const $serverHost = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
