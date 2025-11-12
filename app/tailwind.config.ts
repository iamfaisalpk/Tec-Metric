import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0064FF",
                secondary: "#D3E2FF",
                accent: "#8BB7FF",  
                formbg: "#F4F5F7",
                background: "#FAFBFC",
                sidebar: "#FFFFFF",
            },
        },
    },
    plugins: [],
};
export default config;
