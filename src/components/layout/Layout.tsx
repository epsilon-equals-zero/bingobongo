import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * A general layouting component for the application.
 */
export function Layout({ children }: React.PropsWithChildren<unknown>) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
