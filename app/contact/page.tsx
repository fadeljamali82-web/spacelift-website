"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    Building2,
    Briefcase,
    CheckCircle2,
    ClipboardList,
    Copy,
    Hospital,
    Hotel,
    LayoutGrid,
    Mail,
    MapPinned,
    MessageSquareText,
    ShieldCheck,
    Sparkles,
    Store,
} from "lucide-react";

type TabKey = "report" | "contact";
type IndustryKey =
    | "hospitality"
    | "corporate"
    | "retail"
    | "healthcare"
    | "venue"
    | "mixeduse"
    | "other";

type ReportForm = {
    fullName: string;
    company: string;
    email: string;
    industry: IndustryKey | "";
    locations: string;
    timeline: string;
    scope: string;
    environment: string;
    goals: string;
    constraints: string;
};

type ContactForm = {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    projectType: string;
    projectDescription: string;
};

const reportInitial: ReportForm = {
    fullName: "",
    company: "",
    email: "",
    industry: "",
    locations: "",
    timeline: "",
    scope: "",
    environment: "",
    goals: "",
    constraints: "",
};

const contactInitial: ContactForm = {
    fullName: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    projectDescription: "",
};

const COLORS = {
    bg: "#F7F6F3",
    panel: "#F3EDE8",
    white: "#FFFFFF",
    text: "#111111",
    muted: "#6B6B6B",
    border: "#DDD6CE",
    orange: "#FF6A17",
    orangeDark: "#DD530C",
};

const INDUSTRY_LABELS: Record<IndustryKey, string> = {
    hospitality: "Hospitality",
    corporate: "Corporate / Workplace",
    retail: "Retail Environment",
    healthcare: "Healthcare",
    venue: "Event / Venue",
    mixeduse: "Mixed-Use / Residential",
    other: "Other",
};

const INDUSTRY_ICONS: Record<IndustryKey, React.ComponentType<any>> = {
    hospitality: Hotel,
    corporate: Briefcase,
    retail: Store,
    healthcare: Hospital,
    venue: Building2,
    mixeduse: LayoutGrid,
    other: ClipboardList,
};

const REPORT_TEXT: Record<
    IndustryKey,
    {
        executive: string;
        dynamics: string;
        gaps: string[];
        recommendations: string[];
        leaders: string;
        relevance: string;
        nextPath: string;
    }
