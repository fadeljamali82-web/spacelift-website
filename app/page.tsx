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
        eyebrow: "DIGITAL SURFACE MANUFACTURING",
        title: "We Build the Physical Layer of Branded Environments.",
        body:
            "SpaceLift Studio translates spatial ambition into engineered physical execution. We help brands, venues, and project teams create environments that feel intentional, unified, and built with authority through digitally manufactured surfaces, disciplined material thinking, and project-ready production.",
        images: [
            "/images/hero.png",
            "/images/home-hero-structure.png",
            "/images/industries-corporate.png",
        ],
        alt: "Architectural branded environment with structural clarity and premium lighting",
        theme: "light",
    },
    {
        id: "fragmentation",
        eyebrow: "THE REAL PROBLEM",
        title: "Most Spaces Do Not Break at Once. They Fall Apart in Pieces.",
        body:
            "The issue is rarely one dramatic failure. It is visual fragmentation: mismatched surfaces, inconsistent finish quality, weak transitions, disconnected graphic systems, and materials that stop speaking the same language. The space may be expensive, but it no longer feels resolved.",
        images: [
            "/images/home-problem-fragmentation.png",
            "/images/trust-wall.png",
            "/images/industries-sports.png",
        ],
        alt: "Fragmented premium environment showing disconnection and material inconsistency",
        theme: "dark",
    },
    {
        id: "material-control",
        eyebrow: "MATERIAL CONTROL",
        title: "The Surface Is Never Superficial. It Is Where Perception Becomes Real.",
        body:
            "Every environment is judged first through what it reveals on the surface: texture, light response, tonal discipline, finish quality, edge behavior, and material confidence. We engineer those decisions so the result feels deliberate up close, not just impressive from a distance.",
        images: [
            "/images/home-material-control.png",
            "/images/solutions-dsm.png",
            "/images/solutions-lfp.png",
        ],
        alt: "Close-up of premium material control and refined surface system",
        theme: "light",
    },
    {
        id: "scale-distribution",
        eyebrow: "ROLL OUT WITH DISCIPLINE",
        title: "A Strong Concept Means Very Little if It Weakens at Scale.",
        body:
            "Large-format execution introduces a harsher test. Files must hold. Materials must remain stable. Finishes must stay consistent. Distribution must support real deployment. We build systems that survive replication, so authority is not lost when one environment becomes many.",
        images: [
            "/images/home-scale-distribution.png",
            "/images/facility.png",
            "/images/industries-hospitality.png",
        ],
        alt: "Scaled manufacturing and distribution environment for branded physical systems",
        theme: "dark",
    },
    {
        id: "precision-detail",
        eyebrow: "PRECISION DETAIL",
        title: "Credibility Lives in the Details People Notice Without Naming.",
        body:
            "Alignment, registration, finish continuity, edge cleanliness, tonal accuracy, and compositional balance determine whether an environment feels engineered or improvised. Those details are not decorative extras. They are the difference between a branded space and a believable one.",
        images: [
            "/images/home-precision-detail.png",
            "/images/trust-wall.png",
            "/images/solutions-lfp.png",
        ],
        alt: "Precision architectural detail with refined alignment and illuminated surface transition",
        theme: "light",
    },
    {
        id: "forward-execution",
        eyebrow: "FORWARD EXECUTION",
        title: "Fast Projects Still Need Structure.",
        body:
            "Speed without control creates expensive noise. We are built for project-based environments where teams need technical clarity, manufacturing readiness, and execution discipline working together under pressure. Momentum matters, but only when the outcome still lands with precision.",
        images: [
            "/images/home-forward-execution.png",
            "/images/industries-corporate.png",
            "/images/industries-cultural.png",
        ],
        alt: "Dark architectural corridor expressing movement, execution, and forward momentum",
        theme: "dark",
    },
    {
        id: "installation-integrity",
        eyebrow: "FINAL IMPACT",
        title: "Installation Is Where the Brand Either Lands with Authority or Slips in Public.",
        body:
            "The final environment reveals every upstream decision. If the system was resolved correctly, the space feels seamless, intentional, and inevitable. If not, compromise becomes visible immediately. We design for that final moment because installation is not the end of the process. It is the proof of it.",
        images: [
            "/images/home-installation-integrity.png",
            "/images/industries-hospitality.png",
            "/images/hero.png",
        ],
        alt: "Premium final installation environment with strong brand presence and spatial cohesion",
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
                                <span className="h-px w-8 md:w-10 bg-[#f97316]" />
                                <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] md:tracking-[0.28em] text-[#f97316]">
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
                                className={`mt-6 md:mt-8 max-w-[700px] text-[16px] leading-7 md:text-[18px] md:leading-8 lg:text-[19px] ${isDark ? "text-white/68" : "text-[#5f6672]"
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
                                        className="inline-flex min-h-[56px] w-full sm:w-auto items-center justify-center bg-[#f97316] px-6 sm:px-8 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:bg-[#ea580c] hover:shadow-[0_14px_30px_rgba(249,115,22,0.28)]"
                                    >
                                        Start Project Discussion
                                    </Link>

                                    <Link
                                        href="/solutions"
                                        className={`inline-flex min-h-[56px] w-full sm:w-auto items-center justify-center border px-6 sm:px-8 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] transition duration-300 hover:-translate-y-[2px] ${isDark
                                                ? "border-white/20 text-white hover:border-[#f97316] hover:text-[#f97316]"
                                                : "border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white"
                                            }`}
                                    >
                                        Explore Capabilities
                                    </Link>
                                </div>
                            </Reveal>
                        )}

                        {index === sections.length - 1 && (
                            <Reveal delay={220}>
                                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
                                    <Link
                                        href="/contact"
                                        className="inline-flex min-h-[56px] w-full sm:w-auto items-center justify-center bg-[#f97316] px-6 sm:px-8 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:bg-[#ea580c] hover:shadow-[0_14px_30px_rgba(249,115,22,0.28)]"
                                    >
                                        Start Your Project
                                    </Link>

                                    <Link
                                        href="/process"
                                        className={`inline-flex min-h-[56px] w-full sm:w-auto items-center justify-center border px-6 sm:px-8 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.06em] transition duration-300 hover:-translate-y-[2px] ${isDark
                                                ? "border-white/20 text-white hover:border-[#f97316] hover:text-[#f97316]"
                                                : "border-[#f97316] text-[#f97316] hover:bg-[#f97316] hover:text-white"
                                            }`}
                                    >
                                        View Our Process
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
                                className={`group relative overflow-hidden rounded-[22px] md:rounded-[28px] border ${isDark ? "border-white/10" : "border-black/5"
                                    } bg-black/5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_32px_100px_rgba(0,0,0,0.24)]`}
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
                                    <SmartImage
                                        sources={section.images}
                                        alt={section.alt}
                                        priority={index < 2}
                                    />
                                </div>

                                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                                    <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 md:px-4 backdrop-blur-sm transition duration-500 group-hover:translate-x-1">
                                        <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em] md:tracking-[0.22em] text-white/80">
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