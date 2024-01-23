import { QueryParams } from 'http/taxiService/types';

export const setQuery = (query: QueryParams) => {
    const searchParams = new URLSearchParams();

    for (const [queryKey, queryValue] of Object.entries(query)) {
        searchParams.set(queryKey, queryValue);
    }

    return searchParams;
};
