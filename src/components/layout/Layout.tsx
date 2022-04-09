import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps {
    showAuthBox?: boolean
}

/**
 * A general layouting component for the application.
 */
export function Layout({ showAuthBox = true, children }: React.PropsWithChildren<LayoutProps>) {
    return (
        <Container sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header showAuthBox={showAuthBox} />
            <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
            </Box>
            <Footer />
        </Container>
    );
}
