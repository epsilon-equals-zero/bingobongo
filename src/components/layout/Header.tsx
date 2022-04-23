import getConfig from "next/config";
import Link from "next/link";

import { AuthWidget } from "@components/auth/AuthWidget";

const { publicRuntimeConfig: config } = getConfig();

export function Header() {
    return (
        <header className="grid py-6 px-8" style={{ gridTemplateColumns: "64px 1fr 64px" }}>
            <div></div>
            <div className="mx-auto text-center select-none">
                <Link href="/" passHref>
                    <a>
                        <p className="text-2xl font-title leading-5">
                            bingo
                            <br />
                            bongo
                        </p>
                        <p className="text-xs opacity-50">v{config?.version}</p>
                    </a>
                </Link>
            </div>
            <div className="flex flex-row justify-end">
                <AuthWidget />
            </div>
        </header>
    );
}
