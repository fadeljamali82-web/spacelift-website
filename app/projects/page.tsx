'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type RevenueItem = {
    label: string;
    value: string;
};

type Project = {
    slug: string;
    region: string;
    title: string;
    location: string;
    industry: string;
    client: string;
    value: string;
    imageCandidates: string[];
    summary: string;
    scope: string[];
    revenue: RevenueItem[];
};

const projects: Project[] = [
    {
        slug: 'aldar-retail-destination',
        region: 'UAE',
        title: 'Premium Retail Destination Immersive Surface Rollout',
        location: 'Abu Dhabi, UAE',
        industry: 'Retail / Lifestyle / Mixed-Use Destination',
        client: 'Aldar Community Retail Destination Experience Center',
        value: '$3.6M',
        imageCandidates: [
            '/images/projects-aldar.png',
            '/images/projects-aldar.jpg',
            '/images/projects-aldar.jpeg',
            '/images/projects-aldar.webp',
        ],
        summary:
            'A premium retail destination received a multi-zone visual enhancement package across luxury corridors, pop-up areas, limited-edition seasonal campaign spaces, and branded lounge environments.',
        scope: [
            'Printed floor feature zones',
            'Seasonal luxury corridor wraps',
            'Event activation backdrops',
            'Premium soft signage',
            'Boutique-specific branded surface kits',
            'Photo-op experiential zones',
        ],
        revenue: [
            { label: 'Printed flooring and rug-style features', value: '$940K' },
            { label: 'Corridor wraps and wall systems', value: '$1.05M' },
            { label: 'Seasonal campaign assets', value: '$620K' },
            { label: 'Experiential installations', value: '$540K' },
            { label: 'Design and adaptation packages', value: '$230K' },
            { label: 'Logistics and install support', value: '$220K' },
        ],
    },
    {
        slug: 'dubai-silicon-oasis-hq',
        region: 'UAE',
        title: 'Corporate Headquarters Brand Environment System',
        location: 'Dubai, UAE',
        industry: 'Corporate / Financial / Technology',
        client: 'Dubai Silicon Oasis',
        value: '$2.4M',
        imageCandidates: [
            '/images/projects-dubai-silicon.png',
            '/images/projects-dubai-silicon.jpg',
            '/images/projects-dubai-silicon.jpeg',
            '/images/projects-dubai-silicon.webp',
        ],
        summary:
            'A major corporate headquarters received a branded interior environment across its lobby, executive floors, innovation center, meeting suites, and event hall.',
        scope: [
            'Corporate-branded flooring inserts and area systems',
            'Wall graphics and acoustic textile surfaces',
            'Executive briefing room surface treatments',
            'Innovation center visual storytelling zones',
            'Reception and corridor feature panels',
            'Internal event branding toolkit',
        ],
        revenue: [
            { label: 'Flooring and textile elements', value: '$620K' },
            { label: 'Wall and acoustic surfaces', value: '$770K' },
            { label: 'Innovation and storytelling areas', value: '$420K' },
            { label: 'Executive areas', value: '$260K' },
            { label: 'Design system and approvals', value: '$170K' },
            { label: 'Installation support', value: '$160K' },
        ],
    },
    {
        slug: 'hawana-salalah-resort-cluster',
        region: 'Oman',
        title: 'Resort Cluster Coastal Branding Package',
        location: 'Salalah, Oman',
        industry: 'Resorts / Tourism / Leisure',
        client: 'Hawana Salalah Resort Cluster',
        value: '$1.8M',
        imageCandidates: [
            '/images/projects-hawana-salalah.png',
            '/images/projects-hawana-salalah.jpg',
            '/images/projects-hawana-salalah.jpeg',
            '/images/projects-hawana-salalah.webp',
        ],
        summary:
            'A resort cluster received coordinated visual packages across three coastal properties, focusing on lobby identity, corridor treatment, select suite visuals, spa zones, and event environments.',
        scope: [
            'Signature printed rugs and flooring elements',
            'Spa and lounge wall treatments',
            'Branded event backdrops',
            'Suite-level feature walls',
            'Select ceiling and soft partition treatments',
        ],
        revenue: [
            { label: 'Flooring and rugs', value: '$620K' },
            { label: 'Wall and spa treatments', value: '$470K' },
            { label: 'Event and lounge assets', value: '$260K' },
            { label: 'Suite visual packages', value: '$190K' },
            { label: 'Design, samples, and property adaptation', value: '$130K' },
            { label: 'Installation support', value: '$130K' },
        ],
    },
    {
        slug: 'riyadh-exhibitions-modular-branding',
        region: 'Saudi Arabia',
        title: 'Mega Event Venue Modular Branding Program',
        location: 'Riyadh, Saudi Arabia',
        industry: 'Events / Government / Exhibition / Entertainment',
        client: 'Riyadh Exhibitions Company (REC)',
        value: '$4.5M',
        imageCandidates: [
            '/images/projects-riyadh-exhibitions.png',
            '/images/projects-riyadh-exhibitions.jpg',
            '/images/projects-riyadh-exhibitions.jpeg',
            '/images/projects-riyadh-exhibitions.webp',
        ],
        summary:
            'A major venue received modular surface branding systems for conferences, summits, cultural forums, and premium exhibitions, with a focus on speed, prestige, and repeat usability.',
        scope: [
            'Modular floor branding packages',
            'Event hall graphics',
            'Wall and entry sequence wraps',
            'VIP lounge and protocol room finishing systems',
            'Premium sponsor integration areas',
            'Repeatable installation kits for multiple event formats',
        ],
        revenue: [
            { label: 'Modular flooring packages', value: '$1.35M' },
            { label: 'Hall and corridor surface systems', value: '$1.12M' },
            { label: 'VIP and protocol environment packages', value: '$620K' },
            { label: 'Sponsor and event integration assets', value: '$510K' },
            { label: 'Design and event adaptation system', value: '$430K' },
            { label: 'Project and installation coordination', value: '$470K' },
        ],
    },
    {
        slug: 'almoosa-healthcare-refresh',
        region: 'Saudi Arabia',
        title: 'Private Healthcare Network Interior Refresh',
        location: 'Dammam, Saudi Arabia',
        industry: 'Healthcare / Private Medical / Wellness',
        client: 'Almoosa Health Group Grand Hospital',
        value: '$1.3M',
        imageCandidates: [
            '/images/projects-almoosa.png',
            '/images/projects-almoosa.jpg',
            '/images/projects-almoosa.jpeg',
            '/images/projects-almoosa.webp',
            '/images/project-almoosa.png',
            '/images/almoosa-project.png',
        ],
        summary:
            'A healthcare group received a soft-surface interior refresh designed to elevate the visual experience across private clinics, specialty waiting areas, administrative corridors, and wellness lounges.',
        scope: [
            'Durable soft-surface visual systems',
            'Waiting room wall treatments',
            'Corridor wayfinding graphics',
            'Pediatric and family lounge visual zones',
            'Branded flooring accents',
        ],
        revenue: [
            { label: 'Flooring accents and durable textiles', value: '$310K' },
            { label: 'Wall visual systems', value: '$390K' },
            { label: 'Wayfinding and patient-facing graphics', value: '$180K' },
            { label: 'Wellness and family area packages', value: '$150K' },
            { label: 'Design and compliance review', value: '$120K' },
            { label: 'Installation', value: '$150K' },
        ],
    },
    {
        slug: 'vakko-rollout-pilot',
        region: 'Turkey',
        title: 'High-End Retail Chain National Rollout Pilot',
        location: 'Istanbul + Ankara Pilot, Turkey',
        industry: 'Retail / Chain Stores / Lifestyle',
        client: 'Vakko Retail Rollout Pilot',
        value: '$1.6M',
        imageCandidates: [
            '/images/projects-vakko.png',
            '/images/projects-vakko.jpg',
            '/images/projects-vakko.jpeg',
            '/images/projects-vakko.webp',
        ],
        summary:
            'A premium retail chain engaged our team for a pilot rollout across flagship stores to test branded floor features, wall surface enhancements, fitting lounge visuals, and seasonal campaign systems.',
        scope: [
            'Flagship store flooring kits',
            'Campaign wall graphics',
            'Branded fitting lounge treatments',
            'Window-adjacent visual surfaces',
            'Rollout standards manual for future branches',
        ],
        revenue: [
            { label: 'Flooring kits', value: '$420K' },
            { label: 'Wall and branded surface systems', value: '$470K' },
            { label: 'Seasonal campaign packages', value: '$240K' },
            { label: 'Lounge and focal zones', value: '$150K' },
            { label: 'Design standardization and prototyping', value: '$150K' },
            { label: 'Install and pilot management', value: '$170K' },
        ],
    },
];

