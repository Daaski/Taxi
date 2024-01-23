export interface QueryParams {
    page: string;
}

export interface TaxiType {
    id: number;
    name: string;
}

export interface SingleTaxiType {
    result: number;
    name: string;
    text: string;
}

export interface TaxiResponseType {
    result: number;
    pages: number;
    page: number;
    items: TaxiType[];
}

export type GetTaxi = (
    query: QueryParams
) => Promise<TaxiResponseType | undefined>;

export type GetTaxiById = (id: number) => Promise<SingleTaxiType>;
