"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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
        title: "We define the execution logic before complexity turns into cost.",
        body:
            "The process starts by removing ambiguity early. We clarify what the environment must achieve, where the pressure points are, which surfaces matter most, what finish standards are non-negotiable, and where fragmentation is most likely to damage the final result. This stage gives the project a much stronger strategic and technical footing before production begins.",
        signals: [
            "Environment goals and high-risk zones are mapped early",
            "Material priorities are identified before downstream compromise",
            "Execution constraints are surfaced before they become expensive",
            "Decision-making starts from clarity, not from reaction",
        ],
        outcome: "The project begins with structure, not guesswork.",
        image: "/images/capability-spec-driven-projects.png",
        alt: "Strategic discovery and process planning for premium environment delivery",
        icon: ScanSearch,
    },
    {
        id: "translation",
        number: "02",
        eyebrow: "DESIGN & TECHNICAL TRANSLATION",
        title: "We translate visual intent into systems that can actually be built correctly.",
        body:
            "A concept is only as strong as its ability to survive real-world application. This stage turns creative direction into technical logic, aligning design intent with scale, finish standards, material behavior, file preparation, and install reality. It is where visual ambition is protected from avoidable execution loss.",
        signals: [
            "Creative intent is aligned with manufacturable reality",
            "Surface applications are resolved with technical discipline",
            "Files and specs are prepared for execution, not just approval",
            "Install logic is considered before the work reaches the field",
        ],
        outcome:
            "Design quality is protected before production pressure begins.",
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
            "This is where the work becomes physical. Our manufacturing approach is not just about output. It is about producing systems that hold their authority across surfaces, dimensions, finish conditions, and real use environments. Quality is treated as a built-in process standard, not as a cosmetic afterthought.",
        signals: [
            "Finish consistency is treated as part of the system, not a final hope",
            "Production decisions are made with real application in mind",
            "Material behavior is managed for quality, not just speed",
            "Execution discipline stays visible through the finished output",
        ],
        outcome:
            "Production supports premium results instead of weakening them.",
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
            "Packaging, sequencing, labeling, and deployment logic are where many projects start to lose control. We structure this stage around rollout reality, not internal convenience. That means preparing systems so handoff is cleaner, installation is more coherent, and the final execution environment has fewer chances to break down.",
        signals: [
            "Packaging logic supports deployment, not warehouse convenience",
            "Sequencing reduces confusion during installation",
            "System readiness improves field efficiency and clarity",
            "The final mile is treated as part of quality, not outside it",
        ],
        outcome:
            "The project arrives more ready, more legible, and more executable.",
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
            "The installed environment is where every upstream decision becomes visible. This final stage is about protecting the integrity of the result through better coordination, stronger readiness, and a process that understands that delivery quality matters just as much as production quality. That is how the brand arrives resolved rather than compromised.",
        signals: [
            "The final environment is treated as proof of the whole system",
            "Execution support protects finish quality under real conditions",
            "Coordination remains active through the public-facing outcome",
            "Delivery integrity becomes part of the brand experience itself",
        ],
        outcome:
            "The brand lands with more authority because the process held together.",
        image: "/images/capability-single-partner-execution.png",
        alt: "Rollout execution and single-partner delivery for branded physical environments",
        icon: Rocket,
    },
];

