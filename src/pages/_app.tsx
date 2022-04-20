import "@css/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

import { ComponentTypeWithLayout, DEFAULT_LAYOUT } from "src/lib/helpers/layout";

export default function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
    const Layout = (Component as ComponentTypeWithLayout<React.PropsWithChildren<unknown>>)._layout || DEFAULT_LAYOUT;

    return (
        <>
            <Head>
                <title>bingobongo</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
