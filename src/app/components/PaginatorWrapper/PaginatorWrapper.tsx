'use client';

import React, { useState } from 'react';

import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

import { PaginatorProps } from 'app/components/PaginatorWrapper/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchParamsHelper } from 'utils/searchParamsHelper';

export const PaginatorWrapper: React.FC<PaginatorProps> = ({
    total,
    current,
}) => {
    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const searchHelper = new SearchParamsHelper(params.entries);

    const [first, setFirst] = useState(current);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        searchHelper.set('page', (event.page + 1).toString());
        router.push(pathname + searchHelper.getParams);
    };

    return (
        <Paginator
            style={{ display: 'flex', justifyContent: 'center' }}
            first={first}
            rows={6}
            totalRecords={total * 6}
            onPageChange={onPageChange}
        />
    );
};
