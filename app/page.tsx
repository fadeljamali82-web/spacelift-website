"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Stage = {
    id: string;
    label: string;
    title: string;
    body: string;
    progressStart: number;
    progressEnd: number;
};

const TOTAL_FRAMES = 160;
const HEADER_OFFSET = 74;
const DESKTOP_SCROLL_VH = 340;
const MOBILE_SCROLL_VH = 260;

const stages: Stage[] = [
    {
        id: "base",
        label: "STAGE 01 · BASE CONDITION",
        title: "A strong architectural shell can still feel unresolved.",
        body:
            "Good bones are not the same as a finished experience. Many environments begin with impressive volume and clean architecture, but without the surface language, finish hierarchy, and spatial identity needed to make the space memorable.",
        progressStart: 0,
        progressEnd: 0.2,
    },
    {
        id: "floor",
        label: "STAGE 02 · FLOOR ACTIVATION",
        title: "Transformation begins through the surfaces people feel first.",
        body:
            "The floor starts defining movement, atmosphere, and control. The goal is not to add noise. It is to establish a stronger spatial language that immediately changes how the room is experienced.",
        progressStart: 0.2,
        progressEnd: 0.4,
    },
    {
        id: "walls",
        label: "STAGE 03 · WALL SYSTEMS",
        title: "Walls stop being background and start carrying identity.",
        body:
            "Integrated panel systems, embedded architectural graphics, and stronger material relationships begin to shape how the environment is perceived. The space starts to feel authored rather than merely completed.",
        progressStart: 0.4,
        progressEnd: 0.64,
    },
    {
        id: "finish",
        label: "STAGE 04 · FINISH DISCIPLINE",
        title: "Premium impact comes from cohesion, not isolated moments.",
        body:
            "As surface systems, focal treatments, material contrast, and lighting depth lock together, the room gains authority. This is where structure becomes emotion and the environment starts to feel worth remembering.",
        progressStart: 0.64,
        progressEnd: 0.86,
    },
    {
        id: "impact",
        label: "STAGE 05 · FINAL IMPACT",
        title: "The final environment lands with clarity, control, and wow factor.",
        body:
            "What began as a quiet shell now reads as a fully resolved branded environment. The difference is not decoration. It is disciplined execution across surfaces, lighting, and spatial identity.",
        progressStart: 0.86,
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

function getNearestLoadedFrame(
    targetFrame: number,
    loaded: boolean[],
    totalFrames: number
) {
    const targetIndex = targetFrame - 1;

    if (loaded[targetIndex]) return targetFrame;

    for (let offset = 1; offset < totalFrames; offset += 1) {
        const lower = targetIndex - offset;
        const upper = targetIndex + offset;

        if (lower >= 0 && loaded[lower]) return lower + 1;
        if (upper < totalFrames && loaded[upper]) return upper + 1;
    }

    return 1;
}

function drawImageCover(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr =
        typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    if (!cssWidth || !cssHeight) return;

    const targetWidth = Math.floor(cssWidth * dpr);
    const targetHeight = Math.floor(cssHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgWidth = image.naturalWidth;
    const imgHeight = image.naturalHeight;
    if (!imgWidth || !imgHeight) return;

    const scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const dx = (canvas.width - drawWidth) / 2;
    const dy = (canvas.height - drawHeight) / 2;

    ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
}

function useViewportMode() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 1024);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return isMobile;
}

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
                transform: visible ? "translateY(0px)" : "translateY(18px)",
                transition: `opacity 700ms ease ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function StageIcon({ index, active }: { index: number; active?: boolean }) {
    const stroke = active ? "#ffc98c" : "rgba(255,255,255,0.56)";
    const fill = active ? "rgba(249,115,22,0.16)" : "rgba(255,255,255,0.04)";
    const border = active ? "rgba(249,115,22,0.30)" : "rgba(255,255,255,0.10)";

    return (
        <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
            style={{ background: fill, borderColor: border }}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {index === 0 && (
                    <>
                        <path d="M4 19h16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
                        <path
                            d="M6 19V9l6-4 6 4v10"
                            stroke={stroke}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </>
                )}
                {index === 1 && (
                    <>
                        <path d="M4 18h16" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M7 18V10" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M12 18V7" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M17 18V12" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
                    </>
                )}
                {index === 2 && (
                    <>
                        <rect x="4" y="5" width="6" height="14" rx="1.5" stroke={stroke} strokeWidth="1.8" />
                        <rect x="14" y="5" width="6" height="14" rx="1.5" stroke={stroke} strokeWidth="1.8" />
                    </>
                )}
                {index === 3 && (
                    <path
                        d="M12 4l2.3 4.7L20 9.5l-4 3.8.9 5.2L12 16l-4.9 2.5.9-5.2-4-3.8 5.7-.8L12 4z"
                        stroke={stroke}
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                    />
                )}
                {index === 4 && (
                    <path
                        d="M5 12l4.5 4.5L19 7"
                        stroke={stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>
        </div>
    );
}

export default function HomePage() {
    const isMobile = useViewportMode();
    const filmSectionRef = useRef<HTMLElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const loadedRef = useRef<boolean[]>([]);
    const targetFrameRef = useRef(1);
    const smoothFrameRef = useRef(1);

    const [progress, setProgress] = useState(0);
    const [displayedFrame, setDisplayedFrame] = useState(1);

    const scrollHeight = isMobile ? MOBILE_SCROLL_VH : DESKTOP_SCROLL_VH;
    const filmViewportHeight = `calc(100svh - ${HEADER_OFFSET}px)`;

    const activeStage =
        stages.find(
            (stage) => progress >= stage.progressStart && progress <= stage.progressEnd
        ) ?? stages[stages.length - 1];

    const activeStageIndex = stages.findIndex((s) => s.id === activeStage.id);
    const isFinalStage = activeStageIndex === stages.length - 1;

    const drawFrame = (frameNumber: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const nearest = getNearestLoadedFrame(frameNumber, loadedRef.current, TOTAL_FRAMES);
        const image = imagesRef.current[nearest - 1];
        if (!image) return;

        drawImageCover(canvas, image);
        setDisplayedFrame((prev) => (prev !== nearest ? nearest : prev));
    };

    useEffect(() => {
        imagesRef.current = new Array(TOTAL_FRAMES).fill(null);
        loadedRef.current = new Array(TOTAL_FRAMES).fill(false);

        let cancelled = false;

        const preloadFrame = (frame: number) => {
            const img = new window.Image();
            img.decoding = "async";
            img.src = getFrameSrc(frame);

            img.onload = () => {
                if (cancelled) return;
                imagesRef.current[frame - 1] = img;
                loadedRef.current[frame - 1] = true;
                if (frame === 1) drawFrame(1);
            };

            img.onerror = () => {
                console.error(`Missing frame: ${getFrameSrc(frame)}`);
            };
        };

        for (let i = 1; i <= TOTAL_FRAMES; i += 1) {
            preloadFrame(i);
        }

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let raf = 0;

        const animate = () => {
            const current = smoothFrameRef.current;
            const target = targetFrameRef.current;
            const diff = target - current;

            if (Math.abs(diff) < 0.02) {
                smoothFrameRef.current = target;
            } else {
                smoothFrameRef.current = current + diff * 0.14;
            }

            const frameToDraw = clamp(Math.round(smoothFrameRef.current), 1, TOTAL_FRAMES);
            drawFrame(frameToDraw);

            raf = window.requestAnimationFrame(animate);
        };

        raf = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(raf);
        };
    }, []);

    useEffect(() => {
        const onResize = () => {
            const frameToDraw = clamp(Math.round(smoothFrameRef.current), 1, TOTAL_FRAMES);
            drawFrame(frameToDraw);
        };

        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        let ticking = false;

        const update = () => {
            ticking = false;
            const section = filmSectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalScrollable = Math.max(section.offsetHeight - viewportHeight, 1);
            const scrolled = clamp(-rect.top, 0, totalScrollable);
            const nextProgress = clamp(scrolled / totalScrollable, 0, 1);
            const nextFrame = clamp(
                Math.round(nextProgress * (TOTAL_FRAMES - 1)) + 1,
                1,
                TOTAL_FRAMES
            );

            setProgress((prev) => (prev !== nextProgress ? nextProgress : prev));
            targetFrameRef.current = nextFrame;
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
    }, [isMobile]);

    return (
        <main className="bg-[#060709] text-white">
            <section
                ref={filmSectionRef}
                className="relative"
                style={{ height: `${scrollHeight}vh` }}
            >
                <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-screen overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,165,84,0.10),transparent_28%),linear-gradient(180deg,#07080a_0%,#060709_100%)]" />
                    <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
                    <div className="absolute left-[-6%] top-[6%] h-52 w-52 rounded-full bg-[#f97316]/12 blur-3xl" />
                    <div className="absolute right-[-4%] top-[12%] h-44 w-44 rounded-full bg-white/[0.04] blur-3xl" />
                </div>

                <div
                    className="fixed inset-x-0 z-10"
                    style={{ top: `${HEADER_OFFSET}px`, height: filmViewportHeight }}
                >
                    <div className="flex h-full flex-col">
                        <div
                            className={`relative shrink-0 overflow-hidden border-b border-white/8 bg-[#060709] ${isMobile ? "h-[38%]" : "h-[60%]"
                                }`}
                        >
                            <canvas
                                ref={canvasRef}
                                className="block h-full w-full"
                                aria-label="Scroll-driven architectural transformation"
                            />

                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.22)_100%)]" />

                            <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/25 px-4 py-2 backdrop-blur-md sm:left-8 sm:top-8">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/82 sm:text-[11px]">
                                    Scroll Film · Frame {padFrameNumber(displayedFrame)} / {TOTAL_FRAMES}
                                </span>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                                <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-md">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/76 sm:text-[11px]">
                                        {activeStage.label}
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffc98c] sm:text-[11px]">
                                        {Math.round(progress * 100)}%
                                    </span>
                                </div>

                                <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/12">
                                    <div
                                        className="h-full rounded-full bg-[#f97316] shadow-[0_0_18px_rgba(249,115,22,0.55)] transition-[width] duration-150"
                                        style={{ width: `${progress * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="min-h-0 flex-1 border-t border-white/4 bg-[#060709]">
                            <div className="mx-auto h-full w-full max-w-[1450px] px-4 py-4 sm:px-8 md:px-10 lg:px-14 lg:py-5">
                                <div
                                    className={`grid h-full gap-4 lg:gap-8 ${isMobile ? "grid-cols-1 auto-rows-min" : "lg:grid-cols-[0.8fr_0.2fr]"
                                        }`}
                                >
                                    <div className="min-h-0 rounded-[24px] border border-white/10 bg-[#0b0d10] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:rounded-[28px] sm:p-6 md:p-8">
                                        <div className="mb-5 flex items-center gap-4">
                                            <StageIcon index={activeStageIndex} active />
                                            <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#f97316] md:text-[11px]">
                                                {activeStage.label}
                                            </div>
                                        </div>

                                        <div key={activeStage.id} className="homepage-stage-fade">
                                            <h1 className="max-w-[900px] text-[18px] font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-[30px] md:text-[40px] lg:text-[50px]">
                                                {activeStage.title}
                                            </h1>

                                            <p className="mt-4 max-w-[860px] text-[13px] leading-6 text-white/72 sm:text-[15px] md:text-[17px] md:leading-8">
                                                {activeStage.body}
                                            </p>
                                        </div>

                                        <div className="mt-6">
                                            {isFinalStage ? (
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                                    <Link
                                                        href="/contact"
                                                        className="pointer-events-auto inline-flex min-h-[56px] items-center justify-center rounded-[16px] bg-[#f97316] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:bg-[#ea580c] hover:shadow-[0_14px_30px_rgba(249,115,22,0.28)] sm:text-[13px]"
                                                    >
                                                        Start a Project Review
                                                    </Link>

                                                    <Link
                                                        href="/projects"
                                                        className="pointer-events-auto inline-flex min-h-[56px] items-center justify-center rounded-[16px] border border-white/14 bg-white/[0.03] px-8 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition duration-300 hover:-translate-y-[2px] hover:border-[#f97316] hover:text-[#f97316] sm:text-[13px]"
                                                    >
                                                        View Projects
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="rounded-[16px] border border-white/10 bg-black/20 px-5 py-4 text-[12px] uppercase tracking-[0.18em] text-white/58 md:text-[13px]">
                                                    Scroll to continue the transformation
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        {stages.map((stage, index) => {
                                            const active = index === activeStageIndex;
                                            return (
                                                <div
                                                    key={stage.id}
                                                    className={`rounded-[20px] border px-4 py-4 transition-all duration-300 ${active
                                                            ? "border-[#f97316]/35 bg-[#f97316]/10 shadow-[0_0_0_1px_rgba(249,115,22,0.10)]"
                                                            : "border-white/8 bg-white/[0.03]"
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <StageIcon index={index} active={active} />
                                                        <div className="min-w-0">
                                                            <div
                                                                className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${active ? "text-[#ffc98c]" : "text-white/45"
                                                                    }`}
                                                            >
                                                                {stage.label}
                                                            </div>
                                                            <div
                                                                className={`mt-2 text-[13px] leading-6 ${active ? "text-white/90" : "text-white/60"
                                                                    }`}
                                                            >
                                                                {stage.title}
                                                            </div>
                                                        </div>
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

            <div style={{ height: `calc(${scrollHeight}vh - 100svh + ${HEADER_OFFSET}px)` }} />

            <section className="relative z-20 border-t border-white/6 bg-[#0b0d10]">
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

            <style jsx global>{`
        .homepage-stage-fade {
          animation: homepageStageFade 420ms ease;
        }

        @keyframes homepageStageFade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </main>
    );
}