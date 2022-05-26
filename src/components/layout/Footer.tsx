import getConfig from "next/config";
import Link from "next/link";
import { FaGithub as GithubIcon } from "react-icons/fa";

const { publicRuntimeConfig: config } = getConfig();

export function FooterContent() {
    return (
        <>
            <p className="text-left">
                Copyright &copy; {new Date().getFullYear()} {config.copyright.join(", ")}
            </p>
            <p className="text-center">
                <Link href="/terms">Terms</Link>
                <span className="mx-2">|</span>
                <Link href="/privacy">Privacy</Link>
            </p>
            <p className="flex flex-row justify-end">
                <a
                    className="block text-xl opacity-60 hover:opacity-100"
                    href={config?.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    <GithubIcon />
                </a>
            </p>
        </>
    );
}

export function Footer() {
    return (
        <footer className="py-4 px-4 max-w-5xl w-full mx-auto grid grid-cols-3 select-none text-sm opacity-50">
            <FooterContent />
        </footer>
    );
}
