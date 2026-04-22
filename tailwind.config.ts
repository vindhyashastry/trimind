import type { Config } from "tailwindcss";

// NOTE: This project uses Tailwind CSS v4.
// The active configuration is in src/app/globals.css via @theme {}.
// This file is kept only for editor tooling compatibility.
const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {}
    },
    plugins: [],
};
export default config;
