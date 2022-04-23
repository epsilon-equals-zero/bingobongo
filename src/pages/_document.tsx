import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class BingoDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />

                    <link
                        href="https://fonts.googleapis.com/css2?family=Righteous&family=Source+Sans+Pro:wght@200;400;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
