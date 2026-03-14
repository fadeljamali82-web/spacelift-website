"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    TrendingUp,
    Zap,
    ChevronRight,
    Download,
    Layers,
    Clock,
} from "lucide-react";

const CRM_URL =
    "https://script.google.com/macros/s/AKfycbyWwK2u5jD7hyYSWCN_OkvQEfF5TLzcxvlBYu5arbASOMunIlGPBSJnXXbHDiyobBCUmA/exec";

const BUDGET_OPTIONS = [
    "Value-driven / Phased",
    "Standard CapEx",
    "Premium Rebranding",
    "Serious Asset Upgrade",
];

const TIMELINE_OPTIONS = [
    "Immediate",
    "Within 3 months",
    "3-6 months",
    "Evaluating / TBC",
];

const ENVIRONMENT_OPTIONS = [
    "Lobby/Entrance",
    "Corridors",
    "Guest Rooms",
    "Executive Suites",
    "Common Areas",
    "Exterior Facade",
];

const INDUSTRY_LABELS: Record<string, string> = {
    hospitality: "Hospitality",
    corporate: "Corporate",
    retail: "Retail",
    healthcare: "Healthcare",
    venue: "Event / Venue",
    mixeduse: "Mixed-Use",
};

type StrategyKey =
    | "hospitality"
    | "corporate"
    | "retail"
    | "healthcare"
    | "venue"
    | "mixeduse";

type Strategy = {
    theme: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    stats: [number, number];
};

const STRATEGIES: Record<StrategyKey, Strategy> = {
    hospitality: {
        theme: "Hospitality Repositioning",
        p1: "{company} has an opportunity to elevate guest perception through a stronger physical environment. In hospitality, the visual language of arrival, circulation, and shared spaces influences how quality is perceived before service is even experienced.",
        p2: "The priority should be the highest-visibility guest touchpoints: lobby zones, elevator areas, corridors, and key public-facing surfaces. These are the areas where visual coherence, material refinement, and stronger finish quality can most quickly improve the overall impression of the property.",
        p3: "A targeted surface-led upgrade strategy can create premium visual impact without the disruption of a full renovation cycle. This allows the property to improve atmosphere, brand alignment, and perceived value while staying operational.",
        p4: "The recommended roadmap is to identify the highest-impact guest-facing zones first, define the correct material and finish logic for those environments, and deploy upgrades in a phased way that protects operations while strengthening market position.",
        stats: [25, 95],
    },
    corporate: {
        theme: "Workplace Repositioning",
        p1: "{company} can use its physical environment as a stronger extension of brand, culture, and professional credibility. In workplace settings, the environment should reinforce quality, alignment, and confidence rather than feel generic or visually unresolved.",
        p2: "The most important focus areas are arrival zones, meeting spaces, executive-facing environments, and high-traffic collaboration areas. These are the environments that most directly shape internal experience and external perception.",
        p3: "A coordinated surface and finish upgrade strategy creates a more premium and intentional workplace without the friction of a major construction-heavy intervention. The result is a stronger environment with less disruption to normal operations.",
        p4: "The recommended approach is to prioritize high-visibility brand-sensitive areas, apply refined material and surface systems, and implement improvements in a phased manner that supports continuity, professionalism, and long-term workplace quality.",
        stats: [40, 88],
    },
    retail: {
        theme: "Retail Environment Upgrade",
        p1: "{company} has an opportunity to strengthen customer perception by bringing the physical environment closer to the standard of the brand itself. In retail, the space must support product value, atmosphere, and visual distinction.",
        p2: "Priority should be placed on storefront impact zones, transaction points, customer journey areas, and any surfaces that frame product presentation. These are the environments that shape how customers interpret quality and exclusivity.",
        p3: "A fast, surface-led refresh strategy can improve visual appeal and in-store experience without the downtime and disruption of a traditional fit-out. This protects continuity while increasing the perceived strength of the retail environment.",
        p4: "The recommended roadmap is to identify the highest-impact retail touchpoints, align materials and finishes with brand expectations, and execute upgrades in a way that enhances the customer experience while preserving day-to-day operations.",
        stats: [15, 92],
    },
    healthcare: {
        theme: "Healthcare Trust Upgrade",
        p1: "{company} can strengthen patient and visitor confidence through a more refined, modern, and reassuring physical environment. In healthcare settings, visual clarity, calm, and material quality affect trust before care is even delivered.",
        p2: "The highest-priority zones are arrival areas, waiting environments, corridors, and other high-visibility patient-facing spaces. These areas carry the greatest influence on comfort, reassurance, and perceived quality of care.",
        p3: "A surface-led modernization strategy can improve the environment without the disruption associated with conventional renovation. This makes it possible to upgrade perception and atmosphere while maintaining continuity of operations.",
        p4: "The recommended path is to begin with the most visible patient-facing environments, define materials and finishes appropriate for both performance and presentation, and implement improvements in controlled phases that support care continuity.",
        stats: [45, 90],
    },
    venue: {
        theme: "Venue Relevance Upgrade",
        p1: "{company} has an opportunity to increase booking confidence and overall market appeal by improving the visual strength of the environment. For venues, atmosphere and first impression directly affect how the space is valued.",
        p2: "Priority should be placed on the areas guests and planners judge first: arrival moments, focal walls, bars, stages, circulation routes, and photo-sensitive spaces. These zones carry the greatest influence over perceived quality and event desirability.",
        p3: "A rapid visual upgrade strategy can improve the venue’s competitiveness without forcing a long closure period. This helps protect revenue while repositioning the space toward a more premium booking profile.",
        p4: "The recommended approach is to identify the highest-impact sales and experience zones, apply stronger material and surface treatments, and execute improvements in phases that preserve booking continuity while elevating the environment.",
        stats: [30, 96],
    },
    mixeduse: {
        theme: "Mixed-Use Asset Repositioning",
        p1: "{company} can protect and elevate asset perception by improving the quality of the shared physical environment. In mixed-use settings, common areas and high-traffic spaces play a major role in how the development is judged overall.",
        p2: "The most important focus areas are entry zones, resident or visitor commons, circulation areas, and any shared environments that shape first impression and day-to-day experience. These spaces signal the quality level of the asset as a whole.",
        p3: "A phased surface and finish upgrade strategy can strengthen perceived value without the cost and disruption of full reconstruction. This supports a more premium environment while preserving operational continuity.",
        p4: "The recommended roadmap is to prioritize the most visible shared environments, align finish quality with the intended positioning of the asset, and deploy a phased upgrade plan that keeps the development visually current and commercially competitive.",
        stats: [50, 92],
    },
};

