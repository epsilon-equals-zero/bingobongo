import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

export interface LayoutProps {
    showAuthBox?: boolean;
}

/**
 * A general layouting component for the application.
 */
export function Layout({ showAuthBox = true, children }: React.PropsWithChildren<LayoutProps>) {
    return (
        <div>
            <Header showAuthBox={showAuthBox} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
