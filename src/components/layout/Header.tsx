import getConfig from "next/config";

import { AuthBox } from "../auth/AuthBox";

// import Image from "next/image";

export interface HeaderProps {
    showAuthBox: boolean;
}

const { publicRuntimeConfig: config } = getConfig();

export function Header({ showAuthBox = true }: HeaderProps) {
    return (
        <div>
            <p>{config?.title}</p>
            <p>v{config?.version}</p>
            <p>{config?.description}</p>
        </div>
    );
}
