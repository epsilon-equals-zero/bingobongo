import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/utils";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";

import { Layout } from "src/components/layout/Layout";
import createEmotionCache from "src/lib/styles/createEmotionCache";
import { ThemeProvider } from "src/lib/styles/theme";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps): React.ReactElement {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider>
                <CssBaseline enableColorScheme />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </CacheProvider>
    );
}
