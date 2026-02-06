import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ink: {
                    pink: "#F7C1D9",
                    blush: "#E88DB3",
                    purple: "#B39DDB",
                    neutral: "#FFF8FB",
                    text: "#2B2B2B",
                    primary: "#F7C1D9",      // Alias for easy use
                    secondary: "#E88DB3",    // Alias for easy use
                },
            },
            fontFamily: {
                heading: ["var(--font-playfair)", "serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "soft-gradient": "linear-gradient(135deg, #FFF8FB 0%, #F7C1D9 100%)",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
