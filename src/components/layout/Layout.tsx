import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

/**
 * A general layouting component for the application.
 */
export function Layout({ children }: React.PropsWithChildren<unknown>) {
    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="pointer-events-none -z-10">
                <div
                    className="fixed bg-black opacity-10 rotate-45"
                    style={{ top: "-15vmin", right: "-5vmin", minWidth: "75vmin", minHeight: "75vmin" }}
                ></div>
                <div
                    className="fixed bg-black opacity-10 rounded-full"
                    style={{ bottom: "-15vmin", left: "-5vmin", minWidth: "75vmin", minHeight: "75vmin" }}
                ></div>
            </div>

            <Header />
            <main className="flex flex-col flex-grow max-w-5xl w-full mx-auto">{children}</main>
            <Footer />
        </div>
    );
}
