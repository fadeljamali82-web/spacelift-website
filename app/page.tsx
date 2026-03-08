"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SectionType = {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    images: string[];
    alt: string;
    theme: "light" | "dark";
};

const sections: SectionType[] = [
    {
        id: "hero",
        eyebrow: "MULTI-SURFACE ENVIRONMENT DELIVERY",
        title: "The One-Stop Partner for Branded Physical Environments.",
        body:
            "SpaceLift Studio helps brands, venues, hospitality groups, and project teams turn complex environment needs into coordinated physical outcomes. We combine design-aware execution, manufacturing depth, logistics clarity, and rollout discipline so the final space feels intentional, unified, and built with authority.",
        images: [
            "/images/hero.png",
            "/images/projects-riyadh-exhibitions.png",
            "/images/industries-corporate.png",
        ],
        alt: "Premium branded environment showing coordinated physical execution at scale",
        theme: "light",
    },
    {
        id: "fragmentation",
        eyebrow: "THE REAL PROBLEM",
        title: "Most Environment Problems Start with Fragmentation, Not Failure.",
        body:
            "What weakens a space is usually not one dramatic mistake. It is a chain of smaller breakdowns: disconnected vendors, mismatched surfaces, drifting finish quality, weak transitions, and execution teams working without one clear standard. The result may still be expensive, but it no longer feels resolved.",
        images: [
            "/images/home-problem-fragmentation.png",
            "/images/trust-wall.png",
            "/images/industries-sports.png",
        ],
        alt: "Fragmented premium environment showing inconsistent surfaces and visual disconnect",
        theme: "dark",
    },
    {
        id: "material-control",
        eyebrow: "MATERIAL CONTROL",
        title: "The Surface Is Where Brand Perception Stops Being Abstract.",
        body:
            "People judge environments through what they can actually see and feel: texture, tonal discipline, edge quality, finish consistency, and how confidently materials behave under real light. We engineer those decisions carefully so the work holds up both visually and physically, not just in concept.",
        images: [
            "/images/home-material-control.png",
            "/images/solutions-dsm.png",
            "/images/solutions-lfp.png",
        ],
        alt: "Close-up of premium material quality and controlled surface execution",
        theme: "light",
    },
    {
        id: "scale-distribution",
        eyebrow: "ROLL OUT WITH DISCIPLINE",
        title: "A Strong Idea Is Not Enough. It Has to Survive Scale.",
        body:
            "The real test begins when a concept has to move through production, packaging, shipping, sequencing, and deployment without losing clarity. Files must hold. Materials must stay stable. Finishes must remain consistent. The system has to arrive ready for real-world execution, not just presentation.",
        images: [
            "/images/home-scale-distribution.png",
            "/images/facility.png",
            "/images/projects-hawana-salalah.png",
        ],
        alt: "Large-scale production and distribution environment supporting rollout discipline",
        theme: "dark",
    },
    {
        id: "precision-detail",
        eyebrow: "PRECISION DETAIL",
        title: "Credibility Lives in the Details Buyers Notice Immediately.",
        body:
            "Alignment, registration, edge cleanliness, finish continuity, tonal accuracy, and compositional balance all shape whether an environment feels engineered or improvised. Those details are not decorative extras. They are the signals that tell people whether the brand was executed with control.",
        images: [
            "/images/home-precision-detail.png",
            "/images/trust-wall.png",
            "/images/solutions-lfp.png",
        ],
        alt: "Precision detail showing finish quality, edge control, and premium alignment",
        theme: "light",
    },
    {
        id: "forward-execution",
        eyebrow: "FORWARD EXECUTION",
        title: "Speed Matters. Structure Matters More.",
        body:
            "Fast-moving projects do not fail because momentum exists. They fail when momentum outruns coordination. SpaceLift is built for environments where technical clarity, production readiness, and execution discipline need to move together under pressure without creating expensive noise downstream.",
        images: [
            "/images/home-forward-execution.png",
            "/images/projects-dubai-silicon.png",
            "/images/industries-cultural.png",
        ],
        alt: "Dark corridor expressing disciplined execution, movement, and structured momentum",
        theme: "dark",
    },
    {
        id: "installation-integrity",
        eyebrow: "FINAL IMPACT",
        title: "Installation Is Where Strategy Becomes Public.",
        body:
            "The finished environment reveals whether every upstream decision was resolved correctly. When the system is right, the outcome feels seamless, intentional, and inevitable. When it is not, compromise becomes visible immediately. That is why we design for the final moment, not just the production phase before it.",
        images: [
            "/images/home-installation-integrity.png",
            "/images/projects-vakko.png",
            "/images/hero.png",
        ],
        alt: "Installed premium branded environment with strong finish quality and delivery cohesion",
        theme: "light",
    },
];

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
            { threshold: 0.18 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(34px)",
                transition: `opacity 700ms ease ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function SmartImage({
    sources,
    alt,
    priority = false,
}: {
    sources: string[];
    alt: string;
    priority?: boolean;
}) {
    const [index, setIndex] = useState(0);

    return (
        <img
            src={sources[index]}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onError={() => {
                if (index < sources.length - 1) setIndex(index + 1);
            }}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />
    );
}

function SectionBlock({
    section,
    index,
}: {
    section: SectionType;
    index: number;
}) {
    const isDark = section.theme === "dark";
    const reverse = index % 2 === 1;

    return (
        <section
            className={`relative overflow-hidden ${isDark ? "bg-[#0c0f14] text-white" : "bg-[#f6f4ef] text-[#111111]"
                }`}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className={`absolute -top-20 ${reverse ? "right-[8%]" : "left-[8%]"
                        } h-40 w-40 rounded-full blur-3xl md:h-56 md:w-56 ${isDark ? "bg-[#f97316]/10" : "bg-[#f97316]/8"
                        } animate-pulse`}
                />
                <div
                    className={`absolute bottom-10 ${reverse ? "left-[10%]" : "right-[10%]"
                        } h-[1px] w-24 md:w-40 bg-gradient-to-r from-transparent via-[#f97316]/50 to-transparent`}
                />
            </div>

            <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-28 xl:py-32">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <div
                        className={`lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"
                            }`}
                    >
                        <Reveal>
                            <div className="mb-5 flex items-center gap-4 md:mb-6">
                                <span className="h-px w-8 bg-[#f97316] md:w-10" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                    {section.eyebrow}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h2
                                className={`max-w-[760px] text-[38px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[46px] md:text-[56px] lg:text-[62px] xl:text-[76px] ${isDark ? "text-white" : "text-[#111111]"
                                    }`}
                            >
                                {section.title}
                            </h2>
                        </Reveal>

                        <Reveal delay={140}>
                            <p
                                className={`mt-6 max-w-[700px] text-[16px] leading-7 md:mt-8 md:text-[18px] md:leading-8 lg:text-[19px] ${isDark ? "text-white/70" : "text-[#5f6672]"
                                    }`}
                            >
                                {section.body}
                            </p>
                        </Reveal>

                        {index === 0 && (
                            <Reveal delay={220}>
                                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
                                    <Link
                                        href="/contact"
                                        className="inline-flex min-h-[56px] w-full items-center justify-center bg-[#f97316] px-6 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:bg-[#ea580c] hover:shadow-[0_14px_30px_rgba(249,115,22,0.28)] sm:w-auto sm:px-8 sm:text-[13px]"
                                    >
                                        Start a Project Review
                                    </Link>

                                    <Link
                                        href="/solutions"
                                        className={`inline-flex min-h-[56px] w-full items-center justify-center border px-6 text-[12px] font-bold uppercase tracking-[0.06em] transition duration-300 hover:-translate-y-[2px] sm:w-auto sm:px-8 sm:text-[13px] ${isDark
                                                ? "border-white/20 text-white hover:border-[#f97316] hover:text-[#f97316]"
                                                : "border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white"
                                            }`}
                                    >
                                        Explore Our System
                                    </Link>
                                </div>
                            </Reveal>
                        )}

                        {index === sections.length - 1 && (
                            <Reveal delay={220}>
                                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
                                    <Link
                                        href="/contact"
                                        className="inline-flex min-h-[56px] w-full items-center justify-center bg-[#f97316] px-6 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:bg-[#ea580c] hover:shadow-[0_14px_30px_rgba(249,115,22,0.28)] sm:w-auto sm:px-8 sm:text-[13px]"
                                    >
                                        Start Your Project
                                    </Link>

                                    <Link
                                        href="/process"
                                        className={`inline-flex min-h-[56px] w-full items-center justify-center border px-6 text-[12px] font-bold uppercase tracking-[0.06em] transition duration-300 hover:-translate-y-[2px] sm:w-auto sm:px-8 sm:text-[13px] ${isDark
                                                ? "border-white/20 text-white hover:border-[#f97316] hover:text-[#f97316]"
                                                : "border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white"
                                            }`}
                                    >
                                        View Delivery Model
                                    </Link>
                                </div>
                            </Reveal>
                        )}
                    </div>

                    <div
                        className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"
                            }`}
                    >
                        <Reveal delay={120}>
                            <div
                                className={`group relative overflow-hidden rounded-[22px] border bg-black/5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_32px_100px_rgba(0,0,0,0.24)] md:rounded-[28px] ${isDark ? "border-white/10" : "border-black/5"
                                    }`}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                                    <SmartImage
                                        sources={section.images}
                                        alt={section.alt}
                                        priority={index < 2}
                                    />
                                </div>

                                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                                    <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-sm transition duration-500 group-hover:translate-x-1 md:px-4">
                                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80 md:text-[10px] md:tracking-[0.22em]">
                                            Section {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute right-0 top-0 h-full w-[24%] bg-gradient-to-l from-[#f97316]/8 to-transparent opacity-60 transition duration-500 group-hover:opacity-90" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function HomePage() {
    return (
        <main className="bg-[#f6f4ef]">
            {sections.map((section, index) => (
                <SectionBlock key={section.id} section={section} index={index} />
            ))}
        </main>
    );
}