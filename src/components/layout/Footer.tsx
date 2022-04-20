import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

export function Footer() {
    return (
        <footer>
            <div>
                <p>Copyright &copy; {new Date().getFullYear()} Ian Hornik, Alexander Zach</p>
                <p>
                    <a href={config?.githubUrl} target="_blank" rel="noreferrer">
                        {/* <GithubIcon /> */}
                    </a>
                </p>
            </div>
        </footer>
    );
}