> = {
    hospitality: {
        executive:
            "Hospitality environments are now judged less by static design intent and more by how consistently they support guest perception, brand memory, and operational ease. Many properties remain commercially viable while visually drifting behind guest expectations. In practical terms, this creates a perception gap: the experience may be functioning, but the environment no longer signals the level of quality the operator wants associated with the property.",
        dynamics:
            "Hospitality operators are facing three overlapping pressures. First, guest expectations continue to rise faster than most renovation cycles. Second, capital discipline has made large-scale renovation harder to justify unless the return is clear. Third, the market increasingly rewards properties that treat the physical environment as part of the guest experience rather than as a background layer. In this environment, the strongest properties are not simply newer. They are better maintained visually, more coherent, and more intentional across guest-facing surfaces.",
        gaps: [
            "Arrival and first-impression zones may not be carrying the level of premium signal the property needs.",
            "Guest-facing surfaces can age visually long before infrastructure actually requires replacement.",
            "The environment may be functioning operationally but not reinforcing the brand story strongly enough.",
            "Shared spaces often lack a refresh strategy that keeps perception current between major renovation cycles.",
        ],
        recommendations: [
            "Identify the highest-visibility guest-facing surfaces and rank them by influence on first impression.",
            "Separate structural needs from perception needs so capital is not wasted on unnecessary full-scope upgrades.",
            "Build a phased environment refresh approach that can improve quality signals without disrupting operations.",
            "Treat walls, textiles, corridors, and focal surfaces as strategic tools for guest perception and brand identity.",
        ],
        leaders:
            "Stronger hospitality operators increasingly avoid waiting for one large renovation event to solve everything. Instead, they maintain a more active lifecycle strategy: selective environment refreshes, coordinated visual updates, and targeted upgrades to the areas guests notice first. This keeps the property visually competitive while preserving capital flexibility.",
        relevance:
            "SpaceLift is particularly relevant where the environment needs to feel more premium, more coherent, and more brand-aligned without triggering full architectural reconstruction. The model is strongest when visible surface transformation can improve guest perception faster than traditional renovation routes.",
        nextPath:
            "The most useful next step is to isolate the guest-facing zones that most strongly shape first impression, identify which surfaces are visually lagging, and define whether the priority is perception, consistency, or rollout scalability across the portfolio.",
    },

    corporate: {
        executive:
            "Workplace environments are no longer evaluated purely as places to house teams. They are increasingly judged by how clearly they support collaboration, culture, client impression, and brand identity. Many offices remain functional but fail to justify physical presence at the level leadership now expects. The result is an underleveraged environment: it works, but it does not persuade.",
        dynamics:
            "Corporate workplace strategy is now being shaped by hybrid work, utilization pressure, and increased scrutiny on real estate value. Organizations are under pressure to make the office do more: represent the brand better, support collaboration more effectively, and improve employee and client perception without constant large-scale fit-outs. The office is becoming a strategic environment rather than a default workspace.",
        gaps: [
            "The office may feel competent but generic, with limited physical expression of the brand.",
            "Collaboration zones and client-facing areas may not be differentiated strongly enough from routine work areas.",
            "Surface quality and spatial identity may not align with the ambition of the business.",
            "The environment may still reflect pre-hybrid assumptions rather than current behavioral reality.",
        ],
        recommendations: [
            "Reassess which spaces influence employee perception and external impression most strongly.",
            "Upgrade the environments that shape collaboration, arrival, and client confidence before broad general areas.",
            "Use surface systems and environmental identity to connect the physical office to the brand more deliberately.",
            "Create a phased transformation logic so updates can be sequenced without full operational disruption.",
        ],
        leaders:
            "Stronger workplace operators are using the office as a culture and perception tool. They are not simply renovating for aesthetics. They are clarifying why the office exists, then aligning the physical environment around that purpose through selective, high-visibility upgrades.",
        relevance:
            "SpaceLift is most relevant where a workplace needs to communicate greater quality, stronger identity, or more intentionality without immediately defaulting to a full redesign cycle. The value is especially clear when transformation must be phased, controlled, and premium in appearance.",
        nextPath:
            "The next step is to determine whether the main issue is brand expression, environment quality, collaboration usability, or executive/client impression. That distinction should guide which areas are transformed first.",
    },

    retail: {
        executive:
            "Retail environments are increasingly expected to function as brand experience systems, not just as sales space. As ecommerce continues to absorb routine transactions, the physical store must justify itself through perception, atmosphere, and memorability. When the environment feels generic, dated, or visually inconsistent, the store loses differentiation even if the product mix is strong.",
        dynamics:
            "Retailers are under pressure to create environments that support both customer experience and operational efficiency. The strongest stores are not simply attractive. They translate brand identity into physical space, maintain visual freshness, and adapt more easily across locations. This has increased demand for environment strategies that improve store impact without forcing constant structural rebuilds.",
        gaps: [
            "The store may be presenting product without creating a strong enough experiential hierarchy.",
            "Surfaces and visual backdrops may not be contributing enough to brand memory.",
            "Flagship quality may not translate effectively into broader rollout environments.",
            "The store may feel commercially competent but physically interchangeable with competitors.",
        ],
        recommendations: [
            "Identify which environmental moments most influence dwell time, perception, and product framing.",
            "Use surface transformation to strengthen store identity without requiring full redesign of all fixtures.",
            "Clarify which design decisions should scale across locations and which should remain flagship-specific.",
            "Refresh the most visible environment layers first to increase perceived quality quickly.",
        ],
        leaders:
            "Stronger retail operators are increasingly treating the store as a dynamic brand platform. They use visual systems, surface upgrades, and coordinated refresh strategies to keep stores relevant while maintaining rollout discipline.",
        relevance:
            "SpaceLift is relevant where a retailer needs a stronger physical brand presence, more premium visual language, or a more scalable transformation logic across one or more locations.",
        nextPath:
            "The immediate priority is to identify whether the strongest opportunity sits in flagship impact, network consistency, product framing, or environment freshness. That decision should shape the transformation sequence.",
    },

    healthcare: {
        executive:
            "Healthcare environments are increasingly judged not only by operational competence but by clarity, calm, trust, and perceived quality. Patients and families often form first impressions before any clinical interaction takes place. This creates a strategic tension for providers: the environment must support confidence and comfort while working within strict operational and budget constraints.",
        dynamics:
            "Healthcare providers are managing pressure from cost, infrastructure aging, patient experience expectations, and ongoing capital discipline. Large-scale renovation is often difficult to justify or execute without service disruption. As a result, many facilities continue operating effectively while visually underperforming. That underperformance may not affect care delivery directly, but it does influence confidence, comfort, and perceived quality.",
        gaps: [
            "Reception, waiting, and corridor environments may not communicate reassurance or clarity strongly enough.",
            "Visible surfaces may appear dated even where core infrastructure remains functional.",
            "The care experience may outperform the environment, creating a perception mismatch.",
            "High-traffic environments often lack a surface strategy that balances durability with visual confidence.",
        ],
        recommendations: [
            "Start with the environments that shape first impression and emotional tone: reception, waiting, and key circulation zones.",
            "Prioritize surface systems that improve perceived quality while remaining operationally practical.",
            "Separate clinical infrastructure priorities from patient-facing perception priorities.",
            "Create a phased environment improvement roadmap that minimizes disruption and preserves compliance.",
        ],
        leaders:
            "Stronger healthcare operators increasingly understand that patient experience is shaped by environment as much as process. Many are investing in selective upgrades that improve visual trust, calm, and clarity without requiring major reconstruction.",
        relevance:
            "SpaceLift is most relevant where visual modernization and perception improvement are needed without full structural intervention. The model is particularly suited to upgrading patient-facing environments with strong material and rollout control.",
        nextPath:
            "The best next step is to isolate the environments where patient perception matters most, determine which of those are visibly underperforming, and evaluate which improvements can be implemented with minimal disruption.",
    },

    venue: {
        executive:
            "Venue environments are increasingly chosen on more than location, capacity, or operations. Event planners and organizers now assess spaces through visual flexibility, distinction, and how effectively the environment can support memorable experiences. Many venues remain commercially viable while visually static, which can reduce booking appeal over time even when the facility itself remains capable.",
        dynamics:
            "The events market now rewards venues that can help planners create impact without excessive production burden. At the same time, venues often face long renovation cycles, limited downtime windows, and pressure to remain visually current across different event types. This creates demand for transformation strategies that allow the environment to evolve more flexibly.",
        gaps: [
            "Ballrooms and event spaces may feel functional but visually interchangeable.",
            "Static finishes can limit how easily the space supports varied event identities.",
            "Older visual layers may weaken planner perception even where venue operations remain strong.",
            "The environment may lack a strategy for refresh between major capital cycles.",
        ],
        recommendations: [
            "Identify which surfaces and visual zones most influence event planner perception.",
            "Prioritize transformation systems that improve distinctiveness and flexibility without full reconstruction.",
            "Treat visual refresh as a competitive strategy, not only as maintenance.",
            "Create a phased environment plan that supports both recurring bookings and flagship events.",
        ],
        leaders:
            "Stronger venues are increasingly using adaptable visual systems and more intentional environment strategies to remain competitive. Rather than waiting for full renovation, they refresh the parts of the space that most influence booking confidence and experience impact.",
        relevance:
            "SpaceLift is highly relevant where a venue needs stronger visual appeal, greater transformation capability, and a more premium experience without extended closure or structural disruption.",
        nextPath:
            "The most useful next step is to assess planner-facing perception points, determine where the environment feels least differentiated, and build a refresh strategy around those zones first.",
    },

    mixeduse: {
        executive:
            "Mixed-use and residential developments are now competing not only on architecture and amenities, but on atmosphere, perceived prestige, and how convincingly shared spaces support lifestyle positioning. Residents and visitors increasingly evaluate these environments as part of the product itself. When lobbies, corridors, and social spaces begin to drift visually, the asset can feel less premium even if the core property remains strong.",
        dynamics:
            "Developers and operators are balancing capital discipline against the need to preserve perceived asset quality. Shared spaces age visually faster than structural systems, and newer competing developments can reset expectations quickly. This has increased demand for targeted environment refresh strategies that elevate perception without triggering large-scale disruption.",
        gaps: [
            "Arrival and common areas may not be maintaining the level of prestige the asset requires.",
            "Corridors and shared environments can age unevenly, weakening overall coherence.",
            "The property may be operationally strong but visually lagging against newer competition.",
            "Shared spaces may lack a refresh cadence that protects long-term perception and leasing appeal.",
        ],
        recommendations: [
            "Focus first on the spaces that define everyday resident and visitor impression: arrival, circulation, and key amenity zones.",
            "Separate structural capex needs from perception-driven environment opportunities.",
            "Use surface upgrades to maintain premium positioning without major resident disruption.",
            "Create a recurring refresh strategy rather than relying only on large renovation intervals.",
        ],
        leaders:
            "Stronger operators preserve asset perception through selective, high-visibility environment updates. They understand that a premium property can feel dated long before it becomes physically obsolete, and they act earlier on that signal.",
        relevance:
            "SpaceLift is particularly relevant where an asset needs to protect prestige, improve shared-space perception, or extend the visual life of high-visibility environments without full reconstruction.",
        nextPath:
            "The immediate priority is to identify which common areas are shaping asset perception most strongly and determine where a targeted refresh would have the highest commercial and experiential return.",
    },

    other: {
        executive:
            "Across industries, physical environments are increasingly judged as strategic assets rather than passive containers. Even when the category differs, the same broad pattern appears: many organizations operate in spaces that function adequately but no longer communicate the level of quality, relevance, or intentionality the business wants associated with itself.",
        dynamics:
            "In most categories, budget pressure, timeline pressure, and operational continuity concerns make full renovation difficult. At the same time, customer, visitor, and stakeholder expectations continue to rise. This creates a strong need for targeted transformation strategies that improve perception, consistency, and visual quality without defaulting to major structural work.",
        gaps: [
            "Visible surfaces may not be reinforcing the desired level of quality or confidence.",
            "The environment may feel more generic than the business itself.",
            "Physical space may not be contributing enough to first impression or brand clarity.",
            "Refresh strategy may be absent, leaving the environment to age passively.",
        ],
        recommendations: [
            "Identify the spaces and surfaces that most strongly shape first impression and perceived quality.",
            "Clarify whether the primary issue is aesthetics, brand expression, consistency, or rollout logic.",
            "Prioritize environment layers that can shift perception quickly without major structural intervention.",
            "Build a phased transformation sequence around visibility, operational practicality, and business value.",
        ],
        leaders:
            "Stronger operators across categories increasingly use selective environment transformation to keep spaces current, coherent, and commercially aligned without overcommitting to unnecessary full rebuilds.",
        relevance:
            "SpaceLift is relevant where high-visibility surfaces, environmental quality, and coordinated delivery matter more than conventional renovation volume.",
        nextPath:
            "The next step is to define which environment zones are carrying the most strategic pressure, what the business needs those spaces to communicate, and where visible transformation can create the fastest measurable improvement.",
    },
};

