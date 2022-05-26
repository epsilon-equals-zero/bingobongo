/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "hsl(101, 72%, 33%)",
                "background-darker": "hsl(101, 72%, 28%)",
            },
            fontFamily: {
                sans: [
                    "Source Sans Pro",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "Segoe UI",
                    "Roboto",
                    "Arial",
                    "sans-serif",
                ],
                title: ["Righteous", "sans-serif"],
            },
        },
    },
    plugins: [],
};
