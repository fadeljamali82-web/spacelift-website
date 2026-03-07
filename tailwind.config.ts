import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./sections/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.{js,ts,jsx,tsx,mdx}",
        "./styles/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: "#FF6B00",
                    amber: "#FFB800",
                    yellow: "#FFD600",
                    dark: "#1A1A1A",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(12px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "slide-up": "slideUp 0.6s ease-out forwards",
                marquee: "marquee 25s linear infinite",
            },
            boxShadow: {
                soft: "0 10px 30px rgba(0,0,0,0.08)",
            },
        },
    },
    plugins: [],
};

export default config;