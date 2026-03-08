"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    ScanSearch,
    PenTool,
    Factory,
    PackageCheck,
    Rocket,
    ArrowUpRight,
} from "lucide-react";

type StepType = {
    id: string;
    number: string;
    eyebrow: string;
    title: string;
    body: string;
    signals: string[];
    outcomeTitle: string;
    outcome: string;
    image: string;
    alt: string;
    icon: React.ComponentType<{ className?: string }>;
};

const steps: StepType[] = [
    {
        id: "discovery",
        number: "01",
        eyebrow: "STRATEGIC DISCOVERY",
        title: "We define the execution path before complexity turns into cost.",
        body:
            "Every strong environment starts with clarity. This stage is where we define what the space needs to achieve, what standards cannot move, where coordination risks exist, and which surfaces or applications matter most. Instead of letting uncertainty travel into production, we resolve it early so the project begins with structure rather than reaction.",
        signals: [
            "Environment goals and pressure points are clarified early",
            "High-risk surfaces and applications are identified before downstream compromise",
            "Material direction starts with use conditions, not assumptions",
            "Execution decisions begin from structure, not urgency",
        ],
        outcomeTitle: "What this stage protects",
        outcome:
            "It protects the project from avoidable ambiguity, misalignment, and expensive course correction later.",
        image: "/images/capability-spec-driven-projects.png",
        alt: "Strategic discovery and spec-driven planning for premium environment delivery",
        icon: ScanSearch,
    },
    {
        id: "translation",
        number: "02",
        eyebrow: "DESIGN & TECHNICAL TRANSLATION",
        title: "We translate visual intent into systems that can actually be built correctly.",
        body:
            "A concept only holds value if it survives scale, finish standards, material behavior, and installation conditions. This stage converts design intent into real production logic, aligning visual direction with dimensional control, application methods, file preparation, and physical execution standards so the work stays credible when it becomes real.",
        signals: [
            "Creative direction is aligned with manufacturable reality",
            "Surface applications are resolved with technical discipline",
            "Files and specifications are prepared for execution, not just presentation",
            "Installation logic is considered before the work reaches the field",
        ],
        outcomeTitle: "What this stage protects",
        outcome:
            "It protects the design from losing authority when it moves from concept into real-world execution.",
        image: "/images/capability-digital-surface-manufacturing.png",
        alt: "Technical translation and production preparation for branded environments",
        icon: PenTool,
    },
    {
        id: "manufacturing",
        number: "03",
        eyebrow: "CONTROLLED MANUFACTURING",
        title: "We produce with finish discipline, consistency control, and deployment in mind.",
        body:
            "This is where the project becomes physical. Our manufacturing approach is not built around output alone. It is built around consistency, finish confidence, material discipline, and the ability to support real deployment conditions. Quality is treated as part of the operating system, not as a cosmetic check at the end.",
        signals: [
            "Finish consistency is managed as a process standard, not a final hope",
            "Production decisions are made with application conditions in mind",
            "Material handling supports quality as much as speed",
            "Execution discipline remains visible through the finished result",
        ],
        outcomeTitle: "What this stage protects",
        outcome:
            "It protects premium intent from being weakened by avoidable inconsistency during production.",
        image: "/images/capability-color-managed-production.png",
        alt: "Controlled manufacturing and quality-driven production workflow",
        icon: Factory,
    },
    {
        id: "readiness",
        number: "04",
        eyebrow: "INSTALL-READY SYSTEMS",
        title: "We organize the output so the field does not have to solve what should have been solved upstream.",
        body:
            "Packaging, sequencing, labeling, and rollout logic are where many projects start to lose control. We structure this stage around deployment reality rather than internal convenience. That means creating cleaner handoff conditions, stronger install-readiness, and output that arrives organized for execution rather than simply delivered for storage.",
        signals: [
            "Packaging logic supports deployment, not warehouse convenience",
            "Sequencing reduces confusion during installation",
            "System readiness improves field clarity and efficiency",
            "The last mile is treated as part of quality, not outside it",
        ],
        outcomeTitle: "What this stage protects",
        outcome:
            "It protects the final execution from friction, confusion, and preventable breakdowns in the field.",
        image: "/images/capability-install-ready-systems.png",
        alt: "Install-ready systems and deployment preparation for premium environments",
        icon: PackageCheck,
    },
    {
        id: "execution",
        number: "05",
        eyebrow: "ROLLOUT & EXECUTION",
        title: "We support the final environment so the brand lands with authority in public.",
        body:
            "The installed environment is where every upstream decision becomes visible. This stage is about protecting the result through better coordination, stronger readiness, and a process that understands delivery quality matters just as much as production quality. That is how the brand arrives resolved rather than compromised.",
        signals: [
            "The final environment is treated as proof of the whole system",
            "Execution support protects finish quality under real conditions",
            "Coordination remains active through the public-facing outcome",
            "Delivery integrity becomes part of the brand experience itself",
        ],
        outcomeTitle: "What this stage protects",
        outcome:
            "It protects the brand from losing authority at the exact moment the public sees the work.",
        image: "/images/capability-single-partner-execution.png",
        alt: "Rollout execution and single-partner delivery for branded physical environments",
        icon: Rocket,
    },
];

