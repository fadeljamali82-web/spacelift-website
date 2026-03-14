"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    Briefcase,
    Building2,
    CheckCircle2,
    ClipboardList,
    Copy,
    Hotel,
    LayoutGrid,
    Mail,
    MapPinned,
    MessageSquareText,
    Phone,
    Send,
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
    environmentType: string;
    primaryChallenge: string;
    budgetApproach: string;
    goals: string;
    constraints: string;
    notes: string;
    environment: string; // Added this missing property
};

type ContactForm = {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    projectType: string;
    projectDescription: string;
};

type ReportSection = {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    title: string;
    body: string;
};

type BuiltReport = {
    title: string;
    badge: string;
    summary: string;
    plainText: string;
    sections: ReportSection[];
};

const reportInitial: ReportForm = {
    fullName: "",
    company: "",
    email: "",
    industry: "",
    locations: "",
    timeline: "",
    scope: "",
    environmentType: "",
    primaryChallenge: "",
    budgetApproach: "",
    goals: "",
    constraints: "",
    notes: "",
    environment: "", // Added this missing property
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
    orangeDark: "#D9540F",
    orangeSoft: "rgba(255,106,23,0.08)",
    darkPanel: "#15171B",
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

const INDUSTRY_ICONS: Record<IndustryKey, React.ComponentType<{ className?: string }>> = {
    hospitality: Hotel,
    corporate: Briefcase,
    retail: Store,
    healthcare: Building2, // Swapped 'Hospital' for 'Building2' to fix build error
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
            "Hospitality environments are increasingly judged through atmosphere, consistency, and perceived quality before service has a chance to do the heavy lifting. Many properties stay commercially functional while drifting visually behind guest expectations. The real issue is often not whether the space works, but whether it still signals the standard the operator wants associated with the brand.",
        dynamics:
            "The category is being shaped by rising guest expectations, tighter capital discipline, and stronger competition from operators who treat environment as part of the guest experience rather than as a background layer. Properties that feel visually current and coherent often outperform older competitors even when the underlying offer is similar.",
        gaps: [
            "Arrival and first-impression zones often underperform relative to the standard guests expect.",
            "Guest-facing surfaces can age visually long before infrastructure truly requires replacement.",
            "Public spaces frequently lose distinctiveness and drift toward a generic feel over time.",
            "Refresh cycles are often too infrequent to keep perception aligned with the intended brand position.",
        ],
        recommendations: [
            "Rank guest-facing environments by perception impact rather than by renovation habit.",
            "Separate structural needs from perception needs so capital is not wasted on the wrong scope.",
            "Use phased refresh logic to improve visual quality without forcing major operational disruption.",
            "Treat corridors, lobbies, key rooms, and focal surfaces as strategic tools for guest impression.",
        ],
        leaders:
            "Stronger hospitality operators maintain a more active lifecycle strategy. They do not wait for a single major renovation event to solve everything. They keep visual freshness alive through targeted upgrades in the areas guests notice first, preserving competitiveness while protecting capital flexibility.",
        relevance:
            "SpaceLift is most relevant where the property needs to feel more premium, more coherent, and more brand-aligned without defaulting to a full reconstruction path. The value is strongest when visible surface transformation can improve perception faster than traditional renovation routes.",
        nextPath:
            "The next move is to isolate the guest-facing zones that shape first impression most strongly, identify which surfaces are visually lagging, and decide whether the immediate priority is perception, consistency, or rollout scalability across the portfolio.",
    },

    corporate: {
        executive:
            "Corporate workplaces are no longer evaluated simply as places to house teams. They are judged by how clearly they support culture, client impression, collaboration, and identity. Many offices remain functional but fail to justify physical presence at the level leadership now expects. The result is a space that works operationally while underperforming strategically.",
        dynamics:
            "Workplace decisions are now shaped by hybrid work, utilization pressure, employee expectations, and the need to make office environments feel more intentional. Organizations are under pressure to use the office as a business tool rather than as a default container for work.",
        gaps: [
            "The environment may feel competent but generic, with limited physical expression of the brand.",
            "Client-facing and collaboration zones may not be differentiated strongly enough from routine work areas.",
            "Space quality may lag behind the ambition the business wants to project externally.",
            "The physical environment may still reflect pre-hybrid assumptions instead of current behavior patterns.",
        ],
        recommendations: [
            "Reassess which spaces most influence employee perception and client confidence.",
            "Upgrade the environments that shape arrival, collaboration, and executive impression before broad background areas.",
            "Translate brand language into the physical workplace more deliberately through materials and surfaces.",
            "Create a phased environment strategy that supports upgrades without broad operational disruption.",
        ],
        leaders:
            "Stronger workplace operators are using the office as a culture and perception tool. They are not renovating just for aesthetics. They are clarifying why the office exists, then aligning the environment around that purpose through selective, high-visibility transformation.",
        relevance:
            "SpaceLift is relevant where a workplace needs stronger identity, sharper quality, and a more deliberate environment without immediately defaulting to a full redesign cycle.",
        nextPath:
            "The most useful next step is to determine whether the central issue is brand expression, collaboration quality, employee engagement, or external impression. That distinction should shape the sequence of work.",
    },

    retail: {
        executive:
            "Retail environments increasingly need to function as brand experience systems rather than as purely transactional spaces. As ecommerce absorbs routine purchases, the physical store must justify itself through memorability, atmosphere, and clarity of identity. When the environment feels generic or dated, the store loses differentiation even if the product is strong.",
        dynamics:
            "Retailers are balancing customer experience, operational efficiency, and rollout consistency. The strongest stores are not just attractive. They translate brand identity into physical space, maintain visual freshness, and scale more effectively across locations.",
        gaps: [
            "The store may be presenting product well without creating a strong enough experiential hierarchy.",
            "Visual backdrops and surfaces may be underused as tools for brand memory.",
            "Flagship quality may not translate effectively across broader rollout environments.",
            "The store may feel commercially competent but physically interchangeable with competitors.",
        ],
        recommendations: [
            "Identify which moments in the store most influence dwell time, perception, and product framing.",
            "Use surface transformation to strengthen store identity without forcing full fixture redesign.",
            "Clarify what should scale across locations and what should remain flagship-specific.",
            "Refresh the most visible environment layers first to improve perceived quality quickly.",
        ],
        leaders:
            "Stronger retail operators treat the store as a dynamic brand platform. They use visual systems, coordinated refresh strategies, and premium surface logic to keep stores relevant while preserving rollout discipline.",
        relevance:
            "SpaceLift is most relevant where a retailer needs stronger physical brand presence, more premium visual language, or a more scalable transformation logic across one or more locations.",
        nextPath:
            "The immediate priority is to determine whether the greatest opportunity sits in flagship impact, network consistency, product framing, or environment freshness. That decision should drive the transformation sequence.",
    },

    healthcare: {
        executive:
            "Healthcare environments are increasingly judged not only by operational competence but by clarity, calm, trust, and perceived quality. Patients and families often form first impressions before any clinical interaction happens. That creates a strategic challenge: the environment must support confidence and comfort while staying practical and controlled.",
        dynamics:
            "Providers are facing pressure from infrastructure aging, cost discipline, patient experience expectations, and the need to improve perception without constant large-scale renovation. Many environments remain operationally strong while visually underperforming.",
        gaps: [
            "Reception, waiting, and corridor environments may not communicate reassurance strongly enough.",
            "Visible surfaces can appear dated even where infrastructure remains functional.",
            "The care experience may outperform the environment, creating a perception mismatch.",
            "High-traffic environments often lack a clear strategy for balancing durability and visual confidence.",
        ],
        recommendations: [
            "Start with reception, waiting, and circulation zones that shape emotional tone and first impression.",
            "Prioritize surface systems that improve perceived quality while remaining operationally practical.",
            "Separate patient-facing perception priorities from deeper infrastructure priorities.",
            "Build a phased environment improvement plan that minimizes disruption and preserves continuity.",
        ],
        leaders:
            "Stronger healthcare operators increasingly understand that patient experience is shaped by environment as much as process. Many are investing in selective upgrades that improve calm, trust, and visual confidence without major reconstruction.",
        relevance:
            "SpaceLift is most relevant where visual modernization and perception improvement are needed without broad structural intervention.",
        nextPath:
            "The best next step is to isolate the environments where patient perception matters most, determine which are visibly underperforming, and evaluate which improvements can be implemented with minimal operational disruption.",
    },

    venue: {
        executive:
            "Venue environments are increasingly chosen on more than capacity, location, or logistics. Event planners now judge spaces through visual flexibility, distinction, and how effectively the environment can support memorable experiences. Many venues stay commercially viable while remaining visually static, which slowly weakens booking appeal.",
        dynamics:
            "The category rewards venues that help planners create impact without excessive production burden. At the same time, operators face long renovation cycles, tight downtime windows, and pressure to remain visually current across different event types.",
        gaps: [
            "Ballrooms and event spaces may feel functional but visually interchangeable.",
            "Static finishes can limit how easily the space supports varied event identities.",
            "Older visual layers may weaken planner perception even where operations remain strong.",
            "The environment may lack a refresh strategy between major capital cycles.",
        ],
        recommendations: [
            "Identify which surfaces and visual zones most influence planner perception.",
            "Prioritize transformation systems that improve distinctiveness without full reconstruction.",
            "Treat visual refresh as a competitive strategy rather than as background maintenance.",
            "Create a phased environment plan that supports both recurring bookings and flagship events.",
        ],
        leaders:
            "Stronger venues use adaptable visual systems and more deliberate environment strategies to remain competitive. They refresh the areas that most influence booking confidence instead of waiting for one major renovation event.",
        relevance:
            "SpaceLift is highly relevant where a venue needs stronger visual appeal, greater transformation capability, and a more premium experience without long closure or deep structural disruption.",
        nextPath:
            "The most useful next step is to assess planner-facing perception points, determine where the environment feels least differentiated, and build a refresh strategy around those zones first.",
    },

    mixeduse: {
        executive:
            "Mixed-use and residential developments now compete not only on architecture and amenities, but on atmosphere, perceived prestige, and how convincingly shared spaces support the lifestyle promise of the asset. When lobbies, corridors, and social spaces begin to drift visually, the property can feel less premium even while remaining operationally solid.",
        dynamics:
            "Operators are balancing capital discipline against the need to preserve perceived asset quality. Shared spaces age visually faster than structural systems, and newer competing developments can quickly reset expectations.",
        gaps: [
            "Arrival and common areas may not be maintaining the level of prestige the asset requires.",
            "Corridors and shared environments can age unevenly, weakening overall coherence.",
            "The property may be operationally strong but visually lagging against newer competition.",
            "Shared spaces may lack a refresh cadence that protects long-term perception and leasing appeal.",
        ],
        recommendations: [
            "Focus first on the spaces that define everyday resident and visitor impression.",
            "Separate structural capex needs from perception-driven environment opportunities.",
            "Use surface upgrades to maintain premium positioning without major resident disruption.",
            "Create a recurring refresh strategy instead of relying only on large renovation intervals.",
        ],
        leaders:
            "Stronger operators preserve asset perception through selective, high-visibility environment updates. They understand that a premium property can feel dated long before it becomes physically obsolete.",
        relevance:
            "SpaceLift is particularly relevant where an asset needs to protect prestige, improve shared-space perception, or extend the visual life of high-visibility environments without full reconstruction.",
        nextPath:
            "The immediate priority is to identify which common areas are shaping asset perception most strongly and determine where a targeted refresh would deliver the highest experiential and commercial return.",
    },

    other: {
        executive:
            "Across industries, physical environments are increasingly judged as strategic assets rather than passive containers. The same broad pattern appears repeatedly: spaces continue to function adequately while no longer communicating the level of quality, relevance, or intentionality the organization wants associated with itself.",
        dynamics:
            "In most categories, budget pressure, timeline pressure, and operational continuity concerns make full renovation difficult. At the same time, customer, visitor, and stakeholder expectations continue to rise. That creates demand for targeted transformation strategies that improve perception and consistency without defaulting to major structural work.",
        gaps: [
            "Visible surfaces may not be reinforcing the desired level of confidence or quality.",
            "The environment may feel more generic than the business itself.",
            "Physical space may not be contributing enough to first impression or brand clarity.",
            "Refresh strategy may be absent, leaving the environment to age passively.",
        ],
        recommendations: [
            "Identify the spaces and surfaces that most strongly shape first impression.",
            "Clarify whether the core issue is aesthetics, brand expression, consistency, or rollout logic.",
            "Prioritize visible environment layers that can shift perception quickly.",
            "Build a phased transformation sequence around visibility, practicality, and business value.",
        ],
        leaders:
            "Stronger operators across categories increasingly use selective environment transformation to keep spaces current, coherent, and commercially aligned without overcommitting to full rebuilds.",
        relevance:
            "SpaceLift is relevant where high-visibility surfaces, environmental quality, and coordinated delivery matter more than conventional renovation volume.",
        nextPath:
            "The next step is to define which zones are carrying the most strategic pressure, what the business needs those spaces to communicate, and where visible transformation can create the fastest measurable improvement.",
    },
};

