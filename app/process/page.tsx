"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type StepType = {
    id: string;
    number: string;
    eyebrow: string;
    title: string;
    body: string;
    bullets: string[];
    image: string;
    alt: string;
};

const steps: StepType[] = [
    {
        id: "discovery",
        number: "01",
        eyebrow: "STRATEGIC DISCOVERY",
        title: "We start by reducing ambiguity before it becomes cost.",
        body:
            "The first stage is not about rushing into output. It is about clarifying what the environment needs to achieve, what constraints exist, what surfaces matter most, and where fragmentation is most likely to damage quality. This stage gives the project a stronger technical and commercial footing before execution begins.",
        bullets: [
            "Environment goals and application review",
            "Surface priorities and material direction",
            "Constraint mapping and execution risk awareness",
            "Clearer path before production commitment",
        ],
        image: "/images/capability-spec-driven-projects.png",
        alt: "Strategic discovery and spec-driven planning for premium environment delivery",
    },
    {
        id: "translation",
        number: "02",
        eyebrow: "DESIGN & TECHNICAL TRANSLATION",
        title: "We translate intent into systems that can actually be built correctly.",
        body:
            "A strong concept is only valuable if it survives scale, finish standards, installation reality, and operational pressure. This stage converts visual ambition into production-ready logic, aligning files, applications, material behavior, and install conditions so the work remains credible once it becomes physical.",
        bullets: [
            "Design-to-manufacturing alignment",
            "Material-aware technical preparation",
            "Execution logic built into the system early",
            "Fewer downstream compromises during rollout",
        ],
        image: "/images/capability-digital-surface-manufacturing.png",
        alt: "Technical translation and production preparation for branded environments",
    },
    {
        id: "manufacturing",
        number: "03",
        eyebrow: "CONTROLLED MANUFACTURING",
        title: "We manufacture with finish discipline, consistency, and deployment in mind.",
        body:
            "This is where the project becomes real. Production is handled with the understanding that quality is not only visual; it is dimensional, material, and operational. The focus is not just output volume. It is producing systems that hold their authority across surfaces, scale, and final use conditions.",
        bullets: [
            "Architectural-grade digital surface production",
            "Finish discipline and consistency control",
            "Material handling designed for real application",
            "Install-ready preparation instead of disconnected output",
        ],
        image: "/images/capability-color-managed-production.png",
        alt: "Controlled manufacturing and quality-driven production workflow",
    },
    {
        id: "readiness",
        number: "04",
        eyebrow: "INSTALL-READY SYSTEMS",
        title: "We prepare the work so the field does not have to solve what should have been solved upstream.",
        body:
            "Packaging, sequencing, labeling, and deployment logic matter more than most vendors admit. This stage reduces friction in the final mile by organizing output around installation and rollout reality, not around internal convenience. The result is a cleaner handoff and a more reliable final execution environment.",
        bullets: [
            "Packaging and sequencing aligned to deployment",
            "Install-ready organization and system logic",
            "Better handoff conditions for field execution",
            "Reduced friction across phases and locations",
        ],
        image: "/images/capability-install-ready-systems.png",
        alt: "Install-ready systems and deployment preparation for premium environments",
    },
    {
        id: "execution",
        number: "05",
        eyebrow: "ROLLOUT & EXECUTION",
        title: "We support the final environment so the brand lands with authority in public.",
        body:
            "The finished environment is where every upstream decision becomes visible. This stage ensures the work arrives with the coordination, readiness, and execution support required to preserve quality in the final outcome. That is why our process is built around delivery integrity, not just production completion.",
        bullets: [
            "Rollout support across real deployment conditions",
            "More accountable coordination through final execution",
            "Protection of finish quality in the public-facing result",
            "A cleaner path from strategy to installed environment",
        ],
        image: "/images/capability-single-partner-execution.png",
        alt: "Rollout execution and single-partner delivery for branded physical environments",
    },
];

