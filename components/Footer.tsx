"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#0E0F12] text-white">
            <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
                    <div>
                        <div className="text-brand-orange text-xs font-semibold uppercase tracking-[0.28em]">
                            Company
                        </div>

                        <div className="mt-6 space-y-4 text-base text-white/70 md:text-lg">
                            <Link
                                href="/about"
                                className="block transition-colors duration-300 hover:text-white"
                            >
                                About Us
                            </Link>

                            <Link
                                href="/process"
                                className="block transition-colors duration-300 hover:text-white"
                            >
                                Our Process
                            </Link>

                            <Link
                                href="/contact"
                                className="block transition-colors duration-300 hover:text-white"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:block" />

                    <div>
                        <div className="text-brand-orange text-xs font-semibold uppercase tracking-[0.28em]">
                            Contact
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-brand-orange px-6 py-3 text-center font-semibold text-white transition-transform duration-300 hover:scale-[1.03] sm:w-auto"
                            >
                                Project Discovery
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/40 md:mt-20 md:pt-10">
                    © {new Date().getFullYear()} SpaceLift Studio. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
