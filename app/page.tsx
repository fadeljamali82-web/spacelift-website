"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SectionType = {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    bullets?: string[];
    images: string[];
    alt: string;
    theme: "light" | "dark";
};

const sections: SectionType[] = [
    {
        id: "hero",
        eyebrow: "MULTI-SURFACE ENVIRONMENT DELIVERY",
        title: "The Premium One-Stop Partner for Complex Physical Environments.",
        body:
            "SpaceLift Studio helps brands, venues, hospitality groups, and project teams turn fragmented environment challenges into coordinated physical outcomes. We combine strategic consultation, design-aware technical translation, controlled manufacturing, logistics clarity, and install-ready delivery so the final space feels unified, credible, and built with authority.",
        bullets: [
            "One accountable partner across execution stages",
            "Design-aware translation from concept to physical reality",
            "Controlled manufacturing and premium finish discipline",
            "Rollout clarity for demanding real-world environments",
        ],
        images: [
            "/images/hero.png",
            "/images/projects-riyadh-exhibitions.png",
            "/images/industries-corporate.png",
        ],
        alt: "Premium branded physical environment showing coordinated execution and architectural quality",
        theme: "light",
    },
    {
        id: "fragmentation",
        eyebrow: "THE REAL PROBLEM",
        title: "Most Environment Failures Begin Long Before Installation.",
        body:
            "The breakdown is rarely one dramatic event. It starts earlier, through disconnected vendors, mismatched surfaces, weak transitions, drifting finish quality, unclear approvals, and execution teams working without one unified standard. The project may still get completed, but it no longer feels fully resolved.",
        bullets: [
            "Too many handoffs dilute accountability",
            "Disconnected vendors create quality drift",
            "Weak coordination increases risk at scale",
            "Compromise becomes visible in the final environment",
        ],
        images: [
            "/images/home-problem-fragmentation.png",
            "/images/trust-wall.png",
            "/images/industries-sports.png",
        ],
        alt: "Fragmented premium environment showing visual inconsistency and unresolved material transitions",
        theme: "dark",
    },
    {
        id: "material-control",
        eyebrow: "MATERIAL CONTROL",
        title: "The Surface Is Where Perception Becomes Physical.",
        body:
            "A branded environment is judged through what it reveals up close: texture, tonal discipline, edge behavior, finish continuity, and material confidence under real light. We treat those decisions as strategic, not decorative, because surface quality is one of the first places credibility is either reinforced or lost.",
        bullets: [
            "Material selection guided by real application logic",
            "Finish quality built for visual and physical performance",
            "Closer control over alignment, edge behavior, and tone",
            "Premium outcomes that hold up beyond first impressions",
        ],
        images: [
            "/images/home-material-control.png",
            "/images/solutions-dsm.png",
            "/images/solutions-lfp.png",
        ],
        alt: "Close-up of premium material control and refined production detail",
        theme: "light",
    },
    {
        id: "quality-assurance",
        eyebrow: "QUALITY ASSURANCE",
        title: "Premium Work Depends on Control, Not Assumption.",
        body:
            "Quality is not a final check added at the end. It must be built into the way files are prepared, materials are selected, finishes are reviewed, packaging is sequenced, and delivery is coordinated. Our system is designed to reduce avoidable errors before they become visible in the finished space.",
        bullets: [
            "Technical review before production commitment",
            "Finish and consistency discipline during execution",
            "Install-ready packaging and sequencing logic",
            "Reduced downstream rework and fewer public compromises",
        ],
        images: [
            "/images/facility.png",
            "/images/solutions-dsm.png",
            "/images/projects-vakko.png",
        ],
        alt: "Production and quality assurance environment supporting controlled execution",
        theme: "dark",
    },
    {
        id: "scale-distribution",
        eyebrow: "ROLL OUT WITH DISCIPLINE",
        title: "A Strong Concept Has to Survive Scale, Shipping, and Deployment.",
        body:
            "The real test starts when a project moves beyond ideas and into manufacturing, packaging, logistics, and rollout. Files must hold. Materials must remain stable. Delivery must stay organized. The system has to arrive ready for execution in the field, not just approval in a presentation.",
        bullets: [
            "Install-ready systems instead of disconnected output",
            "Packaging and sequencing that support deployment",
            "More structure across logistics and phased delivery",
            "Scalable execution without losing finish consistency",
        ],
        images: [
            "/images/home-scale-distribution.png",
            "/images/facility.png",
            "/images/projects-hawana-salalah.png",
        ],
        alt: "Scaled production and distribution environment showing rollout discipline",
        theme: "light",
    },
    {
        id: "precision-detail",
        eyebrow: "PRECISION DETAIL",
        title: "Credibility Lives in the Details Buyers Notice Immediately.",
        body:
            "Alignment, registration, edge cleanliness, tonal accuracy, finish continuity, and compositional balance all shape whether a space feels engineered or improvised. These details are not extras. They are the signals that tell people whether the brand was executed with care, discipline, and control.",
        bullets: [
            "Precision strengthens premium perception",
            "Refined detailing reduces visual noise",
            "Consistency creates trust across environments",
            "Execution quality becomes visible without explanation",
        ],
        images: [
            "/images/home-precision-detail.png",
            "/images/trust-wall.png",
            "/images/solutions-lfp.png",
        ],
        alt: "Precision architectural detail showing premium finish and alignment control",
        theme: "dark",
    },
    {
        id: "forward-execution",
        eyebrow: "FORWARD EXECUTION",
        title: "Fast Projects Still Need Structure, Systems, and Readiness.",
        body:
            "Project pressure does not excuse weak coordination. In high-demand environments, speed only works when technical clarity, manufacturing readiness, logistics planning, and execution discipline move together. The goal is not simply to move faster. It is to move with fewer breakdowns.",
        bullets: [
            "Structured execution for project-based environments",
            "Readiness across production, packaging, and deployment",
            "Reduced friction under deadline pressure",
            "More confidence for teams managing real operational constraints",
        ],
        images: [
            "/images/home-forward-execution.png",
            "/images/projects-dubai-silicon.png",
            "/images/industries-cultural.png",
        ],
        alt: "Dark controlled corridor expressing speed, readiness, and execution structure",
        theme: "light",
    },
    {
        id: "final-impact",
        eyebrow: "FINAL IMPACT",
        title: "Installation Is Where the Brand Becomes Public.",
        body:
            "The final environment reveals whether upstream decisions were made with enough discipline. If the system was resolved correctly, the result feels seamless, intentional, and inevitable. If not, compromise becomes visible immediately. That is why we design around delivery quality, not just production output.",
        bullets: [
            "Final execution is treated as proof, not afterthought",
            "Better upstream coordination protects the finished result",
            "Install-readiness reduces friction in the last mile",
            "The brand lands with more authority in public-facing space",
        ],
        images: [
            "/images/home-installation-integrity.png",
            "/images/projects-vakko.png",
            "/images/hero.png",
        ],
        alt: "Installed premium branded environment with strong final execution quality",
        theme: "dark",
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
            { threshold: 0.16 }
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
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
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
    const reverse = index % 2 === 1;
    const isDark = section.theme === "dark";

    return (
        <section
            className={`relative overflow-hidden ${isDark ? "bg-[#0c0f14] text-white" : "bg-[#f6f4ef] text-[#111111]"
                }`}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className={`absolute -top-20 ${reverse ? "right-[8%]" : "left-[8%]"
                        } h-44 w-44 rounded-full blur-3xl md:h-56 md:w-56 ${isDark ? "bg-[#f97316]/10" : "bg-[#f97316]/8"
                        } animate-pulse`}
                />
                <div
                    className={`absolute bottom-10 ${reverse ? "left-[10%]" : "right-[10%]"
                        } h-[1px] w-24 md:w-40 bg-gradient-to-r from-transparent via-[#f97316]/50 to-transparent`}
                />
            </div>

            <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:py-28">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <div
                        className={`lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"}`}
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
                                className={`max-w-[760px] text-[38px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[46px] md:text-[56px] lg:text-[62px] xl:text-[74px] ${isDark ? "text-white" : "text-[#111111]"
                                    }`}
                            >
                                {section.title}
                            </h2>
                        </Reveal>

                        <Reveal delay={140}>
                            <p
                                className={`mt-6 max-w-[720px] text-[16px] leading-7 md:mt-8 md:text-[18px] md:leading-8 lg:text-[19px] ${isDark ? "text-white/70" : "text-[#5f6672]"
                                    }`}
                            >
                                {section.body}
                            </p>
                        </Reveal>

                        {section.bullets && (
                            <Reveal delay={200}>
                                <ul className="mt-8 space-y-4 md:mt-10">
                                    {section.bullets.map((point, i) => (
                                        <li
                                            key={i}
                                            className={`flex items-start gap-3 text-[14px] leading-6 md:text-[15px] md:leading-7 ${isDark ? "text-white/78" : "text-[#3f4650]"
                                                }`}
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        )}

                        {index === 0 && (
                            <Reveal delay={240}>
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
                                        Explore Our Solutions
                                    </Link>
                                </div>
                            </Reveal>
                        )}

                        {index === sections.length - 1 && (
                            <Reveal delay={240}>
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
                        className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"}`}
                    >
                        <Reveal delay={120}>
                            <div
                                className={`group relative overflow-hidden rounded-[22px] border bg-black/5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_32px_100px_rgba(0,0,0,0.24)] md:rounded-[28px] ${isDark ? "border-white/10" : "border-black/5"
                                    }`}
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
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="mx-auto max-w-[1450px] px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20 lg:px-14 lg:pb-20 lg:pt-24">
                <Reveal>
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-[#f97316] md:w-10" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                            WHY SPACELIFT
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <div className="grid gap-5 rounded-[24px] border border-black/5 bg-white/55 p-5 backdrop-blur-sm md:grid-cols-3 md:gap-6 md:p-7">
                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                ONE-STOP
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                One accountable partner across consultation, translation,
                                production, logistics, and delivery readiness.
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                QUALITY
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                Premium finish control, material discipline, and stronger visual
                                consistency across demanding environments.
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                READINESS
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                Systems built for real deployment, with more structure across
                                packaging, sequencing, rollout, and installation support.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </section>

            {sections.map((section, index) => (
                <SectionBlock key={section.id} section={section} index={index} />
            ))}
        </main>
    );
}