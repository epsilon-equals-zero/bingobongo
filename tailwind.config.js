/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                green: "hsl(101, 72%, 33%)",
                "green-dark": "hsl(101, 72%, 28%)",
                "green-darker": "hsl(101, 72%, 23%)",
                "green-light": "hsl(101, 72%, 40%)",
                "green-lighter": "hsl(101, 72%, 90%)",
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
