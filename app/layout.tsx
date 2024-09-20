import { Oxygen, Roboto } from 'next/font/google';

import Layout from '../components/Layout';
import classNames from '../helpers/classNames';
import '../styles/globals.css';
import { Metadata } from 'next';

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
}) {
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
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
