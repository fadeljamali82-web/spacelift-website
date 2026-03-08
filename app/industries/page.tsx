"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type IndustryType = {
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    provideTitle: string;
    provideItems: string[];
    image: string;
    alt: string;
    theme: "light" | "dark";
};

const industries: IndustryType[] = [
    {
        id: "venues",
        eyebrow: "PUBLIC VENUES",
        title: "High-traffic environments need systems that perform under pressure and still look resolved.",
        body:
            "Convention spaces, event environments, arena-adjacent interiors, and other public-facing venues operate under real pressure: foot traffic, deadlines, fast turnarounds, public scrutiny, and installation constraints. These are not environments where fragmented delivery holds up well. They need stronger coordination, durable finish quality, and systems that arrive ready for real execution.",
        provideTitle: "What we can provide for public venue environments",
        provideItems: [
            "Branded surface systems for high-traffic interior zones",
            "Wayfinding, directional, and environment graphics with stronger finish control",
            "Install-ready visual packages for event and venue environments",
            "Coordinated production and rollout support for large-format public-facing spaces",
        ],
        image: "/images/industries-sports.png",
        alt: "High-traffic public venue with premium branded surface execution",
        theme: "light",
    },
    {
        id: "hospitality",
        eyebrow: "HOSPITALITY",
        title: "Guest-facing spaces need premium finish quality without operational chaos.",
        body:
            "Hospitality environments are remembered visually. Guests notice atmosphere, finish discipline, consistency, and whether the space feels intentional. At the same time, operators need upgrades, refreshes, and branded surfaces that can be delivered with less disruption and stronger coordination. That is where a one-stop system creates real value.",
        provideTitle: "What we can provide for hospitality environments",
        provideItems: [
            "Refined branded interior surface systems for guest-facing spaces",
            "Premium finish solutions for lounges, corridors, reception zones, and hospitality interiors",
            "Coordinated phased refresh support to reduce disruption",
            "Material-aware execution that supports atmosphere, durability, and consistency",
        ],
        image: "/images/industries-hospitality.png",
        alt: "Premium hospitality interior with controlled branded surface execution",
        theme: "dark",
    },
    {
        id: "corporate",
        eyebrow: "WORKPLACE INTERIORS",
        title: "Corporate spaces need physical brand expression that feels deliberate, not improvised.",
        body:
            "Workplace and branded interior environments carry the burden of representation. They need to express brand standards physically through controlled materials, refined detailing, and cleaner execution across multiple surfaces. When those systems are fragmented, the space can look expensive without actually feeling resolved. SpaceLift helps close that gap.",
        provideTitle: "What we can provide for workplace interiors",
        provideItems: [
            "Branded multi-surface systems for corporate interiors",
            "Environmental graphics and finish applications aligned with brand standards",
            "Design-aware technical translation from concept to installation",
            "More coordinated execution across walls, panels, graphics, and architectural touchpoints",
        ],
        image: "/images/industries-corporate.png",
        alt: "Corporate branded interior with premium architectural execution",
        theme: "light",
    },
    {
        id: "cultural",
        eyebrow: "CULTURAL & DESTINATION SPACES",
        title: "Destination-driven environments need atmosphere, control, and lasting visual credibility.",
        body:
            "Cultural and destination-oriented spaces often depend on physical storytelling. The environment must create mood, clarity, and continuity while still standing up to real-world use. These spaces benefit from surface systems that feel immersive and refined without sacrificing technical discipline, finish control, or long-term credibility.",
        provideTitle: "What we can provide for cultural and destination spaces",
        provideItems: [
            "Experience-driven surface systems with stronger visual storytelling",
            "Premium architectural graphics and branded spatial treatments",
            "Material and finish execution designed to support atmosphere and cohesion",
            "Controlled production for spaces where visual credibility matters deeply",
        ],
        image: "/images/industries-cultural.png",
        alt: "Cultural or destination environment with premium branded surface storytelling",
        theme: "dark",
    },
];