function buildReport(form: ReportForm): BuiltReport {
    const industry = (form.industry || "other") as IndustryKey;
    const pack = REPORT_TEXT[industry];
    const label = INDUSTRY_LABELS[industry];
    const company = form.company || "The organization";
    const intro = `For ${company}, the opportunity currently appears to involve ${(
        form.scope || "the stated scope"
    ).toLowerCase()} across ${(
        form.locations || "the stated footprint"
    ).toLowerCase()} with a working timeline of ${(
        form.timeline || "the current timing window"
    ).toLowerCase()}. The environment type currently being prioritized is ${(
        form.environmentType || "the stated environment"
    ).toLowerCase()}, and the primary challenge has been identified as ${(
        form.primaryChallenge || "an undefined challenge"
    ).toLowerCase()}.`;

    const sections: ReportSection[] = [
        {
            id: "executive",
            icon: Sparkles,
            label: "Section 1",
            title: "Executive Snapshot",
            body: `${pack.executive}\n\n${intro}`,
        },
        {
            id: "dynamics",
            icon: Building2,
            label: "Section 2",
            title: "Industry & Market Dynamics",
            body: `${pack.dynamics}\n\nEnvironment description:\n${form.environment || "No environment description was provided."
                }`,
        },
        {
            id: "gaps",
            icon: ClipboardList,
            label: "Section 3",
            title: "Key Environment Gaps",
            body: `${pack.gaps.map((g) => `• ${g}`).join("\n")}\n\nPrimary challenge:\n${form.primaryChallenge || "Not specified"
                }`,
        },
        {
            id: "recommendations",
            icon: ShieldCheck,
            label: "Section 4",
            title: "Strategic Recommendations",
            body: `${pack.recommendations
                .map((r) => `• ${r}`)
                .join("\n")}\n\nPrimary goals:\n${form.goals || "Not specified"}`,
        },
        {
            id: "leaders",
            icon: LayoutGrid,
            label: "Section 5",
            title: "What Stronger Operators Usually Do",
            body: pack.leaders,
        },
        {
            id: "relevance",
            icon: CheckCircle2,
            label: "Section 6",
            title: "SpaceLift Relevance",
            body: `${pack.relevance}\n\nBudget approach:\n${form.budgetApproach || "Not specified"
                }\n\nConstraints:\n${form.constraints || "No additional constraints were shared."}`,
        },
        {
            id: "next",
            icon: MessageSquareText,
            label: "Section 7",
            title: "Recommended Next Path",
            body: `${pack.nextPath}\n\nAdditional notes:\n${form.notes || "None provided."}`,
        },
    ];

    const plainText = [
        "SPACELIFT STUDIO",
        `${label.toUpperCase()} STRATEGIC ENVIRONMENT REPORT`,
        "",
        `Prepared for: ${form.fullName || "Not specified"}`,
        `Company: ${company}`,
        `Email: ${form.email || "Not specified"}`,
        `Industry: ${label}`,
        `Locations: ${form.locations || "Not specified"}`,
        `Timeline: ${form.timeline || "Not specified"}`,
        `Scope of Work: ${form.scope || "Not specified"}`,
        `Environment Type: ${form.environmentType || "Not specified"}`,
        `Primary Challenge: ${form.primaryChallenge || "Not specified"}`,
        `Budget Approach: ${form.budgetApproach || "Not specified"}`,
        "",
        ...sections.flatMap((s) => [s.title, s.body, ""]),
    ].join("\n");

    return {
        title: `${label} Strategic Environment Report`,
        badge: label,
        summary: intro,
        sections,
        plainText,
    };
}