function Reveal({
    children,
    delay = 0,
    y = 22,
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

function ProcessPreview({
    step,
    activeIndex,
    total,
}: {
    step: StepType;
    activeIndex: number;
    total: number;
}) {
    const Icon = step.icon;

    return (
        <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_38%)]" />

                <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-md">
                            <Icon className="h-4 w-4 text-[#f97316]" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
                                Live Process View
                            </span>
                        </div>

                        <div className="text-[11px] font-semibold tracking-[0.18em] text-white/35">
                            {String(activeIndex + 1).padStart(2, "0")} /{" "}
                            {String(total).padStart(2, "0")}
                        </div>
                    </div>

                    <div className="mb-5 overflow-hidden rounded-[22px] border border-white/10">
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                            <img
                                src={step.image}
                                alt={step.alt}
                                className="h-full w-full object-cover transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                            <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-md">
                                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80">
                                    Step {step.number}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316]">
                        {step.eyebrow}
                    </div>

                    <h3 className="max-w-[620px] text-[28px] font-black leading-[0.98] tracking-[-0.04em] text-white md:text-[34px]">
                        {step.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-7 text-white/70 md:text-[16px]">
                        {step.outcome}
                    </p>

                    <div className="mt-6">
                        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                            Progress
                        </div>

                        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-[#f97316] transition-all duration-700 ease-out"
                                style={{
                                    width: `${((activeIndex + 1) / total) * 100}%`,
                                    boxShadow: "0 0 18px rgba(249,115,22,0.45)",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SignalCard({
    text,
    i,
    active,
}: {
    text: string;
    i: number;
    active: boolean;
}) {
    return (
        <div
            className={`group relative overflow-hidden rounded-[18px] border p-4 transition-all duration-500 ${active
                    ? "border-[#f97316]/25 bg-white/[0.045] hover:-translate-y-[3px] hover:border-[#f97316]/40 hover:bg-white/[0.06]"
                    : "border-white/8 bg-white/[0.03] hover:-translate-y-[3px] hover:bg-white/[0.05]"
                }`}
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

function StepCard({
    step,
    index,
    active,
    setRef,
}: {
    step: StepType;
    index: number;
    active: boolean;
    setRef: (el: HTMLDivElement | null, i: number) => void;
}) {
    const Icon = step.icon;

    return (
        <div
            ref={(el) => setRef(el, index)}
            className={`relative overflow-hidden rounded-[28px] border p-6 transition-all duration-500 md:p-7 ${active
                    ? "border-[#f97316]/28 bg-white/[0.06] shadow-[0_24px_80px_rgba(249,115,22,0.08)]"
                    : "border-white/10 bg-white/[0.035]"
                }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_40%)] opacity-70" />

            <div className="relative">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition duration-500 ${active
                                    ? "border-[#f97316]/35 bg-[#f97316]/10 shadow-[0_0_24px_rgba(249,115,22,0.18)]"
                                    : "border-white/10 bg-white/[0.04]"
                                }`}
                        >
                            <Icon
                                className={`h-5 w-5 ${active ? "text-[#f97316]" : "text-white/70"
                                    }`}
                            />
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

                    <div
                        className={`h-2.5 w-2.5 rounded-full transition duration-500 ${active
                                ? "bg-[#f97316] shadow-[0_0_18px_rgba(249,115,22,0.55)]"
                                : "bg-white/16"
                            }`}
                    />
                </div>

                <div className="mb-7 overflow-hidden rounded-[22px] border border-white/10">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                            src={step.image}
                            alt={step.alt}
                            className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                            loading={index < 2 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-md">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/80">
                                Step {step.number}
                            </span>
                        </div>
                    </div>
                </div>

                <h3 className="max-w-[760px] text-[30px] font-black leading-[0.98] tracking-[-0.04em] text-white md:text-[38px]">
                    {step.title}
                </h3>

                <p className="mt-5 max-w-[880px] text-[15px] leading-7 text-white/70 md:text-[17px] md:leading-8">
                    {step.body}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {step.signals.map((signal, i) => (
                        <SignalCard key={i} text={signal} i={i} active={active} />
                    ))}
                </div>

                <div className="mt-8 rounded-[18px] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-md">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                        Why this stage matters
                    </div>
                    <p className="mt-3 text-[15px] leading-7 text-white/76">
                        {step.outcome}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ProcessPage() {
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const elements = stepRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            Math.abs(a.boundingClientRect.top) -
                            Math.abs(b.boundingClientRect.top)
                    );

                if (visible[0]) {
                    const idx = Number(
                        (visible[0].target as HTMLElement).dataset.processIndex
                    );
                    if (!Number.isNaN(idx)) setActiveIndex(idx);
                }
            },
            {
                threshold: 0.35,
                rootMargin: "-10% 0px -30% 0px",
            }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const activeStep = useMemo(() => steps[activeIndex] ?? steps[0], [activeIndex]);

    const setRef = (el: HTMLDivElement | null, i: number) => {
        stepRefs.current[i] = el;
        if (el) {
            el.dataset.processIndex = String(i);
        }
    };

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
                            A Premium Execution Methodology Built to Reduce Friction at Every Stage.
                        </h1>
                    </Reveal>

                    <Reveal delay={150}>
                        <p className="mt-6 max-w-[920px] text-[16px] leading-7 text-white/70 md:mt-8 md:text-[18px] md:leading-8 lg:text-[20px]">
                            SpaceLift’s process is not a list of disconnected steps. It is a
                            controlled system for turning complex physical requirements into
                            more coherent, more install-ready, and more credible final
                            environments. The goal is not just movement. The goal is
                            execution integrity.
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
                                    TRANSLATION
                                </div>
                                <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px] md:leading-7">
                                    Design intent is protected by technical discipline.
                                </p>
                            </div>

                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    CONTROL
                                </div>
                                <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px] md:leading-7">
                                    Quality is built into the system, not inspected into it later.
                                </p>
                            </div>

                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    DELIVERY
                                </div>
                                <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px] md:leading-7">
                                    The final environment is treated as proof of the whole model.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#0c0f14]">
                <div className="mx-auto grid max-w-[1450px] gap-10 px-6 pb-16 md:px-10 md:pb-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-14 lg:pb-24">
                    <ProcessPreview
                        step={activeStep}
                        activeIndex={activeIndex}
                        total={steps.length}
                    />

                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <Reveal key={step.id} delay={index * 40}>
                                <StepCard
                                    step={step}
                                    index={index}
                                    active={activeIndex === index}
                                    setRef={setRef}
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

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