function Reveal({
    children,
    delay = 0,
    y = 24,
}: {
    children: React.ReactNode;
    delay?: number;
    y?: number;
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
                transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
                transition: `opacity 760ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 960ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function IndustryImage({
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
            className="group premium-image-card relative overflow-hidden rounded-[22px] border border-black/5 bg-black/5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[5px] hover:shadow-[0_34px_110px_rgba(0,0,0,0.26)] md:rounded-[28px]"
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

function IndustryBlock({
    industry,
    index,
}: {
    industry: IndustryType;
    index: number;
}) {
    const reverse = index % 2 === 1;
    const isDark = industry.theme === "dark";

    return (
        <section
            className={`relative overflow-hidden ${isDark ? "bg-[#0c0f14] text-white" : "bg-[#f6f4ef] text-[#111111]"
                }`}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                    className={`ambient-orb absolute -top-20 ${reverse ? "right-[8%]" : "left-[8%]"
                        } h-44 w-44 rounded-full blur-3xl md:h-56 md:w-56 ${isDark ? "bg-[#f97316]/12" : "bg-[#f97316]/8"
                        }`}
                />
                <div
                    className={`ambient-orb-delayed absolute bottom-[12%] ${reverse ? "left-[12%]" : "right-[12%]"
                        } h-28 w-28 rounded-full blur-3xl ${isDark ? "bg-white/[0.03]" : "bg-[#f97316]/6"
                        }`}
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
                                <span className="h-px w-8 bg-[#f97316] md:w-10" />
                                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                    {industry.eyebrow}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={80}>
                            <h2
                                className={`max-w-[760px] text-[38px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[46px] md:text-[56px] lg:text-[62px] xl:text-[74px] ${isDark ? "text-white" : "text-[#111111]"
                                    }`}
                            >
                                {industry.title}
                            </h2>
                        </Reveal>

                        <Reveal delay={150}>
                            <p
                                className={`mt-6 max-w-[720px] text-[16px] leading-7 md:mt-8 md:text-[18px] md:leading-8 lg:text-[19px] ${isDark ? "text-white/70" : "text-[#5f6672]"
                                    }`}
                            >
                                {industry.body}
                            </p>
                        </Reveal>

                        <Reveal delay={220}>
                            <div className="mt-8 rounded-[22px] border border-black/5 bg-white/50 p-5 backdrop-blur-sm md:mt-10 md:p-6">
                                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                    {industry.provideTitle}
                                </div>

                                <ul className="mt-4 space-y-4">
                                    {industry.provideItems.map((item, i) => (
                                        <li
                                            key={i}
                                            className={`flex items-start gap-3 text-[14px] leading-6 md:text-[15px] md:leading-7 ${isDark ? "text-[#d2d8df]" : "text-[#3f4650]"
                                                }`}
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>

                    <div
                        className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"
                            }`}
                    >
                        <Reveal delay={120}>
                            <IndustryImage
                                src={industry.image}
                                alt={industry.alt}
                                priority={index < 2}
                            />
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function IndustriesPage() {
    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="mx-auto max-w-[1450px] px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20 lg:px-14 lg:pb-20 lg:pt-24">
                <Reveal>
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-[#f97316] md:w-10" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                            INDUSTRIES
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={80}>
                    <h1 className="max-w-[1120px] text-[40px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:text-[60px] lg:text-[78px]">
                        Built for Environments Where Quality, Scale, and Public Execution All Matter.
                    </h1>
                </Reveal>

                <Reveal delay={150}>
                    <p className="mt-6 max-w-[900px] text-[16px] leading-7 text-[#5f6672] md:mt-8 md:text-[18px] md:leading-8 lg:text-[20px]">
                        SpaceLift Studio focuses on sectors where fragmented delivery creates
                        visible risk and where a more coordinated multi-surface system creates
                        real value. We work where finish quality, operational pressure,
                        deployment readiness, and public-facing credibility all have to hold
                        at the same time.
                    </p>
                </Reveal>

                <Reveal delay={220}>
                    <div className="premium-intro-panel mt-10 grid gap-5 overflow-hidden rounded-[24px] border border-black/5 bg-white/55 p-5 backdrop-blur-sm md:mt-12 md:grid-cols-3 md:gap-6 md:p-7">
                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                PERFORMANCE
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                Built for sectors where systems need to install cleanly, perform in
                                real use, and maintain finish quality under pressure.
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                COORDINATION
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                Stronger control across translation, production, logistics, and
                                rollout for buyers who need more than disconnected vendors.
                            </p>
                        </div>

                        <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f97316]">
                                CREDIBILITY
                            </div>
                            <p className="mt-3 text-[14px] leading-6 text-[#4a515b] md:text-[15px] md:leading-7">
                                Premium surface execution that helps environments look resolved,
                                intentional, and consistent in public-facing conditions.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </section>

            {industries.map((industry, index) => (
                <IndustryBlock key={industry.id} industry={industry} index={index} />
            ))}

            <section className="mx-auto max-w-[1450px] px-6 pb-16 pt-14 md:px-10 md:pb-20 md:pt-16 lg:px-14 lg:pb-24 lg:pt-20">
                <Reveal>
                    <div className="rounded-[26px] border border-black/5 bg-white/60 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-8 lg:p-10">
                        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                                    INDUSTRY FIT
                                </div>

                                <h2 className="mt-4 max-w-[880px] text-[34px] font-black leading-[0.98] tracking-[-0.05em] sm:text-[40px] md:text-[48px] lg:text-[58px]">
                                    The right sectors are the ones where fragmented execution becomes visible fast.
                                </h2>

                                <p className="mt-5 max-w-[820px] text-[16px] leading-7 text-[#5f6672] md:text-[18px] md:leading-8">
                                    That is where SpaceLift is strongest: environments that need more
                                    coordination, better finish discipline, and a more accountable
                                    path from strategy to installed result.
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