export default function ContactPage() {
    const [tab, setTab] = useState<TabKey>("report");
    const [showReport, setShowReport] = useState(false);
    const [copied, setCopied] = useState(false);
    const [reportForm, setReportForm] = useState<ReportForm>(reportInitial);
    const [contactForm, setContactForm] = useState<ContactForm>(contactInitial);

    const built = useMemo(() => buildReport(reportForm), [reportForm]);

    const reportReady =
        !!reportForm.fullName &&
        !!reportForm.company &&
        !!reportForm.industry &&
        !!reportForm.locations &&
        !!reportForm.timeline &&
        !!reportForm.scope &&
        !!reportForm.environmentType &&
        !!reportForm.primaryChallenge &&
        !!reportForm.budgetApproach &&
        !!reportForm.goals;

    const contactReady =
        !!contactForm.fullName &&
        !!contactForm.company &&
        !!contactForm.email &&
        !!contactForm.projectType &&
        !!contactForm.projectDescription;

    useEffect(() => {
        if (showReport) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [showReport]);

    async function handleCopy() {
        await navigator.clipboard.writeText(built.plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    }

    function submitDirectContact() {
        const subject = encodeURIComponent(
            `SpaceLift Inquiry — ${contactForm.company} — ${contactForm.projectType}`
        );

        const body = encodeURIComponent(
            [
                `Name: ${contactForm.fullName}`,
                `Company: ${contactForm.company}`,
                `Email: ${contactForm.email}`,
                `Phone: ${contactForm.phone || "Not provided"}`,
                `Project Type: ${contactForm.projectType}`,
                "",
                "Project Description:",
                contactForm.projectDescription,
            ].join("\n")
        );

        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    }

    const ActiveIndustryIcon = reportForm.industry
        ? INDUSTRY_ICONS[reportForm.industry]
        : ClipboardList;

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section
                        key="form-view"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35 }}
                        className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-16"
                    >
                        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
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

                                <h1 className="max-w-[760px] text-[52px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[64px] lg:text-[82px] xl:text-[96px]">
                                    Start with the path that fits the opportunity.
                                </h1>

                                <p
                                    className="mt-8 max-w-[740px] text-[22px] leading-[1.65]"
                                    style={{ color: COLORS.muted }}
                                >
                                    Generate a premium industry-specific strategic report or contact SpaceLift
                                    directly if you already have a live opportunity in mind.
                                </p>

                                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                    <FeatureCard
                                        title="Industry intelligence"
                                        body="Built around recurring sector pressures, environment gaps, and perception signals."
                                    />
                                    <FeatureCard
                                        title="Personalized output"
                                        body="Locations, timeline, scope, constraints, and goals shape the final report."
                                    />
                                    <FeatureCard
                                        title="Immediate value"
                                        body="The report appears instantly in a premium scrollable format and can be copied."
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
                                    <h2 className="text-[40px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">
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
                                            className="grid grid-cols-2 border-b"
                                            style={{ borderColor: COLORS.border }}
                                        >
                                            <TabButton
                                                active={tab === "report"}
                                                onClick={() => setTab("report")}
                                                label="Strategic Report"
                                            />
                                            <TabButton
                                                active={tab === "contact"}
                                                onClick={() => setTab("contact")}
                                                label="Direct Contact"
                                            />
                                        </div>

                                        <div className="bg-white p-5 md:p-7 lg:p-8">
                                            <AnimatePresence mode="wait">
                                                {tab === "report" ? (
                                                    <motion.div
                                                        key="report-tab"
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
                                                            Tell us about the environment and we’ll generate the report
                                                            instantly.
                                                        </h3>

                                                        <p
                                                            className="mt-3 text-[20px] leading-[1.55]"
                                                            style={{ color: COLORS.muted }}
                                                        >
                                                            This version is intentionally simple, stable, and
                                                            launch-ready. No backend required.
                                                        </p>

                                                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                            <div>
                                                                <FieldLabel>Full name</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Your name"
                                                                    value={reportForm.fullName}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, fullName: e.target.value }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Company</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Company name"
                                                                    value={reportForm.company}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, company: e.target.value }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Email</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Optional"
                                                                    value={reportForm.email}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, email: e.target.value }))
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
                                                                <Select
                                                                    value={reportForm.locations}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, locations: e.target.value }))
                                                                    }
                                                                >
                                                                    <option value="">Select range</option>
                                                                    <option value="1 location">1 location</option>
                                                                    <option value="2–5 locations">2–5 locations</option>
                                                                    <option value="6–20 locations">6–20 locations</option>
                                                                    <option value="20+ locations">20+ locations</option>
                                                                    <option value="Still being defined">Still being defined</option>
                                                                </Select>
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Timeline</FieldLabel>
                                                                <Select
                                                                    value={reportForm.timeline}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, timeline: e.target.value }))
                                                                    }
                                                                >
                                                                    <option value="">Select timeline</option>
                                                                    <option value="Immediate / active need">
                                                                        Immediate / active need
                                                                    </option>
                                                                    <option value="Within 3 months">Within 3 months</option>
                                                                    <option value="3–6 months">3–6 months</option>
                                                                    <option value="6–12 months">6–12 months</option>
                                                                    <option value="Phased / ongoing">Phased / ongoing</option>
                                                                </Select>
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Scope of work</FieldLabel>
                                                                <Select
                                                                    value={reportForm.scope}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, scope: e.target.value }))
                                                                    }
                                                                >
                                                                    <option value="">Select scope</option>
                                                                    <option value="Single priority zone">
                                                                        Single priority zone
                                                                    </option>
                                                                    <option value="Multiple visible zones">
                                                                        Multiple visible zones
                                                                    </option>
                                                                    <option value="Full environment refresh">
                                                                        Full environment refresh
                                                                    </option>
                                                                    <option value="Multi-site rollout">Multi-site rollout</option>
                                                                    <option value="Still defining the scope">
                                                                        Still defining the scope
                                                                    </option>
                                                                </Select>
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Environment type</FieldLabel>
                                                                <Select
                                                                    value={reportForm.environmentType}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            environmentType: e.target.value,
                                                                        }))
                                                                    }
                                                                >
                                                                    <option value="">Select environment type</option>
                                                                    <option value="Arrival / lobby">Arrival / lobby</option>
                                                                    <option value="Corridors / circulation">
                                                                        Corridors / circulation
                                                                    </option>
                                                                    <option value="Guest / customer-facing areas">
                                                                        Guest / customer-facing areas
                                                                    </option>
                                                                    <option value="Workplace / collaboration zones">
                                                                        Workplace / collaboration zones
                                                                    </option>
                                                                    <option value="Ballroom / event space">
                                                                        Ballroom / event space
                                                                    </option>
                                                                    <option value="Shared amenities">Shared amenities</option>
                                                                </Select>
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Primary challenge</FieldLabel>
                                                                <Select
                                                                    value={reportForm.primaryChallenge}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            primaryChallenge: e.target.value,
                                                                        }))
                                                                    }
                                                                >
                                                                    <option value="">Select challenge</option>
                                                                    <option value="Environment feels outdated">
                                                                        Environment feels outdated
                                                                    </option>
                                                                    <option value="Brand presence is weak">
                                                                        Brand presence is weak
                                                                    </option>
                                                                    <option value="Experience feels generic">
                                                                        Experience feels generic
                                                                    </option>
                                                                    <option value="Visual consistency is weak">
                                                                        Visual consistency is weak
                                                                    </option>
                                                                    <option value="Space no longer matches business ambition">
                                                                        Space no longer matches business ambition
                                                                    </option>
                                                                    <option value="Need a scalable transformation approach">
                                                                        Need a scalable transformation approach
                                                                    </option>
                                                                </Select>
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Budget approach</FieldLabel>
                                                                <Select
                                                                    value={reportForm.budgetApproach}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({
                                                                            ...p,
                                                                            budgetApproach: e.target.value,
                                                                        }))
                                                                    }
                                                                >
                                                                    <option value="">Select budget approach</option>
                                                                    <option value="Looking for a phased approach">
                                                                        Looking for a phased approach
                                                                    </option>
                                                                    <option value="Prepared for a serious premium upgrade">
                                                                        Prepared for a serious premium upgrade
                                                                    </option>
                                                                    <option value="Need value without full reconstruction">
                                                                        Need value without full reconstruction
                                                                    </option>
                                                                    <option value="Still being evaluated internally">
                                                                        Still being evaluated internally
                                                                    </option>
                                                                </Select>
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Environment description</FieldLabel>
                                                                <Textarea
                                                                    rows={5}
                                                                    placeholder="Describe the space, current condition, who uses it, and what feels off right now."
                                                                    value={reportForm.environment}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, environment: e.target.value }))
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
                                                                        setReportForm((p) => ({ ...p, goals: e.target.value }))
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
                                                                        setReportForm((p) => ({ ...p, constraints: e.target.value }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Additional notes</FieldLabel>
                                                                <Textarea
                                                                    rows={3}
                                                                    placeholder="Anything else worth factoring into the report."
                                                                    value={reportForm.notes}
                                                                    onChange={(e) =>
                                                                        setReportForm((p) => ({ ...p, notes: e.target.value }))
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mt-10">
                                                            <PrimaryButton
                                                                disabled={!reportReady}
                                                                onClick={() => setShowReport(true)}
                                                            >
                                                                Generate Strategic Report
                                                            </PrimaryButton>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="contact-tab"
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

                                                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                            <div>
                                                                <FieldLabel>Full name</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Your name"
                                                                    value={contactForm.fullName}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({ ...p, fullName: e.target.value }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Company</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Company name"
                                                                    value={contactForm.company}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({ ...p, company: e.target.value }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Email</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Your email"
                                                                    value={contactForm.email}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({ ...p, email: e.target.value }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <FieldLabel>Phone</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Optional"
                                                                    value={contactForm.phone}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({ ...p, phone: e.target.value }))
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Project type</FieldLabel>
                                                                <Select
                                                                    value={contactForm.projectType}
                                                                    onChange={(e) =>
                                                                        setContactForm((p) => ({
                                                                            ...p,
                                                                            projectType: e.target.value,
                                                                        }))
                                                                    }
                                                                >
                                                                    <option value="">Select type</option>
                                                                    <option value="Hospitality environment">Hospitality</option>
                                                                    <option value="Corporate / workplace">Workplace</option>
                                                                    <option value="Retail environment">Retail</option>
                                                                    <option value="Healthcare environment">Healthcare</option>
                                                                    <option value="Venue / event environment">Venue/Event</option>
                                                                    <option value="Mixed-use / residential">Mixed-Use</option>
                                                                    <option value="Other">Other</option>
                                                                </Select>
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Project description</FieldLabel>
                                                                <Textarea
                                                                    rows={5}
                                                                    placeholder="Tell us about the environment and scope."
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
                                                            <PrimaryButton
                                                                disabled={!contactReady}
                                                                onClick={submitDirectContact}
                                                            >
                                                                <Send className="h-4 w-4" />
                                                                Submit Inquiry
                                                            </PrimaryButton>
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
                        key="report-view"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.35 }}
                        className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-14"
                    >
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <SecondaryButton onClick={() => setShowReport(false)}>
                                <ArrowLeft className="h-4 w-4" />
                                Back to Form
                            </SecondaryButton>

                            <SecondaryButton onClick={handleCopy}>
                                <Copy className="h-4 w-4" />
                                {copied ? "Copied" : "Copy Report"}
                            </SecondaryButton>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[350px_minmax(0,1fr)]">
                            <aside className="lg:sticky lg:top-8 lg:self-start">
                                <div
                                    className="overflow-hidden rounded-[30px] shadow-[0_20px_60px_rgba(17,17,17,0.08)]"
                                    style={{
                                        background: COLORS.panel,
                                        border: `1px solid ${COLORS.border}`,
                                    }}
                                >
                                    <div
                                        className="border-b p-6"
                                        style={{ borderColor: COLORS.border }}
                                    >
                                        <div
                                            className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                                            style={{ color: COLORS.orange }}
                                        >
                                            SpaceLift Studio
                                        </div>

                                        <div className="mt-4 flex items-start gap-4">
                                            <div
                                                className="rounded-[16px] p-3"
                                                style={{
                                                    background: COLORS.orangeSoft,
                                                    color: COLORS.orange,
                                                }}
                                            >
                                                <ActiveIndustryIcon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h2 className="text-[28px] font-bold leading-[1.06] tracking-[-0.03em]">
                                                    {built.title}
                                                </h2>
                                                <div
                                                    className="mt-2 inline-flex rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.2em]"
                                                    style={{
                                                        background: COLORS.white,
                                                        color: COLORS.orange,
                                                        border: `1px solid ${COLORS.border}`,
                                                    }}
                                                >
                                                    {built.badge}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 p-6">
                                        <SummaryRow icon={Mail} label="Prepared for" value={reportForm.fullName} />
                                        <SummaryRow
                                            icon={Building2}
                                            label="Company"
                                            value={reportForm.company}
                                        />
                                        <SummaryRow
                                            icon={MapPinned}
                                            label="Locations"
                                            value={reportForm.locations}
                                        />
                                        <SummaryRow icon={Sparkles} label="Timeline" value={reportForm.timeline} />
                                        <SummaryRow icon={MessageSquareText} label="Scope" value={reportForm.scope} />
                                        <SummaryRow
                                            icon={ClipboardList}
                                            label="Environment type"
                                            value={reportForm.environmentType}
                                        />
                                    </div>
                                </div>
                            </aside>

                            <main className="space-y-6">
                                <motion.section
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="rounded-[30px] bg-white p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)] md:p-8"
                                    style={{ border: `1px solid ${COLORS.border}` }}
                                >
                                    <div
                                        className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                                        style={{ color: COLORS.orange }}
                                    >
                                        Strategic overview
                                    </div>
                                    <h1 className="mt-3 text-[38px] font-bold leading-[1.04] tracking-[-0.04em] md:text-[48px]">
                                        {built.title}
                                    </h1>
                                    <p
                                        className="mt-5 max-w-[920px] text-[18px] leading-[1.9]"
                                        style={{ color: COLORS.muted }}
                                    >
                                        {built.summary}
                                    </p>
                                </motion.section>

                                {built.sections.map((section, index) => {
                                    const Icon = section.icon;
                                    return (
                                        <motion.section
                                            key={section.id}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{ duration: 0.35, delay: index * 0.04 }}
                                            className="rounded-[30px] bg-white p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)] md:p-8"
                                            style={{ border: `1px solid ${COLORS.border}` }}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="rounded-[16px] p-3"
                                                    style={{
                                                        background: COLORS.orangeSoft,
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
                                                        {section.label}
                                                    </div>

                                                    <h3 className="mt-2 text-[30px] font-bold leading-[1.08] tracking-[-0.03em]">
                                                        {section.title}
                                                    </h3>

                                                    <div
                                                        className="mt-5 whitespace-pre-wrap text-[17px] leading-[1.95]"
                                                        style={{ color: COLORS.muted }}
                                                    >
                                                        {section.body}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.section>
                                    );
                                })}

                                <motion.section
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.35 }}
                                    className="rounded-[30px] p-6 md:p-8"
                                    style={{
                                        background:
                                            "radial-gradient(circle at top left, rgba(255,106,23,0.08), transparent 28%), linear-gradient(135deg, #1A1B1F 0%, #25262B 100%)",
                                        color: COLORS.white,
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#FFB184]">
                                        Final action
                                    </div>

                                    <h3 className="mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.03em]">
                                        Keep the report or continue the conversation.
                                    </h3>

                                    <p className="mt-4 max-w-[860px] text-[17px] leading-[1.9] text-white/80">
                                        This report provides immediate value. If the opportunity is live, the next step
                                        is a direct conversation around scope, priorities, and transformation path.
                                    </p>

                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <button
                                            onClick={handleCopy}
                                            className="inline-flex h-14 items-center gap-2 rounded-[18px] bg-white px-6 text-[16px] font-semibold transition hover:opacity-95"
                                            style={{ color: COLORS.text }}
                                        >
                                            <Copy className="h-4 w-4" />
                                            {copied ? "Copied" : "Copy Report"}
                                        </button>

                                        <button
                                            onClick={() => setShowReport(false)}
                                            className="inline-flex h-14 items-center rounded-[18px] border px-6 text-[16px] font-semibold text-white transition hover:bg-white/5"
                                            style={{ borderColor: "rgba(255,255,255,0.18)" }}
                                        >
                                            Start New Assessment
                                        </button>
                                    </div>
                                </motion.section>
                            </main>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-components
function FeatureCard({ title, body }: { title: string; body: string }) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="rounded-[22px] p-6 shadow-sm"
            style={{
                background:
                    "radial-gradient(circle at top left, rgba(255,106,23,0.10), transparent 28%), linear-gradient(135deg, #1A1B1F 0%, #2A2A2D 100%)",
                color: COLORS.white,
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            <div className="text-[15px] font-semibold leading-6 text-[#FFB184]">{title}</div>
            <div className="mt-3 text-[15px] leading-7 text-white/80">{body}</div>
        </motion.div>
    );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-5 text-center text-[18px] font-semibold transition"
            style={{
                background: active ? COLORS.white : "transparent",
                color: COLORS.text,
                boxShadow: active ? `inset 0 -3px 0 ${COLORS.orange}` : "none",
            }}
        >
            {label}
        </button>
    );
}

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-[18px] px-6 text-[17px] font-semibold text-white transition disabled:opacity-40 hover:shadow-[0_14px_30px_rgba(255,106,23,0.22)]"
            style={{ background: COLORS.orange }}
        >
            {children}
        </button>
    );
}

function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-[16px] border px-4 py-3 text-[15px] font-medium transition hover:bg-white"
            style={{
                borderColor: COLORS.border,
                color: COLORS.text,
                background: "rgba(255,255,255,0.45)",
            }}
        >
            {children}
        </button>
    );
}

function SummaryRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div
            className="flex items-start gap-3 rounded-[18px] p-4"
            style={{
                background: "rgba(255,255,255,0.55)",
                border: `1px solid ${COLORS.border}`,
            }}
        >
            <div style={{ color: COLORS.orange }} className="mt-0.5">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: COLORS.muted }}>
                    {label}
                </div>
                <div className="mt-1 text-[15px] font-medium">{value || "Not specified"}</div>
            </div>
        </div>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="mb-2 text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: COLORS.muted }}>
            {children}
        </div>
    );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none transition placeholder:text-[#9A9A9A] focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] ${props.className || ""}`}
            style={{ borderColor: COLORS.border, color: COLORS.text }}
        />
    );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={`w-full rounded-[18px] border bg-white px-5 py-4 text-[18px] outline-none transition placeholder:text-[#9A9A9A] focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] ${props.className || ""}`}
            style={{ borderColor: COLORS.border, color: COLORS.text }}
        />
    );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none transition focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] ${props.className || ""}`}
            style={{ borderColor: COLORS.border, color: COLORS.text }}
        />
    );
}