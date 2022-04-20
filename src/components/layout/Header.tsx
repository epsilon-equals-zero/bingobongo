import getConfig from "next/config";

// import Image from "next/image";

const { publicRuntimeConfig: config } = getConfig();

export function Header() {
    return (
        <div>
            <p>{config?.title}</p>
            <p>v{config?.version}</p>
            <p>{config?.description}</p>
        </div>
    );
}
