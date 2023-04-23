import getConfig from "next/config";
import Link from "next/link";
import { FaGithub as GithubIcon } from "react-icons/fa";

const { publicRuntimeConfig: config } = getConfig();

export function Footer() {
    return (
        <footer className="bg-neutral-900 py-4 px-4 w-full mx-auto grid grid-cols-3 select-none text-sm">
            <p className="text-left">
                Copyright &copy; {new Date().getFullYear()} {config.copyright.join(", ")}
            </p>
            <p className="text-center">
                <Link href="/terms">
                    <a tabIndex={-1}>Terms</a>
                </Link>
                <span className="mx-2">&middot;</span>
                <Link href="/privacy">
                    <a tabIndex={-1}>Privacy</a>
                </Link>
            </p>
            <p className="flex flex-row justify-end">
                <a
                    className="block text-xl opacity-60 hover:opacity-100"
                    href={config?.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={-1}
                >
                    <GithubIcon />
                </a>
            </p>
        </footer>
    );
}
