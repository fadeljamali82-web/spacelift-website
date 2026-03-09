"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Stage = {
    id: string;
    label: string;
    title: string;
    body: string;
    progressStart: number;
    progressEnd: number;
};

const TOTAL_FRAMES = 160;
const SCROLL_SECTION_HEIGHT_VH = 520;

const stages: Stage[] = [
    {
        id: "stage-1",
        label: "STAGE 01 · BASE CONDITION",
        title: "A beautiful architectural shell can still feel unresolved.",
        body:
            "This is where many environments begin: strong proportions, premium volume, and architectural quality, but without the surface language, finish hierarchy, and spatial identity needed to make the space unforgettable.",
        progressStart: 0,
        progressEnd: 0.22,
    },
    {
        id: "stage-2",
        label: "STAGE 02 · SURFACE ACTIVATION",
        title: "The transformation begins at the surface level, not with clutter.",
        body:
            "Floor treatment starts to define movement, atmosphere, and control. The goal is not to add noise. It is to introduce rhythm, contrast, and a more intentional spatial experience.",
        progressStart: 0.22,
        progressEnd: 0.44,
    },
    {
        id: "stage-3",
        label: "STAGE 03 · WALL SYSTEMS",
        title: "Walls stop being background and start carrying identity.",
        body:
            "Integrated panel systems, embedded architectural graphics, and stronger material relationships begin to shape how the environment is perceived. The room starts to feel authored instead of merely finished.",
        progressStart: 0.44,
        progressEnd: 0.66,
    },
    {
        id: "stage-4",
        label: "STAGE 04 · FINISH DISCIPLINE",
        title: "Premium impact comes from cohesion, not isolated moments.",
        body:
            "As lighting, material depth, focal treatments, and finish contrast lock together, the space gains authority. This is where structure becomes emotion and the environment starts to feel worth remembering.",
        progressStart: 0.66,
        progressEnd: 0.88,
    },
    {
        id: "stage-5",
        label: "STAGE 05 · FINAL IMPACT",
        title: "The final environment lands with clarity, control, and wow factor.",
        body:
            "What began as a quiet shell now reads as a fully resolved branded environment. The difference is not decoration. It is disciplined execution across surfaces, lighting, and spatial identity.",
        progressStart: 0.88,
        progressEnd: 1,
    },
];

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

function padFrameNumber(frame: number) {
    return String(frame).padStart(3, "0");
}

function getFrameSrc(frame: number) {
    return `/images/home-hero-sequence/ezgif-frame-${padFrameNumber(frame)}.jpg`;
}

function getActiveStage(progress: number) {
    return (
        stages.find(
            (stage) => progress >= stage.progressStart && progress <= stage.progressEnd
        ) ?? stages[stages.length - 1]
    );
}

