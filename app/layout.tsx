import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "SpaceLift Studio | Digital Surface Manufacturing & Environmental Branding",
    description:
        "SpaceLift Studio provides technical infrastructure for high-impact branded environments at a national scale. Advanced experiential fabrication and digital surface manufacturing.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${inter.className} min-h-screen overflow-x-hidden bg-[#f6f4ef] text-[#111111] antialiased`}
            >
                <div
                    className="pointer-events-none fixed inset-0 z-[1] noise-overlay"
                    aria-hidden="true"
                />
                <div className="relative z-[2] flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}