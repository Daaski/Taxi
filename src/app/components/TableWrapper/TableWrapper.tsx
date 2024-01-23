'use client';

import React, { useEffect, useState } from 'react';

import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';

import { TableWrapperProps } from 'app/components/TableWrapper/types';
import { Dialog } from 'primereact/dialog';
import { SingleTaxiType, TaxiType } from 'http/taxiService/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchParamsHelper } from 'utils/searchParamsHelper';
import { getTaxiById } from 'http/taxiService/taxiService';

export const TableWrapper: React.FC<TableWrapperProps> = ({
    children,
    tableData,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const id = searchParams.get('id');

    const searchHelper = new SearchParamsHelper(searchParams.entries);

    const [selectedData, setSelectedData] = useState<SingleTaxiType | null>(
        null
    );

    const [selectedRow, setSelectedRow] = useState<TaxiType | null>(null);
    const [visible, setVisible] = useState(false);

    const handleSelect = async (value: TaxiType) => {
        searchHelper.set('id', value.id.toString());
        router.push(pathname + searchHelper.getParams);

        const taxi = await getTaxiById(value.id);
        setSelectedData(taxi);

        setSelectedRow(value);
        setVisible(true);
    };

    const onDialogHide = () => {
        setVisible(false);
        setSelectedRow(null);
        setSelectedData(null);
        searchHelper.delete('id');
        router.replace(pathname + searchHelper.getParams);
    };

    useEffect(() => {
        if (id) {
            getTaxiById(+id).then((data) => {
                setSelectedRow(
                    tableData.find((el) => el.id === +id) as TaxiType
                );
                setSelectedData(data);
                setVisible(true);
            });
        }
    }, []);

    return (
        <>
            <DataTable
                selection={selectedRow}
                onSelectionChange={(e) => {
                    handleSelect(e.value as TaxiType);
                }}
                selectionMode="single"
                tableStyle={{ minWidth: '100%' }}
                value={tableData}
            >
                {children}
            </DataTable>
            <Dialog
                header="TaxiInfo"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => onDialogHide()}
            >
                <p className="m-0">Название: {selectedData?.name}</p>
                <p className="m-0">Результат: {selectedData?.result}</p>
                <p className="m-0">Текст: {selectedData?.text}</p>
            </Dialog>
        </>
    );
};
