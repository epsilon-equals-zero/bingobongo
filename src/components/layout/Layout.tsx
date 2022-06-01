import React from "react";

import { Footer } from "./Footer";
import { Header, HeaderProps } from "./Header";

export type LayoutProps = HeaderProps;

/**
 * A general layouting component for the application.
 */
export function Layout({ branding, authWidget, children }: React.PropsWithChildren<LayoutProps>) {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Header branding={branding} authWidget={authWidget} />
            <main className="px-2 flex flex-col flex-grow max-w-5xl w-full mx-auto">{children}</main>
            <Footer />
        </div>
    );
}
