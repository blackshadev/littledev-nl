import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Oxygen&family=Roboto:wght@300&display=swap"
                    rel="stylesheet"
                />
                {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        data-domain="littledev.nl"
                        src="https://plausible.littledev.nl/js/script.js"
                    ></script>
                )}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
