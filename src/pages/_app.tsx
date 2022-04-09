import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/utils";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import React from "react";
import { AuthProvider } from "src/lib/firebase/hooks/useAuth";

import { ComponentTypeWithLayout, DEFAULT_LAYOUT } from "src/lib/helpers/layout";
import createEmotionCache from "src/lib/styles/createEmotionCache";
import { ThemeProvider } from "src/lib/styles/theme";

import "./App.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps): React.ReactElement {
    const Layout = (Component as ComponentTypeWithLayout<React.PropsWithChildren<unknown>>)._layout || DEFAULT_LAYOUT;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider>
                <AuthProvider>
                    <CssBaseline enableColorScheme />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