function Reveal({
    children,
    delay = 0,
    y = 18,
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

export default function HomePage() {
    const scrollSectionRef = useRef<HTMLElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [frame, setFrame] = useState(1);
    const [loadedFrame, setLoadedFrame] = useState(1);

    const frameSources = useMemo(
        () => Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameSrc(i + 1)),
        []
    );

    const activeStage = getActiveStage(progress);
    const isFinalStage = activeStage.id === "stage-5";

    useEffect(() => {
        const criticalFrames = [1, 2, 3, 4, 5, 12, 24, 36, 48, 60, 80, 100, 120, 140, 160];
        criticalFrames.forEach((n) => {
            const img = new window.Image();
            img.src = getFrameSrc(n);
        });

        let cancelled = false;
        let nextIndex = 0;

        const preloadBatch = () => {
            if (cancelled) return;
            const batchSize = 6;

            for (let i = 0; i < batchSize && nextIndex < frameSources.length; i += 1) {
                const img = new window.Image();
                img.src = frameSources[nextIndex];
                nextIndex += 1;
            }

            if (nextIndex < frameSources.length) {
                window.setTimeout(preloadBatch, 80);
            }
        };

        if ("requestIdleCallback" in window) {
            (
                window as Window & {
                    requestIdleCallback: (cb: () => void) => number;
                }
            ).requestIdleCallback(preloadBatch);
        } else {
            window.setTimeout(preloadBatch, 300);
        }

        return () => {
            cancelled = true;
        };
    }, [frameSources]);

    useEffect(() => {
        let ticking = false;

        const update = () => {
            ticking = false;
            const section = scrollSectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalScrollable = Math.max(section.offsetHeight - viewportHeight, 1);
            const scrolledWithinSection = clamp(-rect.top, 0, totalScrollable);
            const nextProgress = clamp(scrolledWithinSection / totalScrollable, 0, 1);
            const nextFrame = clamp(
                Math.round(nextProgress * (TOTAL_FRAMES - 1)) + 1,
                1,
                TOTAL_FRAMES
            );

            setProgress(nextProgress);
            setFrame((prev) => (prev !== nextFrame ? nextFrame : prev));
        };

        const onScrollOrResize = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        };

        update();

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, []);

    return (
        <main className="bg-[#060709] text-white">
            <section
                ref={scrollSectionRef}
                className="relative"
                style={{ height: `${SCROLL_SECTION_HEIGHT_VH}vh` }}
            >
                <div className="sticky top-0 h-screen overflow-hidden bg-[#060709]">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,165,84,0.10),transparent_28%),linear-gradient(180deg,#07080a_0%,#060709_100%)]" />
                        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
                        <div className="absolute left-[-6%] top-[6%] h-52 w-52 rounded-full bg-[#f97316]/12 blur-3xl" />
                        <div className="absolute right-[-4%] top-[12%] h-44 w-44 rounded-full bg-white/[0.04] blur-3xl" />
                    </div>

                    <div className="relative flex h-full flex-col">
                        <div className="relative h-[60vh] shrink-0 overflow-hidden border-b border-white/8 bg-[#060709]">
                            <img
                                src={getFrameSrc(frame)}
                                alt="Space transformation sequence"
                                className="h-full w-full object-cover"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                                onLoad={() => setLoadedFrame(frame)}
                                onError={() => console.error(`Missing frame: ${getFrameSrc(frame)}`)}
                            />

                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.06)_45%,rgba(0,0,0,0.38)_100%)]" />
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060709]/70 to-transparent" />

                            <div className="absolute left-5 top-5 z-10 rounded-full border border-white/12 bg-black/25 px-4 py-2 backdrop-blur-md sm:left-8 sm:top-8">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/82 sm:text-[11px]">
                                    Scroll Film · Frame {padFrameNumber(loadedFrame)} / {TOTAL_FRAMES}
                                </span>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 z-10 sm:bottom-8 sm:left-8 sm:right-8">
                                <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/76 sm:text-[11px]">
                                        Transformation Progress
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffc98c] sm:text-[11px]">
                                        {Math.round(progress * 100)}%
                                    </span>
                                </div>

                                <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/12">
                                    <div
                                        className="h-full rounded-full bg-[#f97316] shadow-[0_0_18px_rgba(249,115,22,0.55)] transition-[width] duration-150"
                                        style={{ width: `${Math.round(progress * 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative flex min-h-0 flex-1 items-center bg-[#060709]">
                            <div className="mx-auto flex h-full w-full max-w-[1450px] items-center px-5 py-6 sm:px-8 md:px-10 lg:px-14">
                                <div className="grid w-full gap-6 lg:grid-cols-[0.76fr_0.24fr] lg:gap-8">
                                    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8">
                                        <div className="mb-5 flex items-center gap-4">
                                            <span className="h-px w-10 bg-[#f97316]" />
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#f97316] md:text-[11px]">
                                                {activeStage.label}
                                            </span>
                                        </div>

                                        <div className="min-h-[136px] md:min-h-[162px]">
                                            <h1 className="max-w-[920px] text-[32px] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[38px] md:text-[48px] lg:text-[58px]">
                                                {activeStage.title}
                                            </h1>

                                            <p className="mt-5 max-w-[900px] text-[15px] leading-7 text-white/72 md:text-[18px] md:leading-8">
                                                {activeStage.body}
                                            </p>
                                        </div>

                                        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                                            {isFinalStage ? (
                                                <>
                                                    <Link
                                                        href="/contact"
                                                        className="inline-flex min-h-[56px] items-center justify-center rounded-[16px] bg-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:bg-[#ea580c] hover:shadow-[0_14px_30px_rgba(249,115,22,0.28)] sm:text-[13px]"
                                                    >
                                                        Start a Project Review
                                                    </Link>

                                                    <Link
                                                        href="/projects"
                                                        className="inline-flex min-h-[56px] items-center justify-center rounded-[16px] border border-white/14 bg-white/[0.03] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:border-[#f97316] hover:text-[#f97316] sm:text-[13px]"
                                                    >
                                                        View Projects
                                                    </Link>
                                                </>
                                            ) : (
                                                <div className="rounded-[16px] border border-white/10 bg-black/20 px-5 py-4 text-[12px] uppercase tracking-[0.18em] text-white/58 md:text-[13px]">
                                                    Keep scrolling to complete the transformation
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 self-stretch md:grid-cols-3 lg:grid-cols-1">
                                        {stages.map((stage) => {
                                            const active = stage.id === activeStage.id;
                                            return (
                                                <div
                                                    key={stage.id}
                                                    className={`rounded-[22px] border px-4 py-4 transition-all duration-300 ${active
                                                            ? "border-[#f97316]/35 bg-[#f97316]/10 shadow-[0_0_0_1px_rgba(249,115,22,0.10)]"
                                                            : "border-white/8 bg-white/[0.03]"
                                                        }`}
                                                >
                                                    <div
                                                        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${active ? "text-[#ffc98c]" : "text-white/45"
                                                            }`}
                                                    >
                                                        {stage.label}
                                                    </div>
                                                    <div
                                                        className={`mt-3 text-[13px] leading-6 ${active ? "text-white/90" : "text-white/60"
                                                            }`}
                                                    >
                                                        {stage.title}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative border-t border-white/6 bg-[#0b0d10]">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute left-[8%] top-14 h-40 w-40 rounded-full bg-[#f97316]/10 blur-3xl" />
                    <div className="absolute bottom-10 right-[10%] h-px w-44 bg-gradient-to-r from-transparent via-[#f97316]/50 to-transparent" />
                </div>

                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 lg:px-14 lg:py-24">
                    <Reveal>
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-px w-10 bg-[#f97316]" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f97316]">
                                WHY SPACELIFT
                            </span>
                        </div>
                    </Reveal>

                    <Reveal delay={80}>
                        <h2 className="max-w-[980px] text-[36px] font-black leading-[0.98] tracking-[-0.05em] text-white md:text-[52px] lg:text-[66px]">
                            We help environments move from good bones to unforgettable finish.
                        </h2>
                    </Reveal>

                    <Reveal delay={150}>
                        <p className="mt-8 max-w-[900px] text-[18px] leading-8 text-white/68 md:text-[20px]">
                            SpaceLift Studio is built for projects that need more than a nice concept. We
                            support the physical side of branded environments through material logic, surface
                            systems, finish discipline, and a more coordinated path from idea to installed
                            result.
                        </p>
                    </Reveal>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {[
                            {
                                title: "One accountable path",
                                body: "We reduce the fragmentation that usually happens when planning, surface execution, and rollout are separated.",
                            },
                            {
                                title: "Surface-led transformation",
                                body: "Our value shows up through walls, floors, focal treatments, lighting interplay, and the total feel of the final environment.",
                            },
                            {
                                title: "Built for real delivery",
                                body: "The work is approached with production, sequencing, and install-readiness in mind, not just visual presentation.",
                            },
                        ].map((item, index) => (
                            <Reveal key={item.title} delay={220 + index * 60}>
                                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-[3px] hover:border-[#f97316]/25 hover:bg-white/[0.06]">
                                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                        0{index + 1}
                                    </div>
                                    <h3 className="mt-4 text-[24px] font-black leading-[1.02] tracking-[-0.03em] text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-4 text-[15px] leading-7 text-white/68">{item.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}