const stats = [
    { label: 'Projects Featured', value: '06' },
    { label: 'Regional Markets', value: '04' },
    { label: 'Pipeline Value', value: '$15.2M' },
];

function SmartProjectImage({
    candidates,
    alt,
    priority = false,
    className = '',
}: {
    candidates: string[];
    alt: string;
    priority?: boolean;
    className?: string;
}) {
    const [index, setIndex] = useState(0);
    const [failed, setFailed] = useState(false);

    const src = candidates[index];

    if (failed || !src) {
        return (
            <div
                className={`flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#111_0%,#1a1a1a_40%,#0d0d0d_100%)] ${className}`}
            >
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full border border-[#f39a37]/30 bg-[#f39a37]/10 shadow-[0_0_30px_rgba(243,154,55,0.22)]" />
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
                        Project Image Placeholder
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={className}
            onError={() => {
                if (index < candidates.length - 1) {
                    setIndex((prev) => prev + 1);
                } else {
                    setFailed(true);
                }
            }}
        />
    );
}

export default function ProjectsPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = projects[activeIndex];

    const totalValue = useMemo(() => {
        return projects.reduce((total, project) => {
            const numeric = Number(project.value.replace(/[$M]/g, ''));
            return total + numeric;
        }, 0);
    }, []);

    const handleCardMouseMove = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        event.currentTarget.style.setProperty('--mx', `${x}px`);
        event.currentTarget.style.setProperty('--my', `${y}px`);
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#060606] text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,175,84,0.16),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(255,149,0,0.10),_transparent_20%),linear-gradient(180deg,_#0a0a0a_0%,_#050505_100%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:70px_70px]" />
            <div className="glow-orb glow-orb-1" />
            <div className="glow-orb glow-orb-2" />
            <div className="glow-orb glow-orb-3" />

            <section className="relative mx-auto max-w-[1440px] px-6 pb-20 pt-28 sm:px-8 lg:px-12 lg:pb-24 lg:pt-32">
                <div className="mx-auto max-w-[980px] text-center">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72 backdrop-blur-xl">
                        <span className="h-2 w-2 rounded-full bg-[#f39a37] shadow-[0_0_18px_rgba(243,154,55,0.9)]" />
                        Featured Regional Work
                    </div>

                    <h1 className="mt-7 text-[44px] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[58px] lg:text-[78px]">
                        Projects
                    </h1>

                    <p className="mx-auto mt-6 max-w-[780px] text-[16px] leading-8 text-white/68 sm:text-[18px]">
                        A curated gallery of premium surface and spatial branding projects across hospitality,
                        retail, corporate, exhibitions, healthcare, and destination environments. Each case
                        brings together visual storytelling, material precision, and execution at architectural
                        scale.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                    {stats.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-5 text-center backdrop-blur-xl"
                        >
                            <div className="text-[28px] font-semibold tracking-[-0.03em] text-white">
                                {item.value}
                            </div>
                            <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/48">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.75fr)] xl:gap-10">
                    <div className="lg:sticky lg:top-28 lg:h-fit">
                        <div className="group relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.04] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_30%,transparent_70%,rgba(243,154,55,0.14))]" />

                            <div className="relative aspect-[1.1/1] overflow-hidden rounded-[26px] bg-[#0b0b0b]">
                                <SmartProjectImage
                                    key={`${activeProject.slug}-${activeProject.imageCandidates[0]}`}
                                    candidates={activeProject.imageCandidates}
                                    alt={activeProject.client}
                                    priority
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.18)_50%,rgba(0,0,0,0.65)_100%)]" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/68">
                                        <span className="rounded-full border border-white/14 bg-black/20 px-3 py-2 backdrop-blur-md">
                                            {activeProject.region}
                                        </span>
                                        <span className="rounded-full border border-white/14 bg-black/20 px-3 py-2 backdrop-blur-md">
                                            {activeProject.industry}
                                        </span>
                                    </div>

                                    <h2 className="mt-4 max-w-[720px] text-[28px] font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-[34px]">
                                        {activeProject.title}
                                    </h2>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                        <DetailPill label="Client" value={activeProject.client} />
                                        <DetailPill label="Location" value={activeProject.location} />
                                        <DetailPill label="Project Value" value={activeProject.value} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/44">
                                        Active Project Overview
                                    </p>
                                    <p className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-white">
                                        {activeProject.client}
                                    </p>
                                </div>
                                <div className="rounded-full border border-[#f39a37]/30 bg-[#f39a37]/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ffc98c]">
                                    {activeProject.value}
                                </div>
                            </div>

                            <p className="mt-5 text-[15px] leading-7 text-white/68">{activeProject.summary}</p>

                            <div className="mt-7 grid gap-6 xl:grid-cols-2">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">Scope</p>
                                    <div className="mt-4 space-y-3">
                                        {activeProject.scope.map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-start gap-3 rounded-[18px] border border-white/8 bg-black/16 px-4 py-3"
                                            >
                                                <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#f39a37] shadow-[0_0_16px_rgba(243,154,55,0.85)]" />
                                                <span className="text-[14px] leading-6 text-white/72">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">
                                        Revenue Breakdown
                                    </p>
                                    <div className="mt-4 space-y-3">
                                        {activeProject.revenue.map((item) => (
                                            <div
                                                key={item.label}
                                                className="rounded-[18px] border border-white/8 bg-black/16 px-4 py-3"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <p className="max-w-[75%] text-[13px] leading-5 text-white/62">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-[14px] font-semibold text-white">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {projects.map((project, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={project.slug}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    onMouseMove={handleCardMouseMove}
                                    className={`project-card group relative block w-full overflow-hidden rounded-[30px] border text-left transition-all duration-500 ${isActive
                                            ? 'border-[#f39a37]/40 bg-[rgba(255,255,255,0.07)] shadow-[0_26px_90px_rgba(0,0,0,0.35)]'
                                            : 'border-white/10 bg-white/[0.035] hover:border-white/18 hover:bg-white/[0.055]'
                                        }`}
                                >
                                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 project-spotlight" />

                                    <div className="relative grid gap-5 p-5 sm:p-6 xl:grid-cols-[165px_minmax(0,1fr)] xl:items-center">
                                        <div className="relative aspect-[1.1/0.9] overflow-hidden rounded-[22px] border border-white/10 bg-black/20">
                                            <SmartProjectImage
                                                candidates={project.imageCandidates}
                                                alt={project.client}
                                                className={`object-cover transition-transform duration-700 ${isActive ? 'scale-[1.03]' : 'group-hover:scale-[1.04]'
                                                    }`}
                                            />
                                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.40)_100%)]" />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="rounded-full border border-white/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                                                    {project.region}
                                                </span>
                                                <span className="rounded-full border border-white/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                                                    {project.value}
                                                </span>
                                                <span className="rounded-full border border-white/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
                                                    {project.location}
                                                </span>
                                            </div>

                                            <div className="mt-4 flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-[22px] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                                                        {project.title}
                                                    </h3>
                                                    <p className="mt-2 text-[14px] text-[#ffc98c]">{project.client}</p>
                                                </div>

                                                <div
                                                    className={`mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-500 sm:flex ${isActive
                                                            ? 'border-[#f39a37]/45 bg-[#f39a37]/14 text-[#ffd39d]'
                                                            : 'border-white/12 bg-white/5 text-white/52 group-hover:border-white/20 group-hover:text-white/80'
                                                        }`}
                                                >
                                                    ↗
                                                </div>
                                            </div>

                                            <p className="mt-4 max-w-[900px] text-[14px] leading-7 text-white/62">
                                                {project.summary}
                                            </p>

                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {project.scope.slice(0, 3).map((item) => (
                                                    <span
                                                        key={item}
                                                        className="rounded-full border border-white/10 bg-black/18 px-3 py-2 text-[11px] font-medium tracking-[0.02em] text-white/60"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-14 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-10 text-center shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8 lg:px-12">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/44">
                        Ready to Build the Next One
                    </p>

                    <h2 className="mx-auto mt-5 max-w-[780px] text-[32px] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[42px] lg:text-[54px]">
                        Premium surface systems, architectural execution, and regional delivery designed to
                        scale.
                    </h2>

                    <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-8 text-white/64 sm:text-[16px]">
                        From retail flagships to destination environments, we develop high-impact visual spaces
                        with material control, installation readiness, and design precision built into every
                        phase.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            className="inline-flex min-h-[58px] items-center justify-center rounded-full bg-[#f39a37] px-8 text-[13px] font-semibold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_18px_40px_rgba(243,154,55,0.35)]"
                        >
                            Start a Project
                        </Link>

                        <Link
                            href="/about"
                            className="inline-flex min-h-[58px] items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-8 text-[13px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/24 hover:bg-white/[0.08]"
                        >
                            Explore Our Approach
                        </Link>
                    </div>

                    <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-white/34">
                        Featured pipeline value: ${totalValue.toFixed(1)}M across four markets
                    </p>
                </div>
            </section>

            <style jsx global>{`
        .glow-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.32;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .glow-orb-1 {
          top: 120px;
          left: -120px;
          width: 320px;
          height: 320px;
          background: rgba(243, 154, 55, 0.22);
          animation: floatOrbOne 11s ease-in-out infinite;
        }

        .glow-orb-2 {
          top: 25%;
          right: -80px;
          width: 280px;
          height: 280px;
          background: rgba(255, 186, 95, 0.16);
          animation: floatOrbTwo 14s ease-in-out infinite;
        }

        .glow-orb-3 {
          bottom: 8%;
          left: 40%;
          width: 320px;
          height: 320px;
          background: rgba(255, 125, 12, 0.12);
          animation: floatOrbThree 13s ease-in-out infinite;
        }

        .project-card {
          --mx: 50%;
          --my: 50%;
          will-change: transform, border-color, background-color;
          transform: translateZ(0);
        }

        .project-card:hover {
          transform: translateY(-3px);
        }

        .project-spotlight {
          background: radial-gradient(
            500px circle at var(--mx) var(--my),
            rgba(243, 154, 55, 0.18),
            rgba(255, 255, 255, 0.04) 24%,
            transparent 56%
          );
        }

        @keyframes floatOrbOne {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(60px, 30px, 0) scale(1.08);
          }
        }

        @keyframes floatOrbTwo {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-50px, 35px, 0) scale(1.1);
          }
        }

        @keyframes floatOrbThree {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -35px, 0) scale(1.06);
          }
        }
      `}</style>
        </main>
    );
}

function DetailPill({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[20px] border border-white/12 bg-black/18 px-4 py-4 backdrop-blur-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
                {label}
            </p>
            <p className="mt-2 text-[14px] leading-6 text-white/84">{value}</p>
        </div>
    );
}