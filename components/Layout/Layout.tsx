import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Navigation from '../Navigation/Navigation';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <a className="sr-only focus:not-sr-only" href="#content">
                Naar content
            </a>
            <Navigation />
            <main
                id="content"
                className="container mt-6 px-4 md:mx-auto md:px-0 "
            >
                {children}
            </main>
        </div>
    );
}
