// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        version,
        title: "bingobongo",
        description: "",
        githubUrl: "https://github.com/yiliansource/bingobongo",
        copyright: ["Ian Hornik", "Alexander Zach"],
    },
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
};
