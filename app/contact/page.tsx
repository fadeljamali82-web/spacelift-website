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

// --- YOUR VERIFIED CRM URL ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbwxd8V82TRv76MI8dnBlIbjbNJnCOO4faPueYJEGIlz0k-_v5TrCJfyO_mMGKABs3KcsA/exec";

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
    environment: string;
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
    environment: "",
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
    healthcare: Building2,
    venue: Building2,
    mixeduse: LayoutGrid,
    other: ClipboardList,
};

const REPORT_TEXT: Record<IndustryKey, any> = {
    hospitality: {
        executive: "Hospitality environments are increasingly judged through atmosphere, consistency, and perceived quality. The real issue is often whether the space works while signaling the standard associated with the brand.",
        dynamics: "The category is shaped by rising guest expectations and operators who treat environment as part of the guest experience layer.",
        gaps: ["Arrival zones underperform", "Public spaces lose distinctiveness"],
        recommendations: ["Rank by perception impact", "Phased refresh logic"],
        leaders: "Stronger hospitality operators maintain an active lifecycle strategy.",
        relevance: "SpaceLift improves perception faster than traditional renovation routes.",
        nextPath: "Isolate guest-facing zones that shape first impression most strongly.",
    },
    corporate: { executive: "Workplaces are judged by supporting culture and collaboration. Many remain functional but fail to justify physical presence.", dynamics: "Organizations now use the office as a business tool rather than a default container.", gaps: ["Generic feel", "Space quality lags ambition"], recommendations: ["Assess employee perception", "Translate brand materials"], leaders: "Stronger operators align environment around purpose.", relevance: "SpaceLift adds identity without default redesign cycles.", nextPath: "Determine if the core issue is brand or collaboration." },
    retail: { executive: "Retail needs to function as a brand experience system. Store atmosphere justifies itself through memorability.", dynamics: "Strongest stores translate brand identity into physical space layers.", gaps: ["Lack of experiential hierarchy", "Dated visual backdrops"], recommendations: ["Identify dwell moments", "Refresh visible layers first"], leaders: "Stronger operators treat the store as a dynamic platform.", relevance: "Stronger physical brand presence and scalable transformation.", nextPath: "Prioritize flagship impact vs network consistency." },
    healthcare: { executive: "Healthcare environments are judged by trust, calm, and clarity. First impressions form before clinical interaction.", dynamics: "Providers face pressure to improve perception without reconstruction.", gaps: ["Waiting zones lack reassurance", "Care outperforms environment"], recommendations: ["Start with reception", "Prioritize surface systems"], leaders: "Patient experience is shaped by the environment layer.", relevance: "Modernization without structural intervention.", nextPath: "Isolate high-perception environments." },
    venue: { executive: "Venues are chosen on visual flexibility. Event planners judge spaces by how they support memorable experiences.", dynamics: "Category rewards venues that create impact without production burden.", gaps: ["Interchangeable spaces", "Static finishes"], recommendations: ["Identify planner-facing zones", "Refresh as competitive strategy"], leaders: "Stronger venues use adaptable visual systems.", relevance: "Strong visual appeal and low operational downtime.", nextPath: "Assess planner-facing perception points." },
    mixeduse: { executive: "Developments compete on atmosphere and lifestyle promise. Prestige is maintained in social spaces.", dynamics: "Shared spaces age faster than structural systems.", gaps: ["Arrival points lack prestige", "Incoherent common zones"], recommendations: ["Focus on resident impressions", "Recurring refresh cadence"], leaders: "Stronger operators preserve asset perception via surface updates.", relevance: "Protect prestige and leasing appeal.", nextPath: "Identify areas shaping resident impression." },
    other: { executive: "Physical environments are strategic assets. Spaces must communicate quality and intentionality.", dynamics: "Stakeholder expectations rise despite budget and timeline pressures.", gaps: ["Generic environment", "Weak first impression"], recommendations: ["Identify high-impact surfaces", "Phased transformation"], leaders: "Stronger operators use selective transformation logic.", relevance: "High visibility and coordinated delivery.", nextPath: "Define zones carrying the most strategic pressure." },
};