function Reveal({
    children,
    delay = 0,
    y = 24,
    scale = 0.988,
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
    scale?: number;
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
                transform: visible
                    ? "translate3d(0,0,0) scale(1)"
                    : `translate3d(0,${y}px,0) scale(${scale})`,
                transition: `opacity 760ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 960ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function ProcessImage({
    src,
    alt,
    priority = false,
}: {
    src: string;
    alt: string;
    priority?: boolean;
}) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [glow, setGlow] = useState({ x: 50, y: 50 });
    const [parallaxOffset, setParallaxOffset] = useState(0);

    useEffect(() => {
        const node = cardRef.current;
        if (!node) return;

        const handleScroll = () => {
            const rect = node.getBoundingClientRect();
            const viewport = window.innerHeight || 1;
            const center = rect.top + rect.height / 2;
            const distance = center - viewport / 2;
            const normalized = Math.max(-1, Math.min(1, distance / viewport));
            setParallaxOffset(normalized * -12);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setGlow({ x, y });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMove}
            className="group premium-image-card relative overflow-hidden rounded-[22px] border border-white/10 bg-black/5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[5px] hover:shadow-[0_34px_110px_rgba(0,0,0,0.26)] md:rounded-[28px]"
        >
            <div
                className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 18%, rgba(249,115,22,0.10) 34%, transparent 58%)`,
                }}
            />
            <div className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="premium-sheen absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    className="h-[112%] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    style={{
                        transform: `translate3d(0px, ${parallaxOffset}px, 0px) scale(1.02)`,
                    }}
                />
            </div>

            <div className="pointer-events-none absolute inset-0 z-[3] ring-1 ring-inset ring-white/10" />
            <div className="absolute right-0 top-0 z-[3] h-full w-[24%] bg-gradient-to-l from-[#f97316]/10 to-transparent opacity-60 transition duration-500 group-hover:opacity-100" />
        </div>
    );
}

