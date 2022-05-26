import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";

import "@css/globals.css";
import { AuthProvider } from "@lib/firebase/hooks/useAuth";
import { PageWithLayout, DEFAULT_LAYOUT } from "@lib/hoc/withLayout";

export default function BingoApp({ Component, pageProps }: AppProps): React.ReactElement {
    const Layout = (Component as PageWithLayout).layout || DEFAULT_LAYOUT;

    return (
        <AuthProvider>
            <Head>
                <title>bingobongo</title>
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>

            <Toaster />
        </AuthProvider>
    );
}
