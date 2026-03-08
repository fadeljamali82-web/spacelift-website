"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ClipboardList, MessagesSquare, PackageCheck, ShieldCheck } from "lucide-react";

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
                transition: `opacity 780ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 980ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function BenefitCard({
    icon: Icon,
    title,
    body,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    body: string;
}) {
    return (
        <div className="group relative overflow-hidden rounded-[22px] border border-black/5 bg-white p-5 transition-all duration-500 hover:-translate-y-[3px] hover:border-[#f97316]/20 hover:shadow-[0_22px_70px_rgba(0,0,0,0.08)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f97316]/18 bg-[#f97316]/8">
                    <Icon className="h-5 w-5 text-[#f97316]" />
                </div>

                <h3 className="mt-4 text-[22px] font-black leading-[1.02] tracking-[-0.03em] text-[#111111]">
                    {title}
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-[#55606d]">{body}</p>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="relative overflow-hidden border-b border-black/5">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="ambient-orb absolute left-[6%] top-12 h-48 w-48 rounded-full bg-[#f97316]/8 blur-3xl" />
                    <div className="ambient-orb-delayed absolute bottom-[10%] right-[8%] h-32 w-32 rounded-full bg-[#f97316]/6 blur-3xl" />
                    <div className="premium-divider-sweep absolute bottom-0 left-0 h-px w-full opacity-35" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
                    <div className="grid items-start gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16">
                        <div>
                            <Reveal>
                                <div className="mb-6 flex items-center gap-4">
                                    <span className="h-px w-10 bg-[#f97316]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                        START YOUR PROJECT
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={80}>
                                <h1 className="max-w-[860px] text-[44px] font-black leading-[0.95] tracking-[-0.05em] md:text-[60px] lg:text-[82px]">
                                    Start with a team built to reduce friction before it becomes visible.
                                </h1>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="mt-8 max-w-[780px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                    SpaceLift Studio supports complex branded environments through a more
                                    coordinated path from planning to physical execution. This is where clients
                                    begin the conversation when they need stronger material confidence, cleaner
                                    delivery logic, and a more accountable execution partner.
                                </p>
                            </Reveal>

                            <Reveal delay={220}>
                                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-[22px] border border-black/5 bg-white/60 p-5 backdrop-blur-sm">
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                            MANUFACTURING
                                        </div>
                                        <p className="mt-3 text-[24px] font-black leading-tight tracking-[-0.03em] text-[#111111]">
                                            Kayseri, Turkey
                                        </p>
                                        <p className="mt-3 text-[15px] leading-7 text-[#55606d]">
                                            Production, fabrication, and digital surface execution are supported
                                            through our manufacturing structure in Kayseri.
                                        </p>
                                    </div>

                                    <div className="rounded-[22px] border border-black/5 bg-white/60 p-5 backdrop-blur-sm">
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                            U.S. OPERATIONS
                                        </div>
                                        <p className="mt-3 text-[24px] font-black leading-tight tracking-[-0.03em] text-[#111111]">
                                            Coordination and client handling
                                        </p>
                                        <p className="mt-3 text-[15px] leading-7 text-[#55606d]">
                                            Logistics, administration, communication, and North American project
                                            coordination are supported through our U.S. operations structure.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={280}>
                                <div className="mt-10 grid gap-5 md:grid-cols-2">
                                    <BenefitCard
                                        icon={ClipboardList}
                                        title="Clearer Intake"
                                        body="The right project starts with the right brief. We use this stage to understand scope, environment pressure, and execution requirements early."
                                    />

                                    <BenefitCard
                                        icon={MessagesSquare}
                                        title="Better Coordination"
                                        body="Clients are not left trying to bridge manufacturing, logistics, and project communication on their own."
                                    />

                                    <BenefitCard
                                        icon={PackageCheck}
                                        title="Execution Readiness"
                                        body="We approach the work with rollout, install conditions, and physical delivery logic in mind from the start."
                                    />

                                    <BenefitCard
                                        icon={ShieldCheck}
                                        title="Reduced Risk"
                                        body="A more structured start helps reduce fragmentation, weak handoffs, and avoidable downstream confusion."
                                    />
                                </div>
                            </Reveal>
                        </div>

                        <Reveal delay={120}>
                            <div className="relative overflow-hidden rounded-[30px] border border-black/5 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] backdrop-blur-sm md:p-10">
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_38%)]" />

                                <div className="relative">
                                    <div className="mb-6 flex items-center gap-4">
                                        <span className="h-px w-10 bg-[#f97316]" />
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                            PROJECT BRIEF
                                        </span>
                                    </div>

                                    <h2 className="max-w-[620px] text-[30px] font-black leading-[0.98] tracking-[-0.04em] text-[#111111] md:text-[40px]">
                                        Tell us what the environment needs to achieve.
                                    </h2>

                                    <p className="mt-5 max-w-[700px] text-[16px] leading-7 text-[#5f6672]">
                                        The more clearly we understand the environment, the pressure points, the
                                        timeline, and the surfaces involved, the better we can guide the path
                                        forward.
                                    </p>

                                    <form className="mt-8 space-y-5">
                                        <div>
                                            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316] focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316] focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="you@company.com"
                                                className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316] focus:bg-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                                Project Type
                                            </label>
                                            <select className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316] focus:bg-white">
                                                <option>Select Project Type</option>
                                                <option>Strategic Consultation</option>
                                                <option>Design & Technical Translation</option>
                                                <option>Manufacturing & Production Execution</option>
                                                <option>Logistics, Rollout & Install Coordination</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                                                Project Description
                                            </label>
                                            <textarea
                                                rows={6}
                                                placeholder="Tell us about the environment, surfaces involved, project scale, timeline, and what kind of support you need."
                                                className="w-full rounded-[16px] border border-black/10 bg-[#f8f7f4] px-5 py-4 text-[16px] outline-none transition focus:border-[#f97316] focus:bg-white"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="premium-cta inline-flex min-h-[58px] w-full items-center justify-center rounded-[16px] bg-[#f97316] px-8 text-[13px] font-bold uppercase tracking-[0.06em] text-white transition"
                                        >
                                            Submit Project Brief
                                        </button>
                                    </form>

                                    <p className="mt-5 text-[12px] uppercase tracking-[0.18em] text-[#7a828d]">
                                        Built for serious branded environments, premium execution, and coordinated delivery.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="border-b border-black/5">
                <div className="mx-auto grid max-w-[1450px] gap-8 px-6 py-16 md:px-10 lg:grid-cols-2 lg:px-14 lg:py-24">
                    <Reveal>
                        <div className="rounded-[28px] bg-[#0c0f14] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_30px_90px_rgba(0,0,0,0.24)] md:p-10">
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#f97316]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                    U.S. OPERATIONS
                                </span>
                            </div>

                            <p className="text-[26px] font-black leading-tight tracking-[-0.03em] md:text-[34px]">
                                Logistics, administration, and project coordination
                            </p>

                            <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-white/70 md:text-[17px]">
                                This structure supports communication, organization, logistics flow, and North American
                                project handling so clients are not left managing fragmented coordination on their own.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={100}>
                        <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition duration-500 hover:-translate-y-[2px] hover:shadow-[0_26px_70px_rgba(0,0,0,0.08)] md:p-10">
                            <div className="mb-5 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#f97316]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                    MANUFACTURING FACILITY
                                </span>
                            </div>

                            <p className="text-[26px] font-black leading-tight tracking-[-0.03em] md:text-[34px]">
                                Kayseri, Turkey
                            </p>

                            <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-[#5f6672] md:text-[17px]">
                                Production and fabrication are supported through our Kayseri manufacturing structure,
                                where digital surface execution, material output, and finish discipline are handled with
                                precision and consistency.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute bottom-10 left-[10%] h-px w-48 bg-gradient-to-r from-transparent via-[#f97316]/40 to-transparent" />
                    <div className="ambient-orb absolute right-[12%] top-10 h-44 w-44 rounded-full bg-[#f97316]/5 blur-3xl" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 lg:px-14 lg:py-24">
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div>
                            <Reveal>
                                <div className="mb-6 flex items-center gap-4">
                                    <span className="h-px w-10 bg-[#f97316]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                        WHAT HAPPENS NEXT
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={80}>
                                <h2 className="max-w-[980px] text-[36px] font-black leading-[0.98] tracking-[-0.04em] md:text-[52px] lg:text-[64px]">
                                    The goal is not just to receive a message. It is to start from the right level of clarity.
                                </h2>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="mt-8 max-w-[880px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                    A strong intake process helps define the environment, identify execution priorities,
                                    and reduce downstream confusion before the project builds momentum. That is why this
                                    page is designed as a proper project start point, not just a contact form.
                                </p>
                            </Reveal>
                        </div>

                        <Reveal delay={220}>
                            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-8">
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    NEXT STEP OPTIONS
                                </div>

                                <div className="mt-5 space-y-4">
                                    {[
                                        "Submit a project brief so we can review the environment and scope",
                                        "Use the process page to understand how our execution model works",
                                        "Review projects and solutions to see where our structure creates value",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-start gap-3 rounded-[18px] border border-black/5 bg-[#f8f6f2] px-4 py-4"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                                            <span className="text-[15px] leading-7 text-[#46505c]">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                    <Link
                                        href="/process"
                                        className="premium-ghost-cta inline-flex min-h-[56px] items-center justify-center border border-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-[#f97316] transition duration-300 hover:bg-[#f97316] hover:text-white sm:text-[13px]"
                                    >
                                        View Process
                                    </Link>

                                    <Link
                                        href="/projects"
                                        className="premium-ghost-cta inline-flex min-h-[56px] items-center justify-center border border-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-[#f97316] transition duration-300 hover:bg-[#f97316] hover:text-white sm:text-[13px]"
                                    >
                                        View Projects
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}