function Reveal({
    children,
    delay = 0,
    y = 24,
    scale = 0.99,
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
                transition: `opacity 760ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 980ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function SignalCard({
    text,
    i,
}: {
    text: string;
    i: number;
}) {
    return (
        <div
            className="group relative overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035] p-4 transition-all duration-500 hover:-translate-y-[3px] hover:border-[#f97316]/35 hover:bg-white/[0.05]"
            style={{ transitionDelay: `${i * 40}ms` }}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="relative">
                <div className="mb-3 flex items-center justify-between">
                    <div className="text-[11px] font-semibold tracking-[0.18em] text-[#f97316]">
                        0{i + 1}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/25 transition duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-[#f97316]" />
                </div>
                <p className="text-[14px] leading-6 text-white/76">{text}</p>
            </div>
        </div>
    );
}

function StepSection({
    step,
    index,
}: {
    step: StepType;
    index: number;
}) {
    const reverse = index % 2 === 1;
    const Icon = step.icon;

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

            <div className="mx-auto max-w-[1450px] px-6 py-14 md:px-10 md:py-18 lg:px-14 lg:py-22 xl:py-24">
                <div
                    className={`grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-14 ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                        }`}
                >
                    <Reveal delay={40}>
                        <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_22px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_38%)]" />
                            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                                <div className="premium-sheen absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>

                            <div className="relative overflow-hidden rounded-[28px] border border-white/10">
                                <div className="relative aspect-[16/10] w-full overflow-hidden">
                                    <img
                                        src={step.image}
                                        alt={step.alt}
                                        loading={index < 2 ? "eager" : "lazy"}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                                    <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-md">
                                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80">
                                            Step {step.number}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={90}>
                        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-7 xl:p-8">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_40%)] opacity-70" />

                            <div className="relative">
                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#f97316]/35 bg-[#f97316]/10 shadow-[0_0_24px_rgba(249,115,22,0.18)] backdrop-blur-md">
                                            <Icon className="h-5 w-5 text-[#f97316]" />
                                        </div>

                                        <div>
                                            <div className="text-[11px] font-semibold tracking-[0.18em] text-[#f97316]">
                                                STEP {step.number}
                                            </div>
                                            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                                                {step.eyebrow}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-2.5 w-2.5 rounded-full bg-[#f97316] shadow-[0_0_18px_rgba(249,115,22,0.55)]" />
                                </div>

                                <h2 className="max-w-[760px] text-[34px] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[40px] md:text-[48px] xl:text-[56px]">
                                    {step.title}
                                </h2>

                                <p className="mt-5 max-w-[880px] text-[15px] leading-7 text-white/70 md:text-[17px] md:leading-8">
                                    {step.body}
                                </p>

                                <div className="mt-8 grid gap-4 md:grid-cols-2">
                                    {step.signals.map((signal, i) => (
                                        <SignalCard key={i} text={signal} i={i} />
                                    ))}
                                </div>

                                <div className="mt-8 rounded-[18px] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-md">
                                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                        {step.outcomeTitle}
                                    </div>
                                    <p className="mt-3 text-[15px] leading-7 text-white/76">
                                        {step.outcome}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export default function ProcessPage() {
    return (
        <main className="bg-[#0c0f14] text-white">
            {steps.map((step, index) => (
                <StepSection key={step.id} step={step} index={index} />
            ))}

            <section className="mx-auto max-w-[1450px] px-6 pb-16 pt-6 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
                <Reveal>
                    <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.14)] backdrop-blur-sm md:p-8 lg:p-10">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                    WHY THIS MATTERS
                                </div>

                                <h2 className="mt-4 max-w-[900px] text-[34px] font-black leading-[0.98] tracking-[-0.05em] sm:text-[40px] md:text-[48px] lg:text-[58px]">
                                    Buyers do not only feel the final design. They feel the quality of the process behind it.
                                </h2>

                                <p className="mt-5 max-w-[840px] text-[16px] leading-7 text-white/70 md:text-[18px] md:leading-8">
                                    The strongest final environments usually come from processes
                                    that reduce ambiguity, protect finish standards, and stay
                                    coordinated through real deployment pressure. That is what
                                    this system is designed to do.
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