function buildReport(form: ReportForm): BuiltReport {
    const industry = (form.industry || "other") as IndustryKey;
    const pack = REPORT_TEXT[industry];
    const label = INDUSTRY_LABELS[industry];
    const company = form.company || "The organization";
    const intro = `For ${company}, the opportunity involves ${(form.scope || "the stated scope").toLowerCase()} across ${(form.locations || "the footprint").toLowerCase()} with a timeline of ${(form.timeline || "current window").toLowerCase()}. Primary challenge: ${(form.primaryChallenge || "undefined").toLowerCase()}.`;

    const sections: ReportSection[] = [
        { id: "executive", icon: Sparkles, label: "Section 1", title: "Executive Snapshot", body: `${pack.executive}\n\n${intro}` },
        { id: "dynamics", icon: Building2, label: "Section 2", title: "Market Dynamics", body: `${pack.dynamics}\n\nEnvironment: ${form.environment || "None provided."}` },
        { id: "gaps", icon: ClipboardList, label: "Section 3", title: "Key Gaps", body: `${pack.gaps.map((g: string) => `• ${g}`).join("\n")}\n\nChallenge: ${form.primaryChallenge}` },
        { id: "recommendations", icon: ShieldCheck, label: "Section 4", title: "Strategic Path", body: `${pack.recommendations.map((r: string) => `• ${r}`).join("\n")}\n\nGoals: ${form.goals}` },
        { id: "leaders", icon: LayoutGrid, label: "Section 5", title: "Leader Insights", body: pack.leaders },
        { id: "relevance", icon: CheckCircle2, label: "Section 6", title: "SpaceLift Relevance", body: `${pack.relevance}\n\nBudget approach: ${form.budgetApproach}\nConstraints: ${form.constraints || "None."}` },
        { id: "next", icon: MessageSquareText, label: "Section 7", title: "Next Steps", body: pack.nextPath },
    ];

    return {
        title: `${label} Strategic Report`,
        badge: label,
        summary: intro,
        sections,
        plainText: sections.map(s => `${s.title}\n${s.body}`).join("\n\n"),
    };
}

