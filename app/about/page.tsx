"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Reveal({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(node);
                }
            },
            { threshold: 0.14 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(28px)",
                transition: `opacity 800ms ease ${delay}ms, transform 950ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default function AboutPage() {
    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="relative overflow-hidden border-b border-black/5">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute left-[6%] top-10 h-48 w-48 rounded-full bg-[#f97316]/8 blur-3xl animate-pulse" />
                    <div className="absolute bottom-8 right-[10%] h-px w-40 bg-gradient-to-r from-transparent via-[#f97316]/40 to-transparent" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
                    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-6">
                            <Reveal>
                                <div className="mb-6 flex items-center gap-4">
                                    <span className="h-px w-10 bg-[#f97316]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                        ABOUT SPACELIFT STUDIO
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={80}>
                                <h1 className="max-w-[980px] text-[44px] font-black leading-[0.95] tracking-[-0.05em] md:text-[60px] lg:text-[84px]">
                                    Structured for Manufacturing Strength. Built for Project
                                    Clarity.
                                </h1>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="mt-8 max-w-[860px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                    SpaceLift Studio operates through a dual-structure model
                                    designed to support demanding project environments with both
                                    manufacturing capability and responsive operational
                                    coordination.
                                </p>
                            </Reveal>
                        </div>

                        <div className="lg:col-span-6">
                            <Reveal delay={140}>
                                <div className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-black/5 shadow-[0_24px_80px_rgba(0,0,0,0.12)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
                                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                                        <Image
                                            src="/images/facility.png"
                                            alt="SpaceLift Studio manufacturing facility"
                                            fill
                                            priority
                                            className="object-cover transition duration-700 group-hover:scale-[1.04]"
                                        />
                                    </div>
                                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                                    <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-sm transition duration-500 group-hover:translate-x-1">
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
                                            Manufacturing Facility
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative border-b border-black/5">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute right-[8%] top-16 h-40 w-40 rounded-full bg-[#f97316]/6 blur-3xl animate-pulse" />
                </div>

                <div className="mx-auto grid max-w-[1450px] gap-10 px-6 py-16 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-14 lg:py-24">
                    <div className="lg:col-span-7">
                        <Reveal>
                            <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_26px_70px_rgba(0,0,0,0.08)] md:p-10">
                                <div className="mb-5 flex items-center gap-4">
                                    <span className="h-px w-10 bg-[#f97316]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                        OPERATING MODEL
                                    </span>
                                </div>

                                <div className="space-y-6 text-[17px] leading-8 text-[#434a56] md:text-[18px]">
                                    <p>
                                        Our production facility is based in{" "}
                                        <strong>Kayseri, Turkey</strong>, where digital surface
                                        manufacturing, material output, and fabrication execution
                                        are carried out with precision and consistency.
                                    </p>

                                    <p>
                                        Our <strong>U.S. operations office</strong> supports
                                        logistics, administration, client communication, and project
                                        coordination for North American work. This structure allows
                                        us to pair manufacturing strength with organized operational
                                        support, creating a smoother experience for clients managing
                                        complex branded environments.
                                    </p>

                                    <p>
                                        We are built for projects that require more than visual
                                        ideas alone. We support the physical execution of spaces
                                        through disciplined production, material control, and
                                        coordinated delivery.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-5">
                        <Reveal delay={100}>
                            <div className="rounded-[28px] bg-[#0c0f14] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_30px_90px_rgba(0,0,0,0.24)] md:p-10">
                                <div className="mb-5 flex items-center gap-4">
                                    <span className="h-px w-10 bg-[#f97316]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                        LOCATION STRUCTURE
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-6 transition duration-500 hover:border-[#f97316]/40 hover:bg-white/[0.07]">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f97316]">
                                            Manufacturing
                                        </p>
                                        <p className="mt-3 text-[28px] font-black leading-tight tracking-[-0.03em]">
                                            Kayseri, Turkey
                                        </p>
                                        <p className="mt-3 text-[15px] leading-7 text-white/70">
                                            Digital surface manufacturing, material output, and
                                            fabrication execution.
                                        </p>
                                    </div>

                                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-6 transition duration-500 hover:border-[#f97316]/40 hover:bg-white/[0.07]">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f97316]">
                                            U.S. Operations
                                        </p>
                                        <p className="mt-3 text-[28px] font-black leading-tight tracking-[-0.03em]">
                                            Logistics, Administration, and Project Coordination
                                        </p>
                                        <p className="mt-3 text-[15px] leading-7 text-white/70">
                                            Client communication, administrative support, logistics
                                            coordination, and North American project handling.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute bottom-10 left-[10%] h-px w-48 bg-gradient-to-r from-transparent via-[#f97316]/40 to-transparent" />
                    <div className="absolute right-[12%] top-10 h-44 w-44 rounded-full bg-[#f97316]/5 blur-3xl animate-pulse" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 lg:px-14 lg:py-24">
                    <div className="max-w-[950px]">
                        <Reveal>
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#f97316]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                    WHAT WE SUPPORT
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h2 className="text-[36px] font-black leading-[0.98] tracking-[-0.04em] md:text-[52px] lg:text-[64px]">
                                Manufacturing capability with operational control where it
                                matters.
                            </h2>
                        </Reveal>

                        <Reveal delay={150}>
                            <p className="mt-8 max-w-[860px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                SpaceLift Studio is designed to support branded environments
                                that require precision, consistency, and organized execution
                                across multiple moving parts. Our model is not built around
                                visual presentation alone. It is built around the physical
                                reality of delivering surfaces, finishes, and project
                                coordination with more structure and less friction.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}