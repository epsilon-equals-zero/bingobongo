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
            <main className="p-4 flex flex-col flex-grow w-full">{children}</main>
            <Footer />
        </div>
    );
}
