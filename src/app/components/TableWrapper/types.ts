import { TaxiType } from 'http/taxiService/types';
import { ReactNode } from 'react';

export interface TableWrapperProps {
    tableData: TaxiType[];
    children: ReactNode;
}
