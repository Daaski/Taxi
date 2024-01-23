import React from 'react';

import { Metadata } from 'next';

import 'primereact/resources/themes/lara-light-cyan/theme.css';

export const metadata: Metadata = {
    title: 'Taxi',
    description: 'Taxi',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body>{children}</body>
        </html>
    );
}
