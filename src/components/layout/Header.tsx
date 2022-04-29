import getConfig from "next/config";
import Link from "next/link";

import { AuthWidget } from "@components/auth/AuthWidget";

const { publicRuntimeConfig: config } = getConfig();

export interface HeaderProps {
    branding?: boolean;
    authWidget?: boolean;
}

export function Header({ branding = true, authWidget = true }: HeaderProps) {
    return (
        <header className="grid py-6 px-8" style={{ gridTemplateColumns: "64px 1fr 64px" }}>
            <div></div>
            <div className="mx-auto text-center select-none">
                {branding ? (
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
                ) : null}
            </div>
            <div className="flex flex-row justify-end">{authWidget ? <AuthWidget /> : null}</div>
        </header>
    );
}
