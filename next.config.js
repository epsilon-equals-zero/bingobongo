// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("./package.json");

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        version,
        title: "bingo-builder",
        description: "",
        githubUrl: "https://github.com/yiliansource/bingo-builder",
    },
};