function titleCase(value: string) {
    if (!value) return "Not specified";
    return value
        .split(" ")
        .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
        .join(" ");
}

function buildReport(form: ReportForm) {
    const industry = (form.industry || "other") as IndustryKey;
    const pack = REPORT_TEXT[industry];
    const company = form.company || "The organization";
    const industryLabel = INDUSTRY_LABELS[industry];
    const locations = form.locations || "Not specified";
    const timeline = form.timeline || "Not specified";
    const scope = form.scope || "Not specified";
    const goals = form.goals || "Not specified";
    const constraints = form.constraints || "No additional constraints were shared.";
    const environment = form.environment || "No environment description was shared.";

    return {
        title: `${industryLabel} Strategic Environment Report`,
        sections: [
            {
                id: "executive",
                icon: Sparkles,
                heading: "Executive Snapshot",
                body: `${pack.executive}

For ${company}, the opportunity appears to involve ${scope.toLowerCase()} across ${locations.toLowerCase()} with a working timeline of ${timeline.toLowerCase()}. Based on the information shared, the environment challenge is not simply visual. It is strategic: how the physical environment is currently performing versus how it needs to perform in order to support perception, confidence, and the next stage of business intent.`,
            },
            {
                id: "dynamics",
                icon: Building2,
                heading: "Industry & Market Dynamics",
                body: `${pack.dynamics}

In this case, the current situation is being framed around the following environment context: ${environment}`,
            },
            {
                id: "gaps",
                icon: ClipboardList,
                heading: "Key Environment Gaps",
                body: pack.gaps.map((item) => `• ${item}`).join("\n"),
            },
            {
                id: "recommendations",
                icon: ShieldCheck,
                heading: "Strategic Recommendations",
                body: `${pack.recommendations.map((item) => `• ${item}`).join("\n")}

The stated objective is: ${goals}

Any strategic path should therefore be measured against that goal rather than against generic upgrade assumptions.`,
            },
            {
                id: "leaders",
                icon: LayoutGrid,
                heading: "What Stronger Operators Usually Do",
                body: pack.leaders,
            },
            {
                id: "relevance",
                icon: CheckCircle2,
                heading: "SpaceLift Relevance",
                body: `${pack.relevance}

The practical constraint set currently appears to include: ${constraints}`,
            },
            {
                id: "next",
                icon: MessageSquareText,
                heading: "Recommended Next Path",
                body: pack.nextPath,
            },
        ],
        plainText: `SPACE LIFT STUDIO
${industryLabel.toUpperCase()} STRATEGIC ENVIRONMENT REPORT

Prepared for: ${form.fullName || "Not specified"}
Company: ${company}
Industry: ${industryLabel}
Locations: ${locations}
Timeline: ${timeline}
Scope of Work: ${scope}

1. Executive Snapshot
${pack.executive}

For ${company}, the opportunity appears to involve ${scope.toLowerCase()} across ${locations.toLowerCase()} with a working timeline of ${timeline.toLowerCase()}. Based on the information shared, the environment challenge is not simply visual. It is strategic: how the physical environment is currently performing versus how it needs to perform in order to support perception, confidence, and the next stage of business intent.

2. Industry & Market Dynamics
${pack.dynamics}

In this case, the current situation is being framed around the following environment context: ${environment}

3. Key Environment Gaps
${pack.gaps.map((item) => `- ${item}`).join("\n")}

4. Strategic Recommendations
${pack.recommendations.map((item) => `- ${item}`).join("\n")}

The stated objective is: ${goals}

5. What Stronger Operators Usually Do
${pack.leaders}

6. SpaceLift Relevance
${pack.relevance}

The practical constraint set currently appears to include: ${constraints}

7. Recommended Next Path
${pack.nextPath}`,
    };
}

