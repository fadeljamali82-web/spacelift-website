"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SolutionType = {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    image: string;
    alt: string;
    theme: "light" | "dark";
};

const solutions: SolutionType[] = [
    {
        id: "consultation",
        eyebrow: "STRATEGIC CONSULTATION",
        title: "We clarify the execution path before production begins.",
        body:
            "The strongest environment work usually starts before anything is printed, fabricated, or shipped. We help define the right surface strategy, material direction, execution logic, and rollout approach so the project starts with more clarity and fewer downstream compromises.",
        bullets: [
            "Surface and environment planning",
            "Material and application guidance",
            "Technical feasibility direction",
            "Rollout logic and execution planning",
        ],
        image: "/images/solutions-dsm.png",
        alt: "Strategic consultation and surface planning for premium branded environments",
        theme: "light",
    },
    {
        id: "translation",
        eyebrow: "DESIGN TRANSLATION",
        title: "We translate design intent into manufacturable physical systems.",
        body:
            "A strong concept still has to survive scale, material behavior, finish control, dimensional reality, and installation pressure. We bridge that gap by converting creative intent into production-ready, install-aware systems that hold their authority in the real world.",
        bullets: [
            "Design-to-manufacturing adaptation",
            "Execution-ready file and spec alignment",
            "Material-aware layout preparation",
            "Install sequence and application logic",
        ],
        image: "/images/solutions-exfab.png",
        alt: "Design and technical translation for physical environment delivery",
        theme: "dark",
    },
    {
        id: "manufacturing",
        eyebrow: "PRODUCTION EXECUTION",
        title: "We manufacture with finish discipline, not just output capacity.",
        body:
            "SpaceLift is built around controlled execution. Our production approach is designed to support premium multi-surface environments through strong finish standards, physical consistency, and systems that are prepared for real deployment rather than presentation alone.",
        bullets: [
            "Digital surface manufacturing",
            "Architectural-grade visual output",
            "Precision finishing and quality control",
            "Install-ready modular production systems",
        ],
        image: "/images/solutions-lfp.png",
        alt: "Manufacturing execution for premium multi-surface environment systems",
        theme: "light",
    },
    {
        id: "rollout",
        eyebrow: "ROLL OUT SUPPORT",
        title: "We coordinate the final delivery so the environment lands correctly.",
        body:
            "The project is not complete when production ends. It is complete when packaging, sequencing, shipping, and installation all support a clean final result. We help reduce that friction by coordinating the delivery logic around the environment, not around disconnected vendors.",
        bullets: [
            "Packaging and sequencing logic",
            "Direct-to-site coordination",
            "Install partner support",
            "Phased rollout and deployment clarity",
        ],
        image: "/images/trust-wall.png",
        alt: "Rollout, logistics, and install coordination for branded physical environments",
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
            { threshold: 0.15 }
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

function SolutionBlock({
    solution,
    index,
}: {
    solution: SolutionType;
    index: number;
}) {
    const reverse = index % 2 === 1;
    const isDark = solution.theme === "dark";

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
                                    {solution.eyebrow}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h2
                                className={`max-w-[760px] text-[38px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[46px] md:text-[56px] lg:text-[62px] xl:text-[74px] ${isDark ? "text-white" : "text-[#111111]"
                                    }`}
                            >
                                {solution.title}
                            </h2>
                        </Reveal>

                        <Reveal delay={140}>
                            <p
                                className={`mt-6 max-w-[720px] text-[16px] leading-7 md:mt-8 md:text-[18px] md:leading-8 lg:text-[19px] ${isDark ? "text-white/70" : "text-[#5f6672]"
                                    }`}
                            >
                                {solution.body}
                            </p>
                        </Reveal>

                        <Reveal delay={200}>
                            <ul className="mt-8 space-y-4 md:mt-10">
                                {solution.bullets.map((point, i) => (
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
                                    <img
                                        src={solution.image}
                                        alt={solution.alt}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                        loading={index < 2 ? "eager" : "lazy"}
                                    />
                                </div>

                                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                                    <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-sm transition duration-500 group-hover:translate-x-1 md:px-4">
                                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80 md:text-[10px] md:tracking-[0.22em]">
                                            Solution {String(index + 1).padStart(2, "0")}
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

export default function SolutionsPage() {
    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="mx-auto max-w-[1450px] px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20 lg:px-14 lg:pb-20 lg:pt-24">
                <Reveal>
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-[#f97316] md:w-10" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                            SOLUTIONS
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <h1 className="max-w-[1120px] text-[40px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:text-[60px] lg:text-[78px]">
                        A Premium Delivery System for Complex Physical Environments.
                    </h1>
                </Reveal>

                <Reveal delay={140}>
                    <p className="mt-6 max-w-[880px] text-[16px] leading-7 text-[#5f6672] md:mt-8 md:text-[18px] md:leading-8 lg:text-[20px]">
                        SpaceLift Studio is structured to reduce fragmentation across
                        design, production, logistics, and rollout. Our solution model is
                        built for buyers who need stronger execution control, cleaner
                        coordination, and a more accountable path from concept to installed
                        environment.
                    </p>
                </Reveal>

                <Reveal delay={200}>
                    <div className="mt-10 grid gap-4 rounded-[24px] border border-black/5 bg-white/55 p-5 backdrop-blur-sm md:mt-12 md:grid-cols-3 md:gap-6 md:p-7">
                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                ONE-STOP
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                One accountable partner across strategy, translation, production,
                                and rollout.
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                MULTI-SURFACE
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                Built for environments where materials, finishes, and systems
                                need to work together with consistency.
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                EXECUTION-LED
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                Designed for real deployment, not presentation alone, with more
                                structure and less downstream friction.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </section>

            {solutions.map((solution, index) => (
                <SolutionBlock key={solution.id} solution={solution} index={index} />
            ))}

            <section className="mx-auto max-w-[1450px] px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-16 lg:px-14 lg:pb-24 lg:pt-20">
                <Reveal>
                    <div className="rounded-[26px] border border-black/5 bg-white/60 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-8 lg:p-10">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                    SOLUTION MODEL
                                </div>

                                <h2 className="mt-4 max-w-[880px] text-[34px] font-black leading-[0.98] tracking-[-0.05em] sm:text-[40px] md:text-[48px] lg:text-[58px]">
                                    Built to Reduce Friction Across the Entire Delivery Chain.
                                </h2>

                                <p className="mt-5 max-w-[820px] text-[16px] leading-7 text-[#5f6672] md:text-[18px] md:leading-8">
                                    SpaceLift is not structured like a disconnected vendor stack.
                                    The system is designed to align decision-making, technical
                                    clarity, manufacturing discipline, and rollout execution under
                                    one coordinated model.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                                <Link
                                    href="/contact"
                                    className="inline-flex min-h-[56px] items-center justify-center bg-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:bg-[#ea580c] hover:shadow-[0_14px_30px_rgba(249,115,22,0.24)] sm:text-[13px]"
                                >
                                    Start a Project Review
                                </Link>

                                <Link
                                    href="/process"
                                    className="inline-flex min-h-[56px] items-center justify-center border border-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-[#f97316] transition duration-300 hover:-translate-y-[2px] hover:bg-[#f97316] hover:text-white sm:text-[13px]"
                                >
                                    View Our Process
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}