export default function ContactPage() {
    const [tab, setTab] = useState<TabKey>("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [reportForm, setReportForm] = useState<ReportForm>(reportInitial);
    const [contactForm, setContactForm] = useState<ContactForm>(contactInitial);

    const built = useMemo(() => buildReport(reportForm), [reportForm]);

    const reportReady = !!reportForm.fullName && !!reportForm.company && !!reportForm.industry && !!reportForm.locations && !!reportForm.timeline && !!reportForm.scope && !!reportForm.environmentType && !!reportForm.primaryChallenge && !!reportForm.budgetApproach && !!reportForm.goals;
    const contactReady = !!contactForm.fullName && !!contactForm.company && !!contactForm.email && !!contactForm.projectType && !!contactForm.projectDescription;

    async function syncToCRM(data: any, source: string) {
        setLoading(true);
        try {
            await fetch(CRM_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, source }),
            });
        } catch (e) {
            console.error("CRM Sync Error", e);
        } finally {
            setLoading(false);
        }
    }

    async function handleGenerateReport() {
        await syncToCRM(reportForm, "Report Generated");
        setShowReport(true);
    }

    async function handleDirectContact() {
        await syncToCRM(contactForm, "Direct Inquiry");
        const subject = encodeURIComponent(`SpaceLift Inquiry — ${contactForm.company}`);
        const body = encodeURIComponent(`Name: ${contactForm.fullName}\nEmail: ${contactForm.email}\nProject: ${contactForm.projectDescription}`);
        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    }

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20">
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                            <div className="pt-4">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.26em]" style={{ color: COLORS.orange }}>
                                    <span className="h-px w-10 bg-current" /> Strategic Assessment
                                </div>
                                <h1 className="text-[52px] font-bold leading-[0.92] tracking-[-0.04em] lg:text-[96px]">The path that fits the opportunity.</h1>
                                <p className="mt-8 text-2xl text-neutral-500 leading-relaxed">Generate a custom environment report or reach out for direct collaboration.</p>
                                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                                    <FeatureCard title="Industry Intel" body="Built on sector pressures and gaps." />
                                    <FeatureCard title="Personalized" body="Output tailored to your goals." />
                                    <FeatureCard title="Instant" body="Ready for your internal decks." />
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-[#F3EDE8] p-2 shadow-2xl border border-black/5">
                                <div className="flex bg-white/50 rounded-[32px] p-1 overflow-hidden">
                                    <button onClick={() => setTab("report")} className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition ${tab === "report" ? "bg-white shadow-sm" : "opacity-50"}`}>Strategic Report</button>
                                    <button onClick={() => setTab("contact")} className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition ${tab === "contact" ? "bg-white shadow-sm" : "opacity-50"}`}>Direct Contact</button>
                                </div>
                                <div className="bg-white p-8 rounded-b-[38px] mt-1">
                                    {tab === "report" ? (
                                        <div className="space-y-6">
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <TextInput label="Full Name" value={reportForm.fullName} onChange={e => setReportForm({ ...reportForm, fullName: e.target.value })} placeholder="Your name" />
                                                <TextInput label="Company" value={reportForm.company} onChange={e => setReportForm({ ...reportForm, company: e.target.value })} placeholder="Company name" />
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <Select label="Industry" value={reportForm.industry} onChange={e => setReportForm({ ...reportForm, industry: e.target.value as IndustryKey })}>
                                                    <option value="">Select industry</option>
                                                    {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                                </Select>
                                                <Select label="Timeline" value={reportForm.timeline} onChange={e => setReportForm({ ...reportForm, timeline: e.target.value })}>
                                                    <option value="">Select timeline</option>
                                                    <option value="Immediate">Immediate</option>
                                                    <option value="3-6 Months">3-6 Months</option>
                                                </Select>
                                            </div>
                                            <Textarea label="Environment Description" value={reportForm.environment} onChange={e => setReportForm({ ...reportForm, environment: e.target.value })} placeholder="Describe the space..." rows={3} />
                                            <Textarea label="Strategic Goals" value={reportForm.goals} onChange={e => setReportForm({ ...reportForm, goals: e.target.value })} placeholder="What needs to improve?" rows={3} />
                                            <PrimaryButton disabled={!reportReady || loading} onClick={handleGenerateReport}>{loading ? "Syncing to CRM..." : "Generate Strategic Report"}</PrimaryButton>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <TextInput label="Name" value={contactForm.fullName} onChange={e => setContactForm({ ...contactForm, fullName: e.target.value })} placeholder="Full name" />
                                            <TextInput label="Company" value={contactForm.company} onChange={e => setContactForm({ ...contactForm, company: e.target.value })} placeholder="Org name" />
                                            <Textarea label="Project Inquiry" value={contactForm.projectDescription} onChange={e => setContactForm({ ...contactForm, projectDescription: e.target.value })} placeholder="How can we help?" rows={5} />
                                            <PrimaryButton disabled={!contactReady || loading} onClick={handleDirectContact}>{loading ? "Syncing..." : "Submit Inquiry"}</PrimaryButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="report-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl px-6 py-16">
                        <div className="mb-12 flex justify-between">
                            <button onClick={() => setShowReport(false)} className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest"><ArrowLeft className="w-4 h-4" /> Back</button>
                            <button onClick={async () => { await navigator.clipboard.writeText(built.plainText); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase">{copied ? "Copied!" : "Copy Full Report"}</button>
                        </div>
                        <div className="space-y-12">
                            <header className="border-b border-black/10 pb-8">
                                <div className="flex items-center gap-4 text-orange-600 font-bold uppercase tracking-widest text-xs"><Sparkles className="w-4 h-4" /> Strategic Assessment</div>
                                <h2 className="mt-4 text-5xl font-bold tracking-tight">{built.title}</h2>
                            </header>
                            {built.sections.map((s, i) => (
                                <div key={s.id} className="relative pl-12">
                                    <div className="absolute left-0 top-0 text-3xl font-black text-orange-500/20">{i + 1}</div>
                                    <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                                    <p className="text-lg leading-relaxed text-neutral-600 whitespace-pre-wrap">{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helpers
function FeatureCard({ title, body }: any) {
    return (
        <div className="rounded-3xl bg-[#1A1B1F] p-8 text-white border border-white/5 shadow-xl">
            <h4 className="text-[#FFB184] font-bold mb-2">{title}</h4>
            <p className="text-white/60 text-sm leading-relaxed">{body}</p>
        </div>
    );
}

function TextInput({ label, ...props }: any) {
    return (
        <div className="space-y-1 w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <input {...props} className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:border-[#FF6A17] outline-none transition" />
        </div>
    );
}

function Select({ label, children, ...props }: any) {
    return (
        <div className="space-y-1 w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <select {...props} className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:border-[#FF6A17] outline-none transition">{children}</select>
        </div>
    );
}

function Textarea({ label, ...props }: any) {
    return (
        <div className="space-y-1 w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <textarea {...props} className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:border-[#FF6A17] outline-none transition" />
        </div>
    );
}

function PrimaryButton({ children, onClick, disabled }: any) {
    return (
        <button disabled={disabled} onClick={onClick} className="w-full bg-[#FF6A17] hover:bg-[#D9540F] text-white font-bold py-5 rounded-2xl transition disabled:opacity-40 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3">
            {children}
        </button>
    );
}