export default function ContactPage() {
    const [tab, setTab] = useState<TabKey>("report");
    const [reportForm, setReportForm] = useState<ReportForm>(reportInitial);
    const [contactForm, setContactForm] = useState<ContactForm>(contactInitial);
    const [showReport, setShowReport] = useState(false);
    const [copied, setCopied] = useState(false);
    const built = useMemo(() => buildReport(reportForm), [reportForm]);

    const reportReady =
        reportForm.fullName &&
        reportForm.company &&
        reportForm.industry &&
        reportForm.locations &&
        reportForm.timeline &&
        reportForm.scope &&
        reportForm.environment &&
        reportForm.goals;

    const contactReady =
        contactForm.fullName &&
        contactForm.company &&
        contactForm.email &&
        contactForm.projectType &&
        contactForm.projectDescription;

    async function copyReport() {
        await navigator.clipboard.writeText(built.plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    }

    return (
        <div style={{ background: COLORS.bg, color: COLORS.text }} className="min-h-screen">
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section
                        key="form-screen"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.35 }}
                        className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-16"
                    >
                        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-16">
                            <div className="pt-2 lg:pt-6">
                                <div
                                    className="mb-8 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.26em]"
                                    style={{ color: COLORS.orange }}
                                >
                                    <span
                                        className="inline-block h-px w-10"
                                        style={{ background: COLORS.orange }}
                                    />
                                    Strategic report & direct contact
                                </div>

                                <h1 className="max-w-[720px] text-[52px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[64px] lg:text-[82px] xl:text-[92px]">
                                    Start with the path that fits the opportunity.
                                </h1>

                                <p
                                    className="mt-8 max-w-[720px] text-[22px] leading-[1.65]"
                                    style={{ color: COLORS.muted }}
                                >
                                    Generate a premium industry-specific strategic report or contact
                                    SpaceLift directly if you already have a live opportunity in mind.
                                </p>

                                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                    <InfoCard
                                        title="Industry intelligence"
                                        body="Each report is built around real sector pressures and recurring environment gaps."
                                    />
                                    <InfoCard
                                        title="Personalized output"
                                        body="Locations, timeline, scope, goals, and constraints shape the final report."
                                    />
                                    <InfoCard
                                        title="Immediate value"
                                        body="The final report appears instantly in a premium scrollable format and can be copied."
                                    />
                                </div>
                            </div>

                            <div>
                                <div
                                    className="rounded-[34px] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] md:p-7 lg:p-8"
                                    style={{
                                        background: COLORS.panel,
                                        border: "1px solid rgba(17,17,17,0.04)",
                                    }}
                                >
                                    <h2 className="text-[38px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[46px] lg:text-[54px]">
                                        Choose how you’d like to begin.
                                    </h2>

                                    <p
                                        className="mt-4 text-[19px] leading-[1.6]"
                                        style={{ color: COLORS.muted }}
                                    >
                                        Use the strategic report if you want immediate insight. Use direct
                                        contact if you already know you want to speak with us.
                                    </p>

                                    <div
                                        className="mt-8 overflow-hidden rounded-[24px] border"
                                        style={{
                                            borderColor: COLORS.border,
                                            background: "rgba(255,255,255,0.55)",
                                        }}
                                    >
                                        <div
                                            className="grid grid-cols-2 gap-0 border-b"
                                            style={{ borderColor: COLORS.border }}
                                        >
                                            <button
                                                onClick={() => setTab("report")}
                                                className="px-4 py-5 text-center text-[18px] font-semibold transition"
                                                style={{
                                                    background: tab === "report" ? COLORS.white : "transparent",
                                                    color: COLORS.text,
                                                    boxShadow:
                                                        tab === "report"
                                                            ? `inset 0 -3px 0 ${COLORS.orange}`
                                                            : "none",
                                                }}
                                            >
                                                Strategic Report
                                            </button>

                                            <button
                                                onClick={() => setTab("contact")}
                                                className="px-4 py-5 text-center text-[18px] font-semibold transition"
                                                style={{
                                                    background: tab === "contact" ? COLORS.white : "transparent",
                                                    color: COLORS.text,
                                                    boxShadow:
                                                        tab === "contact"
                                                            ? `inset 0 -3px 0 ${COLORS.orange}`
                                                            : "none",
                                                }}
                                            >
                                                Direct Contact
                                            </button>
                                        </div>

                                        <div className="bg-white p-5 md:p-7 lg:p-8">
                                            <AnimatePresence mode="wait">
                                                {tab === "report" ? (
                                                    <motion.div
                                                        key="report-form"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.22 }}
                                                    >
                                                        <div
                                                            className="mb-6 text-[14px] font-semibold uppercase tracking-[0.24em]"
                                                            style={{ color: COLORS.orange }}
                                                        >
                                                            Strategic report intake
                                                        </div>

                                                        <h3 className="max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">
                                                            Tell us about the environment and we’ll generate the report instantly.
                                                        </h3>

                                                        <p
                                                            className="mt-3 text-[20px] leading-[1.55]"
                                                            style={{ color: COLORS.muted }}
                                                        >
                                                            This uses prebuilt SpaceLift industry intelligence and
                                                            personalizes the result based on the details you enter.
                                                        </p>

                                                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                            <div>
                                                                <FieldLabel>Full name</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Your name"
                                                                    value={reportForm.fullName}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            fullName: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Company</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Company name"
                                                                    value={reportForm.company}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            company: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Email</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Optional"
                                                                    value={reportForm.email}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            email: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Industry</FieldLabel>
                                                                <Select
                                                                    value={reportForm.industry}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            industry: e.target.value as IndustryKey,
                                                                        }))
                                                                    }
                                                                >
                                                                    <option value="">Select industry</option>
                                                                    <option value="hospitality">Hospitality</option>
                                                                    <option value="corporate">Corporate / Workplace</option>
                                                                    <option value="retail">Retail Environment</option>
                                                                    <option value="healthcare">Healthcare</option>
                                                                    <option value="venue">Event / Venue</option>
                                                                    <option value="mixeduse">Mixed-Use / Residential</option>
                                                                    <option value="other">Other</option>
                                                                </Select>
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Number of locations</FieldLabel>
                                                                <TextInput
                                                                    placeholder="e.g. 1, 4, 12, 40+"
                                                                    value={reportForm.locations}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            locations: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Timeline</FieldLabel>
                                                                <TextInput
                                                                    placeholder="e.g. Q3 2026, phased, 6 months"
                                                                    value={reportForm.timeline}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            timeline: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Scope of work</FieldLabel>
                                                                <TextInput
                                                                    placeholder="e.g. lobby refresh, workplace rebrand, multi-site corridor upgrade"
                                                                    value={reportForm.scope}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            scope: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Environment description</FieldLabel>
                                                                <Textarea
                                                                    rows={5}
                                                                    placeholder="Describe the space, current condition, who uses it, and what feels off right now."
                                                                    value={reportForm.environment}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            environment: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Main goals</FieldLabel>
                                                                <Textarea
                                                                    rows={4}
                                                                    placeholder="What needs to improve strategically, visually, operationally, or commercially?"
                                                                    value={reportForm.goals}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            goals: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Constraints or considerations</FieldLabel>
                                                                <Textarea
                                                                    rows={4}
                                                                    placeholder="Budget discipline, phased rollout, low disruption, approval complexity, tenant sensitivity, etc."
                                                                    value={reportForm.constraints}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            constraints: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mt-10">
                                                            <button
                                                                onClick={() => setShowReport(true)}
                                                                disabled={!reportReady}
                                                                className="inline-flex h-14 w-full items-center justify-center rounded-[18px] px-6 text-[17px] font-semibold text-white transition disabled:opacity-40"
                                                                style={{ background: COLORS.orange }}
                                                            >
                                                                Generate Strategic Report
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="contact-form"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.22 }}
                                                    >
                                                        <div
                                                            className="mb-6 text-[14px] font-semibold uppercase tracking-[0.24em]"
                                                            style={{ color: COLORS.orange }}
                                                        >
                                                            Direct contact
                                                        </div>

                                                        <h3 className="max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">
                                                            Tell us what the environment needs to achieve.
                                                        </h3>

                                                        <p
                                                            className="mt-3 text-[20px] leading-[1.55]"
                                                            style={{ color: COLORS.muted }}
                                                        >
                                                            Use this if you already have a live opportunity in mind.
                                                        </p>

                                                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                            <div>
                                                                <FieldLabel>Full name</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Your name"
                                                                    value={contactForm.fullName}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({
                                                                            ...p,
                                                                            fullName: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Company</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Company name"
                                                                    value={contactForm.company}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({
                                                                            ...p,
                                                                            company: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Email</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Your email"
                                                                    value={contactForm.email}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({
                                                                            ...p,
                                                                            email: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Phone</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Optional"
                                                                    value={contactForm.phone}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({
                                                                            ...p,
                                                                            phone: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Project type</FieldLabel>
                                                                <TextInput
                                                                    placeholder="e.g. hospitality refresh, workplace upgrade, venue branding"
                                                                    value={contactForm.projectType}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({
                                                                            ...p,
                                                                            projectType: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Project description</FieldLabel>
                                                                <Textarea
                                                                    rows={5}
                                                                    placeholder="Tell us about the environment, the scope, the timeline, and what kind of support you need."
                                                                    value={contactForm.projectDescription}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({
                                                                            ...p,
                                                                            projectDescription: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mt-10">
                                                            <button
                                                                disabled={!contactReady}
                                                                className="inline-flex h-14 w-full items-center justify-center rounded-[18px] px-6 text-[17px] font-semibold text-white transition disabled:opacity-40"
                                                                style={{ background: COLORS.orange }}
                                                            >
                                                                Submit Inquiry
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section
                        key="report-screen"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.35 }}
                        className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-14"
                    >
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <button
                                onClick={() => setShowReport(false)}
                                className="inline-flex items-center gap-2 rounded-[16px] border px-4 py-3 text-[15px] font-medium transition hover:bg-white"
                                style={{
                                    borderColor: COLORS.border,
                                    color: COLORS.text,
                                    background: "rgba(255,255,255,0.45)",
                                }}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Form
                            </button>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={copyReport}
                                    className="inline-flex items-center gap-2 rounded-[16px] border px-4 py-3 text-[15px] font-medium transition hover:bg-white"
                                    style={{
                                        borderColor: COLORS.border,
                                        color: COLORS.text,
                                        background: "rgba(255,255,255,0.45)",
                                    }}
                                >
                                    <Copy className="h-4 w-4" />
                                    {copied ? "Copied" : "Copy Report"}
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
                            <aside className="lg:sticky lg:top-8 lg:self-start">
                                <div
                                    className="rounded-[28px] p-6 shadow-[0_20px_60px_rgba(17,17,17,0.08)]"
                                    style={{
                                        background: COLORS.panel,
                                        border: `1px solid ${COLORS.border}`,
                                    }}
                                >
                                    <div
                                        className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                                        style={{ color: COLORS.orange }}
                                    >
                                        SpaceLift Studio
                                    </div>

                                    <h2 className="mt-4 text-[28px] font-bold leading-[1.04] tracking-[-0.03em]">
                                        {built.title}
                                    </h2>

                                    <div className="mt-6 space-y-3">
                                        <SummaryRow
                                            icon={Mail}
                                            label="Prepared for"
                                            value={reportForm.fullName || "Not specified"}
                                        />
                                        <SummaryRow
                                            icon={Building2}
                                            label="Company"
                                            value={reportForm.company || "Not specified"}
                                        />
                                        <SummaryRow
                                            icon={ClipboardList}
                                            label="Industry"
                                            value={titleCase(
                                                INDUSTRY_LABELS[
                                                (reportForm.industry || "other") as IndustryKey
                                                ]
                                            )}
                                        />
                                        <SummaryRow
                                            icon={MapPinned}
                                            label="Locations"
                                            value={reportForm.locations || "Not specified"}
                                        />
                                        <SummaryRow
                                            icon={Sparkles}
                                            label="Timeline"
                                            value={reportForm.timeline || "Not specified"}
                                        />
                                        <SummaryRow
                                            icon={MessageSquareText}
                                            label="Scope"
                                            value={reportForm.scope || "Not specified"}
                                        />
                                    </div>
                                </div>
                            </aside>

                            <main className="space-y-6">
                                {built.sections.map((section, index) => {
                                    const Icon = section.icon;
                                    return (
                                        <motion.section
                                            key={section.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: index * 0.06 }}
                                            className="rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)] md:p-8"
                                            style={{ border: `1px solid ${COLORS.border}` }}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="rounded-[16px] p-3"
                                                    style={{
                                                        background: "rgba(255,106,23,0.08)",
                                                        color: COLORS.orange,
                                                    }}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div
                                                        className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                                                        style={{ color: COLORS.orange }}
                                                    >
                                                        Section {index + 1}
                                                    </div>
                                                    <h3 className="mt-2 text-[30px] font-bold leading-[1.08] tracking-[-0.03em]">
                                                        {section.heading}
                                                    </h3>
                                                    <div
                                                        className="mt-4 whitespace-pre-wrap text-[17px] leading-[1.9]"
                                                        style={{ color: COLORS.muted }}
                                                    >
                                                        {section.body}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.section>
                                    );
                                })}

                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: 0.45 }}
                                    className="rounded-[28px] p-6 md:p-8"
                                    style={{
                                        background:
                                            "radial-gradient(circle at top left, rgba(255,106,23,0.08), transparent 28%), linear-gradient(135deg, #1a1b1f 0%, #2a2a2d 100%)",
                                        color: "white",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#FFB184]">
                                        Final action
                                    </div>
                                    <h3 className="mt-3 text-[30px] font-bold leading-[1.08] tracking-[-0.03em]">
                                        Keep the report or continue the conversation.
                                    </h3>
                                    <p className="mt-4 max-w-[860px] text-[17px] leading-[1.85] text-white/80">
                                        This report is designed to provide immediate value, even before any
                                        conversation happens. If helpful, you can copy it and move it into
                                        your own documents. If the opportunity is live, the next step is a
                                        direct conversation around scope, priorities, and the most useful
                                        transformation path.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <button
                                            onClick={copyReport}
                                            className="inline-flex h-14 items-center rounded-[18px] bg-white px-6 text-[16px] font-semibold transition"
                                            style={{ color: COLORS.text }}
                                        >
                                            {copied ? "Copied" : "Copy Report"}
                                        </button>

                                        <button
                                            onClick={() => setShowReport(false)}
                                            className="inline-flex h-14 items-center rounded-[18px] border px-6 text-[16px] font-semibold text-white transition"
                                            style={{ borderColor: "rgba(255,255,255,0.18)" }}
                                        >
                                            Start New Assessment
                                        </button>
                                    </div>
                                </motion.div>
                            </main>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

function InfoCard({ title, body }: { title: string; body: string }) {
    return (
        <div
            className="rounded-[22px] p-6 shadow-sm"
            style={{
                background:
                    "radial-gradient(circle at top left, rgba(255,106,23,0.10), transparent 28%), linear-gradient(135deg, #1a1b1f 0%, #2a2a2d 100%)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            <div className="text-[15px] font-semibold leading-6 text-[#FFB184]">
                {title}
            </div>
            <div className="mt-3 text-[15px] leading-7 text-white/80">{body}</div>
        </div>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: COLORS.muted }}
        >
            {children}
        </div>
    );
}

function SummaryRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
}) {
    return (
        <div
            className="flex items-start gap-3 rounded-[18px] p-4"
            style={{ background: "rgba(255,255,255,0.55)", border: `1px solid ${COLORS.border}` }}
        >
            <div style={{ color: COLORS.orange }} className="mt-0.5">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <div
                    className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: COLORS.muted }}
                >
                    {label}
                </div>
                <div className="mt-1 text-[15px] font-medium leading-6">{value}</div>
            </div>
        </div>
    );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none transition placeholder:text-[#9A9A9A] ${props.className || ""}`}
            style={{ borderColor: COLORS.border, color: COLORS.text }}
        />
    );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={`w-full rounded-[18px] border bg-white px-5 py-4 text-[18px] outline-none transition placeholder:text-[#9A9A9A] ${props.className || ""}`}
            style={{ borderColor: COLORS.border, color: COLORS.text }}
        />
    );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none transition ${props.className || ""}`}
            style={{ borderColor: COLORS.border, color: COLORS.text }}
        />
    );
}