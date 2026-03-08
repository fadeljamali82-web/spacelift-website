"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Factory, MapPinned, ShieldCheck, Layers3, PackageCheck, MessagesSquare } from "lucide-react";

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
    dark = false,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    body: string;
    dark?: boolean;
}) {
    return (
        <div
            className={`group relative overflow-hidden rounded-[24px] border p-6 transition-all duration-500 hover:-translate-y-[3px] ${dark
                    ? "border-white/10 bg-white/[0.05] hover:border-[#f97316]/35 hover:bg-white/[0.07]"
                    : "border-black/5 bg-white hover:border-[#f97316]/20 hover:shadow-[0_22px_70px_rgba(0,0,0,0.08)]"
                }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative">
                <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full border ${dark
                            ? "border-[#f97316]/30 bg-[#f97316]/10"
                            : "border-[#f97316]/18 bg-[#f97316]/8"
                        }`}
                >
                    <Icon className="h-5 w-5 text-[#f97316]" />
                </div>

                <h3
                    className={`mt-5 text-[24px] font-black leading-[1.02] tracking-[-0.03em] ${dark ? "text-white" : "text-[#111111]"
                        }`}
                >
                    {title}
                </h3>

                <p
                    className={`mt-4 text-[15px] leading-7 ${dark ? "text-white/70" : "text-[#55606d]"
                        }`}
                >
                    {body}
                </p>
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="relative overflow-hidden border-b border-black/5">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="ambient-orb absolute left-[6%] top-10 h-48 w-48 rounded-full bg-[#f97316]/8 blur-3xl" />
                    <div className="ambient-orb-delayed absolute bottom-8 right-[10%] h-32 w-32 rounded-full bg-[#f97316]/6 blur-3xl" />
                    <div className="premium-divider-sweep absolute bottom-0 left-0 h-px w-full opacity-35" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
                    <div className="grid items-center gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14 xl:gap-16">
                        <div>
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
                                    Built to deliver the physical side of brand ambition with more control.
                                </h1>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="mt-8 max-w-[820px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                    SpaceLift Studio exists for projects that need more than good design language. We support
                                    the real-world execution of branded environments through manufacturing depth, material
                                    discipline, organized coordination, and a structure that reduces fragmentation before it
                                    becomes visible in the finished result.
                                </p>
                            </Reveal>

                            <Reveal delay={220}>
                                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
                                    <Link
                                        href="/contact"
                                        className="premium-cta inline-flex min-h-[56px] items-center justify-center bg-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 sm:text-[13px]"
                                    >
                                        Start a Project Review
                                    </Link>

                                    <Link
                                        href="/process"
                                        className="premium-ghost-cta inline-flex min-h-[56px] items-center justify-center border border-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-[#f97316] transition duration-300 hover:bg-[#f97316] hover:text-white sm:text-[13px]"
                                    >
                                        View Delivery Model
                                    </Link>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal delay={120}>
                            <div className="group relative overflow-hidden rounded-[30px] border border-black/5 bg-black/5 shadow-[0_28px_90px_rgba(0,0,0,0.12)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_36px_110px_rgba(0,0,0,0.18)]">
                                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                                <div className="relative aspect-[16/10] w-full overflow-hidden">
                                    <Image
                                        src="/images/facility.png"
                                        alt="SpaceLift Studio manufacturing facility"
                                        fill
                                        priority
                                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                                </div>

                                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                                <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/35 px-4 py-2 backdrop-blur-md transition duration-500 group-hover:translate-x-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
                                        Manufacturing Facility · Kayseri, Turkey
                                    </span>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative border-b border-black/5">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="ambient-orb absolute right-[8%] top-16 h-40 w-40 rounded-full bg-[#f97316]/6 blur-3xl" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 lg:px-14 lg:py-24">
                    <div className="max-w-[960px]">
                        <Reveal>
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#f97316]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                    WHY THE MODEL WORKS
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h2 className="text-[36px] font-black leading-[0.98] tracking-[-0.04em] md:text-[52px] lg:text-[64px]">
                                Manufacturing strength is only valuable if the client can actually use it with confidence.
                            </h2>
                        </Reveal>

                        <Reveal delay={150}>
                            <p className="mt-8 max-w-[900px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                That is why SpaceLift is structured around two realities at once: real production capability
                                and real project coordination. The factory in Kayseri handles manufacturing execution. Our
                                U.S. operations structure supports communication, logistics, administration, and project flow
                                for North American work. For the client, that means stronger output without the chaos that
                                usually comes with fragmented delivery.
                            </p>
                        </Reveal>
                    </div>

                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <Reveal delay={60}>
                            <BenefitCard
                                icon={Factory}
                                title="Manufacturing Depth"
                                body="Production is backed by a real facility environment, not by a loose vendor chain or a presentation-only promise."
                            />
                        </Reveal>

                        <Reveal delay={120}>
                            <BenefitCard
                                icon={MessagesSquare}
                                title="Client Coordination"
                                body="Communication, administration, and project organization are structured to make the process more usable and less fragmented for the client."
                            />
                        </Reveal>

                        <Reveal delay={180}>
                            <BenefitCard
                                icon={PackageCheck}
                                title="Execution Readiness"
                                body="The work is prepared with deployment in mind, helping projects move toward installation with more clarity and less friction."
                            />
                        </Reveal>

                        <Reveal delay={240}>
                            <BenefitCard
                                icon={ShieldCheck}
                                title="Quality Protection"
                                body="Finish standards, material discipline, and execution control are treated as operating priorities rather than cosmetic hopes at the end."
                            />
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative border-b border-black/5 bg-[#0c0f14] text-white">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="ambient-orb absolute left-[8%] top-[12%] h-48 w-48 rounded-full bg-[#f97316]/12 blur-3xl" />
                    <div className="ambient-orb-delayed absolute bottom-[10%] right-[10%] h-28 w-28 rounded-full bg-white/[0.03] blur-3xl" />
                    <div className="premium-divider-sweep absolute bottom-0 left-0 h-px w-full opacity-40" />
                </div>

                <div className="mx-auto grid max-w-[1450px] gap-10 px-6 py-16 md:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-14 lg:py-24">
                    <div>
                        <Reveal>
                            <div className="mb-6 flex items-center gap-4">
                                <span className="h-px w-10 bg-[#f97316]" />
                                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                    WHAT WE ACTUALLY DO FOR CLIENTS
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h2 className="text-[36px] font-black leading-[0.98] tracking-[-0.04em] md:text-[52px] lg:text-[64px]">
                                We help clients move from fragmented execution to a more controlled result.
                            </h2>
                        </Reveal>

                        <Reveal delay={150}>
                            <p className="mt-8 max-w-[760px] text-[17px] leading-8 text-white/70 md:text-[19px]">
                                Buyers usually do not need another supplier. They need fewer gaps, fewer handoffs, stronger
                                material confidence, cleaner coordination, and better delivery conditions from beginning to
                                end. SpaceLift is structured around solving those exact points of pressure.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <Reveal delay={60}>
                            <BenefitCard
                                icon={Layers3}
                                title="Multi-Surface Execution"
                                body="We help unify walls, floors, panels, branded graphics, and other physical touchpoints so the final environment feels resolved instead of pieced together."
                                dark
                            />
                        </Reveal>

                        <Reveal delay={120}>
                            <BenefitCard
                                icon={MapPinned}
                                title="Cross-Market Coordination"
                                body="Our structure supports projects that need manufacturing capability and organized North American project handling at the same time."
                                dark
                            />
                        </Reveal>

                        <Reveal delay={180}>
                            <BenefitCard
                                icon={ShieldCheck}
                                title="Reduced Fragmentation"
                                body="We help reduce the risks created by disconnected vendors, drifting quality, unclear handoffs, and weak rollout discipline."
                                dark
                            />
                        </Reveal>

                        <Reveal delay={240}>
                            <BenefitCard
                                icon={PackageCheck}
                                title="Install-Ready Thinking"
                                body="The work is developed with sequencing, packaging, and deployment logic in mind so the field is not left solving problems that should have been solved earlier."
                                dark
                            />
                        </Reveal>
                    </div>
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
                                        WHAT CLIENTS SHOULD TAKE AWAY
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={80}>
                                <h2 className="max-w-[980px] text-[36px] font-black leading-[0.98] tracking-[-0.04em] md:text-[52px] lg:text-[64px]">
                                    SpaceLift is built for projects that need more than output. They need a stronger operating model behind the result.
                                </h2>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="mt-8 max-w-[880px] text-[18px] leading-8 text-[#5f6672] md:text-[20px]">
                                    Our advantage is not one single claim. It is the combination of manufacturing depth, design-aware
                                    execution, operational coordination, and a more accountable path from planning through delivery.
                                    That is what makes the final environment feel stronger, cleaner, and more intentional.
                                </p>
                            </Reveal>
                        </div>

                        <Reveal delay={220}>
                            <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-8">
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    IN PRACTICE
                                </div>

                                <div className="mt-5 space-y-4">
                                    {[
                                        "A more coordinated path from concept to installed environment",
                                        "Stronger finish confidence across demanding physical applications",
                                        "Fewer gaps between production, logistics, and rollout",
                                        "A premium execution partner built for real project conditions",
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
                                        href="/contact"
                                        className="premium-cta inline-flex min-h-[56px] items-center justify-center bg-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 sm:text-[13px]"
                                    >
                                        Start a Project Review
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