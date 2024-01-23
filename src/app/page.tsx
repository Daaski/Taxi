import { getTaxiListOnServer } from 'http/taxiService/taxiService';

import { Column } from 'primereact/column';
import { Card } from 'primereact/card';

import { TableWrapper } from 'app/components/TableWrapper';
import { PaginatorWrapper } from './components/PaginatorWrapper';

import scss from './MainPage.module.scss';
import { AxiosError } from 'axios';
import NotFound from 'components/notFound';

export default async function Home({
    searchParams,
}: {
    searchParams: { page: string };
}) {
    const page = searchParams.page ?? 1;

    const taxiList = await getTaxiListOnServer({ page });

    if (!taxiList) {
        return <NotFound />;
    }

    return (
        <Card style={{ margin: '5%' }} title="Taxi items">
            <TableWrapper tableData={taxiList.items}>
                <Column field="id" header="Номер" />
                <Column field="name" header="Название" />
            </TableWrapper>
            <PaginatorWrapper
                current={(+page - 1) * 6}
                total={taxiList.pages}
            />
        </Card>
    );
}
