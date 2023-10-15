import getConfig from "next/config";
import Link from "next/link";

import { AuthWidget } from "@components/auth/AuthWidget";
import Banner from "@public/banner-optimized.svg";

const { publicRuntimeConfig: config } = getConfig();

export interface HeaderProps {
    branding?: boolean;
    authWidget?: boolean;
}

export function Header({ branding = true, authWidget = true }: HeaderProps) {
    return (
        <header className="bg-neutral-900 flex items-center h-16 px-4">
            <div className="ml-0 mr-auto">
                {branding ? (
                    <Link href="/" passHref>
                        <a className="text-white">
                            <Banner height="50px" width="180px" fill="white" />
                        </a>
                    </Link>
                ) : null}
            </div>
            <div className="ml-auto mr-0">{authWidget ? <AuthWidget /> : null}</div>
        </header>
    );
}