function StepBlock({
    step,
    index,
}: {
    step: StepType;
    index: number;
}) {
    const reverse = index % 2 === 1;

    return (
        <section className="relative overflow-hidden bg-[#0c0f14] text-white">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className={`ambient-orb absolute -top-20 ${reverse ? "right-[8%]" : "left-[8%]"
                        } h-44 w-44 rounded-full bg-[#f97316]/12 blur-3xl md:h-56 md:w-56`}
                />
                <div
                    className={`ambient-orb-delayed absolute bottom-[12%] ${reverse ? "left-[12%]" : "right-[12%]"
                        } h-28 w-28 rounded-full bg-white/[0.03] blur-3xl`}
                />
                <div
                    className={`absolute bottom-10 ${reverse ? "left-[10%]" : "right-[10%]"
                        } h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-[#f97316]/55 to-transparent`}
                />
                <div className="premium-divider-sweep absolute bottom-0 left-0 h-px w-full opacity-40" />
            </div>

            <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:py-28">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                    <div
                        className={`lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"
                            }`}
                    >
                        <Reveal>
                            <div className="mb-5 flex items-center gap-4 md:mb-6">
                                <span className="text-[34px] font-black leading-none tracking-[-0.06em] text-[#f97316] md:text-[42px]">
                                    {step.number}
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-r from-[#f97316]/70 to-transparent" />
                            </div>
                        </Reveal>

                        <Reveal delay={50}>
                            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                {step.eyebrow}
                            </div>
                        </Reveal>

                        <Reveal delay={100}>
                            <h2 className="max-w-[760px] text-[38px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[46px] md:text-[56px] lg:text-[62px] xl:text-[74px]">
                                {step.title}
                            </h2>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="mt-6 max-w-[720px] text-[16px] leading-7 text-white/70 md:mt-8 md:text-[18px] md:leading-8 lg:text-[19px]">
                                {step.body}
                            </p>
                        </Reveal>

                        <Reveal delay={230}>
                            <ul className="mt-8 space-y-4 md:mt-10">
                                {step.bullets.map((point, i) => (
                                    <li
                                        key={i}
                                        className="group flex items-start gap-3 text-[14px] leading-6 text-white/78 md:text-[15px] md:leading-7"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f97316] shadow-[0_0_14px_rgba(249,115,22,0.45)] transition-transform duration-300 group-hover:scale-125" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>

                    <div
                        className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"
                            }`}
                    >
                        <Reveal delay={120}>
                            <ProcessImage
                                src={step.image}
                                alt={step.alt}
                                priority={index < 2}
                            />
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ProcessPage() {
    return (
        <main className="bg-[#0c0f14] text-white">
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="ambient-orb absolute left-[8%] top-[12%] h-56 w-56 rounded-full bg-[#f97316]/12 blur-3xl md:h-72 md:w-72" />
                    <div className="ambient-orb-delayed absolute bottom-[12%] right-[10%] h-32 w-32 rounded-full bg-white/[0.03] blur-3xl md:h-40 md:w-40" />
                    <div className="premium-divider-sweep absolute bottom-0 left-0 h-px w-full opacity-40" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20 lg:px-14 lg:pb-20 lg:pt-24">
                    <Reveal>
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-px w-8 bg-[#f97316] md:w-10" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                PROCESS
                            </span>
                        </div>
                    </Reveal>

                    <Reveal delay={80}>
                        <h1 className="max-w-[1180px] text-[40px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:text-[60px] lg:text-[78px]">
                            A Delivery System Built to Reduce Friction, Protect Quality, and
                            Hold Up in the Real World.
                        </h1>
                    </Reveal>

                    <Reveal delay={150}>
                        <p className="mt-6 max-w-[920px] text-[16px] leading-7 text-white/70 md:mt-8 md:text-[18px] md:leading-8 lg:text-[20px]">
                            Our process exists to do more than move a project forward. It is
                            built to reduce ambiguity, protect finish quality, align
                            execution, and create a more accountable path from strategy to
                            installed environment. This is how SpaceLift turns complex
                            physical requirements into more controlled outcomes.
                        </p>
                    </Reveal>

                    <Reveal delay={220}>
                        <div className="premium-intro-panel mt-10 grid gap-5 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm md:mt-12 md:grid-cols-4 md:gap-6 md:p-7">
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    CLARITY
                                </div>
                                <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px] md:leading-7">
                                    We define the path before complexity becomes rework.
                                </p>
                            </div>

                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    CONTROL
                                </div>
                                <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px] md:leading-7">
                                    Technical translation and manufacturing discipline stay aligned.
                                </p>
                            </div>

                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    READINESS
                                </div>
                                <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px] md:leading-7">
                                    Output is organized for deployment, not just production completion.
                                </p>
                            </div>

                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    DELIVERY
                                </div>
                                <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px] md:leading-7">
                                    The final environment is treated as proof of the whole system.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {steps.map((step, index) => (
                <StepBlock key={step.id} step={step} index={index} />
            ))}

            <section className="mx-auto max-w-[1450px] px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-16 lg:px-14 lg:pb-24 lg:pt-20">
                <Reveal>
                    <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-sm md:p-8 lg:p-10">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                    WHY IT WORKS
                                </div>

                                <h2 className="mt-4 max-w-[900px] text-[34px] font-black leading-[0.98] tracking-[-0.05em] sm:text-[40px] md:text-[48px] lg:text-[58px]">
                                    The process is the product when execution quality actually matters.
                                </h2>

                                <p className="mt-5 max-w-[840px] text-[16px] leading-7 text-white/70 md:text-[18px] md:leading-8">
                                    Most breakdowns are process breakdowns first. That is why
                                    SpaceLift is structured around clarity, translation, control,
                                    readiness, and delivery integrity rather than disconnected
                                    production steps.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                                <Link
                                    href="/contact"
                                    className="premium-cta inline-flex min-h-[56px] items-center justify-center bg-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 sm:text-[13px]"
                                >
                                    Start a Project Review
                                </Link>

                                <Link
                                    href="/solutions"
                                    className="premium-ghost-cta inline-flex min-h-[56px] items-center justify-center border border-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-[#f97316] transition duration-300 hover:bg-[#f97316] hover:text-white sm:text-[13px]"
                                >
                                    View Solutions
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>
        </main>
    );
}