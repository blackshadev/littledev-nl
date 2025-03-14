import { Oxygen, Roboto } from 'next/font/google';

import Layout from '../components/Layout';
import classNames from '../helpers/classNames';
import '../styles/globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

const oxygen = Oxygen({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
});
const roboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    weight: '300',
});

export const metadata: Metadata = {
    title: 'Littledev',
    description: 'Personal homepage of Vincent Hagen aka Littledev',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): ReactNode {
    return (
        <html
            lang="en"
            className={classNames(oxygen.className, roboto.className)}
        >
            <head>
                {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        data-domain="littledev.nl"
                        src="https://plausible.littledev.nl/js/script.js"
                    ></script>
                )}
            </head>
            <body className="bg-white text-black dark:bg-gray-900 dark:text-gray-100">
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
