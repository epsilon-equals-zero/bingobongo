// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        version,
        title: "bingobongo",
        description: "",
        githubUrl: "https://github.com/yiliansource/bingo-builder",
    },
};