type FormState = {
    fullName: string;
    company: string;
    email: string;
    industry: StrategyKey | "";
    timeline: string;
    budget: string;
    goals: string;
};

export default function SpaceLiftPortal() {
    const router = useRouter();
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);

    const [form, setForm] = useState<FormState>({
        fullName: "",
        company: "",
        email: "",
        industry: "",
        timeline: "",
        budget: "",
        goals: "",
    });

    const toggleEnv = (item: string) => {
        setSelectedEnvs((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const strategy = useMemo(() => {
        const selectedKey: StrategyKey =
            (form.industry as StrategyKey) || "hospitality";
        const s = STRATEGIES[selectedKey];
        const companyName = form.company.trim() || "Your Organization";

        const replaceCompany = (text: string) =>
            text.replace(/{company}/g, companyName);

        return {
            ...s,
            p1: replaceCompany(s.p1),
            p2: replaceCompany(s.p2),
            p3: replaceCompany(s.p3),
            p4: replaceCompany(s.p4),
        };
    }, [form.industry, form.company]);

    const updateField = <K extends keyof FormState>(
        key: K,
        value: FormState[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    async function handleSync() {
        if (!form.fullName.trim() || !form.company.trim() || !form.industry) {
            setSubmitError("Please complete Full Name, Company, and Industry Focus.");
            return;
        }

        setLoading(true);
        setSubmitError("");

        const payload = {
            Date: new Date().toLocaleString(),
            Source: "Website",
            Name: form.fullName.trim(),
            Company: form.company.trim(),
            Contact: form.email.trim(),
            Category: INDUSTRY_LABELS[form.industry],
            "Environment/D": selectedEnvs.join(", "),
            Goals: form.goals.trim(),
            Timeline: form.timeline,
            Budget: form.budget,
        };

        try {
            const response = await fetch(CRM_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            let result: any = null;

            try {
                result = text ? JSON.parse(text) : null;
            } catch {
                result = null;
            }

            if (!response.ok || (result && result.success === false)) {
                throw new Error(
                    result?.error || `Sync failed with status ${response.status}`
                );
            }

            setShowReport(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error: any) {
            console.error("CRM sync error:", error);
            setSubmitError(
                error?.message ||
                "The strategic report generated, but the Google Sheet sync failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F7F6F3] text-[#111111] font-sans">
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20 print:hidden"
                    >
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                            <div className="pt-4">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.3em] text-[#FF6A17]">
                                    <span className="h-px w-10 bg-current" />
                                    Strategic Audit
                                </div>

                                <h1 className="mb-10 text-[54px] font-bold leading-[0.92] tracking-[-0.05em] text-black lg:text-[92px]">
                                    Don&apos;t Rebuild.
                                    <br />
                                    Reposition.
                                </h1>

                                <p className="mb-12 max-w-xl text-2xl leading-relaxed text-neutral-500">
                                    Get a high-level strategic roadmap designed to maximize visual
                                    ROI and asset value.
                                </p>

                                <div className="grid gap-6">
                                    <div className="flex items-center gap-6 rounded-[30px] border border-neutral-200 bg-white p-8 shadow-sm">
                                        <Zap className="h-8 w-8 text-orange-500" />
                                        <div>
                                            <h4 className="text-lg font-bold text-black">
                                                Rapid Deployment
                                            </h4>
                                            <p className="text-sm opacity-50">
                                                Results in days, not months.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 rounded-[30px] border border-neutral-200 bg-white p-8 shadow-sm">
                                        <TrendingUp className="h-8 w-8 text-orange-500" />
                                        <div>
                                            <h4 className="text-lg font-bold text-black">
                                                Revenue Alignment
                                            </h4>
                                            <p className="text-sm opacity-50">
                                                Built to increase market authority.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[40px] border border-black/5 bg-[#F3EDE8] p-2 shadow-2xl">
                                <div className="space-y-8 rounded-[38px] bg-white p-8 lg:p-12">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-neutral-400">
                                                Full Name
                                            </label>
                                            <input
                                                value={form.fullName}
                                                onChange={(e) => updateField("fullName", e.target.value)}
                                                placeholder="Name"
                                                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-black outline-none focus:border-[#FF6A17]"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-neutral-400">
                                                Company
                                            </label>
                                            <input
                                                value={form.company}
                                                onChange={(e) => updateField("company", e.target.value)}
                                                placeholder="Company Name"
                                                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-black outline-none focus:border-[#FF6A17]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-neutral-400">
                                                Industry Focus
                                            </label>
                                            <select
                                                value={form.industry}
                                                onChange={(e) =>
                                                    updateField(
                                                        "industry",
                                                        e.target.value as StrategyKey | ""
                                                    )
                                                }
                                                className="h-14 w-full appearance-none rounded-2xl border border-neutral-200 bg-white px-5 text-black outline-none"
                                            >
                                                <option value="">Select Industry</option>
                                                {Object.entries(INDUSTRY_LABELS).map(([k, v]) => (
                                                    <option key={k} value={k}>
                                                        {v}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-neutral-400">
                                                Email
                                            </label>
                                            <input
                                                value={form.email}
                                                onChange={(e) => updateField("email", e.target.value)}
                                                placeholder="Email"
                                                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-black outline-none focus:border-[#FF6A17]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                            <Layers className="h-3 w-3" />
                                            Target Environments (Multi-Select)
                                        </label>

                                        <div className="flex flex-wrap gap-2">
                                            {ENVIRONMENT_OPTIONS.map((env) => {
                                                const isActive = selectedEnvs.includes(env);

                                                return (
                                                    <button
                                                        key={env}
                                                        type="button"
                                                        onClick={() => toggleEnv(env)}
                                                        className={`rounded-full border px-4 py-2.5 text-[10px] font-bold transition-all ${isActive
                                                                ? "border-black bg-black text-white shadow-lg"
                                                                : "border-neutral-200 bg-white text-neutral-500"
                                                            }`}
                                                    >
                                                        {env}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-neutral-400">
                                                Timeline
                                            </label>
                                            <select
                                                value={form.timeline}
                                                onChange={(e) => updateField("timeline", e.target.value)}
                                                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-black outline-none"
                                            >
                                                <option value="">Select Timeline</option>
                                                {TIMELINE_OPTIONS.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-neutral-400">
                                                Budget Approach
                                            </label>
                                            <select
                                                value={form.budget}
                                                onChange={(e) => updateField("budget", e.target.value)}
                                                className="h-14 w-full rounded-2xl border border-neutral-200 bg-white px-5 text-black outline-none"
                                            >
                                                <option value="">Select Budget</option>
                                                {BUDGET_OPTIONS.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase text-neutral-400">
                                            Strategic Goals
                                        </label>
                                        <textarea
                                            value={form.goals}
                                            onChange={(e) => updateField("goals", e.target.value)}
                                            placeholder="What needs to improve?"
                                            className="min-h-[120px] w-full rounded-2xl border border-neutral-200 bg-white p-5 text-black outline-none focus:border-[#FF6A17]"
                                        />
                                    </div>

                                    {submitError ? (
                                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                            {submitError}
                                        </div>
                                    ) : null}

                                    <button
                                        disabled={
                                            loading ||
                                            !form.fullName.trim() ||
                                            !form.company.trim() ||
                                            !form.industry
                                        }
                                        onClick={handleSync}
                                        className="flex h-16 w-full items-center justify-center rounded-2xl bg-[#FF6A17] py-5 text-lg font-bold text-white transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-30"
                                    >
                                        {loading ? (
                                            <Clock className="h-5 w-5 animate-spin" />
                                        ) : (
                                            "Generate Strategic Analysis"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section
                        key="report"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mx-auto max-w-5xl px-6 py-20 print:p-0"
                    >
                        <div className="mb-20 flex items-center justify-between print:hidden">
                            <button
                                onClick={() => setShowReport(false)}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 transition hover:text-black"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Intake
                            </button>

                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 border-b border-transparent pb-1 text-xs font-bold uppercase tracking-widest text-neutral-500 transition hover:border-[#FF6A17] hover:text-[#FF6A17]"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </button>
                        </div>

                        <div className="space-y-32 print:space-y-20">
                            <StrategyPage
                                num="01"
                                title={strategy.theme}
                                subtitle="Executive Thesis"
                                text={strategy.p1}
                                stats={strategy.stats}
                            />
                            <div className="print:break-after-page" />

                            <StrategyPage
                                num="02"
                                title="Tactical Playbook"
                                subtitle="Atmospheric Strategy"
                                text={strategy.p2}
                            />
                            <div className="print:break-after-page" />

                            <StrategyPage
                                num="03"
                                title="Economic ROI"
                                subtitle="Financial Alignment"
                                text={strategy.p3}
                            />
                            <div className="print:break-after-page" />

                            <StrategyPage
                                num="04"
                                title="Transformation Roadmap"
                                subtitle="Execution Plan"
                                text={strategy.p4}
                                isLast
                                onAction={() => router.push("/")}
                            />
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

function StrategyPage({
    num,
    title,
    subtitle,
    text,
    isLast,
    stats,
    onAction,
}: {
    num: string;
    title: string;
    subtitle: string;
    text: string;
    isLast?: boolean;
    stats?: [number, number];
    onAction?: () => void;
}) {
    return (
        <section className="border-t-4 border-black pt-12">
            <div className="mb-20 flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">
                <span>
                    Page {num} / {subtitle}
                </span>
                <span>SpaceLift Intelligence</span>
            </div>

            <h2 className="mb-12 text-7xl font-bold leading-[1.1] tracking-tighter text-black">
                {title}
            </h2>

            <div className="grid gap-20 print:grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
                <p className="text-3xl font-medium leading-[1.4] text-neutral-800">
                    {text}
                </p>

                {stats ? (
                    <div className="flex flex-col justify-center gap-10 rounded-[50px] border border-neutral-200 bg-neutral-100 p-10 print:border-none print:p-0">
                        <div className="w-full">
                            <div className="mb-3 flex justify-between text-[10px] font-black uppercase text-black">
                                <span>Current Perception Index</span>
                                <span>{stats[0]}%</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full border border-neutral-200 bg-white">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stats[0]}%` }}
                                    transition={{ duration: 1.2 }}
                                    className="h-full bg-neutral-300"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="mb-3 flex justify-between text-[10px] font-black uppercase text-black">
                                <span>SpaceLift Potential</span>
                                <span>{stats[1]}%</span>
                            </div>
                            <div className="h-3 w-full overflow-hidden rounded-full border border-neutral-200 bg-white">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stats[1]}%` }}
                                    transition={{ duration: 1.2, delay: 0.5 }}
                                    className="h-full bg-[#FF6A17]"
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {isLast ? (
                <button
                    onClick={onAction}
                    className="mt-16 flex items-center gap-4 rounded-2xl bg-[#FF6A17] px-10 py-5 text-lg font-bold text-white shadow-xl transition-all hover:shadow-2xl active:scale-95 print:hidden"
                >
                    Return to Overview
                    <ChevronRight className="h-5 w-5" />
                </button>
            ) : null}
        </section>
    );
}