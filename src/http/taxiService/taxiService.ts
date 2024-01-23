import { GetTaxi, GetTaxiById } from 'http/taxiService/types';
import { setQuery } from 'utils/queryHelper';
import { AxiosResponse } from 'axios';
import { $serverHost } from 'http/indexes/serverIndex';
import { $clientHost } from 'http/indexes/clientIndex';

export const getTaxiListOnServer: GetTaxi = async (query) => {
    const queryParams = setQuery(query);
    try {
        const res: AxiosResponse<ReturnType<typeof getTaxiListOnServer>> =
            await $serverHost.get('?w=list', {
                params: queryParams,
            });

        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getTaxiById: GetTaxiById = async (id) => {
    const res: AxiosResponse<ReturnType<typeof getTaxiById>> =
        await $clientHost.get(`?w=item&id=${id}`);

    return res.data;
};
