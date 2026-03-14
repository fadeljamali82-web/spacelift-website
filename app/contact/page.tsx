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

// --- CRM CONFIGURATION ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbwWvk83gwyo0cKQYDV_qy161fTmzlFCGzyDgc3FehkcpZ1IeaBDI8aD_Te4AHmoH3gqhQ/exec";

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
    healthcare: Building2,
    venue: Building2,
    mixeduse: LayoutGrid,
    other: ClipboardList,
};

const REPORT_TEXT: Record<IndustryKey, any> = {
    hospitality: {
        executive: "Hospitality environments are increasingly judged through atmosphere and perceived quality. Properties that feel visually current often outperform older competitors.",
        dynamics: "The category is shaped by rising guest expectations and tighter capital discipline.",
        gaps: ["Arrival zones underperform", "Public spaces lose distinctiveness"],
        recommendations: ["Rank by perception impact", "Use phased refresh logic"],
        leaders: "Stronger operators maintain an active lifecycle strategy.",
        relevance: "SpaceLift improves perception faster than traditional routes.",
        nextPath: "Isolate guest-facing zones that shape first impressions.",
    },
    corporate: { executive: "Workplaces support culture and identity. Spaces must justify physical presence.", dynamics: "Hybrid work and utilization pressure drive office intentionality.", gaps: ["Generic feel", "Pre-hybrid assumptions"], recommendations: ["Reassess impact spaces", "Translate brand language"], leaders: "Stronger operators use the office as a culture tool.", relevance: "SpaceLift adds identity without full redesign.", nextPath: "Determine if the issue is brand or collaboration." },
    retail: { executive: "Retail must be a brand experience system. Atmosphere justifies the physical store.", dynamics: "Balancing experience and network consistency.", gaps: ["Lack of experiential hierarchy", "Dated visual backdrops"], recommendations: ["Identify key dwell moments", "Refresh visible layers first"], leaders: "Stronger operators treat the store as a dynamic platform.", relevance: "Stronger physical presence and scalable logic.", nextPath: "Prioritize flagship impact vs consistency." },
    healthcare: { executive: "Environments are judged by clarity, calm, and trust.", dynamics: "Pressure from aging infrastructure and cost discipline.", gaps: ["Waiting zones lack reassurance", "Care outperforms environment"], recommendations: ["Start with reception", "Prioritize surface systems"], leaders: "Patient experience is shaped by the environment.", relevance: "Modernization without structural intervention.", nextPath: "Isolate environments where perception matters most." },
    venue: { executive: "Venues are chosen for visual flexibility and distinction.", dynamics: "Category rewards impact without production burden.", gaps: ["Interchangeable spaces", "Static finishes"], recommendations: ["Identify perception zones", "Refresh as competitive strategy"], leaders: "Stronger venues use adaptable visual systems.", relevance: "Strong appeal and low operational downtime.", nextPath: "Assess planner-facing perception points." },
    mixeduse: { executive: "Developments compete on atmosphere and prestige.", dynamics: "Shared spaces age faster than structural systems.", gaps: ["Arrival areas lack prestige", "Incoherent common zones"], recommendations: ["Focus on everyday impressions", "Recurring refresh logic"], leaders: "Stronger operators preserve asset perception.", relevance: "Protect prestige and leasing appeal.", nextPath: "Identify common areas shaping perception." },
    other: { executive: "Environments are strategic assets, not passive containers.", dynamics: "Rising stakeholder expectations despite budget pressure.", gaps: ["Generic environment", "Weak brand expression"], recommendations: ["Identify high-impact surfaces", "Phased transformation"], leaders: "Stronger operators use selective transformation.", relevance: "High visibility and coordinated delivery.", nextPath: "Define zones carrying strategic pressure." },
};

function buildReport(form: ReportForm): BuiltReport {
    const industry = (form.industry || "other") as IndustryKey;
    const pack = REPORT_TEXT[industry];
    const label = INDUSTRY_LABELS[industry];
    const company = form.company || "The organization";
    const intro = `For ${company}, the opportunity involves ${(form.scope || "the stated scope").toLowerCase()} across ${(form.locations || "the footprint").toLowerCase()}. The primary challenge is ${(form.primaryChallenge || "an undefined challenge").toLowerCase()}.`;

    const sections: ReportSection[] = [
        { id: "executive", icon: Sparkles, label: "Section 1", title: "Executive Snapshot", body: `${pack.executive}\n\n${intro}` },
        { id: "dynamics", icon: Building2, label: "Section 2", title: "Market Dynamics", body: `${pack.dynamics}\n\nEnvironment: ${form.environment || "None provided."}` },
        { id: "gaps", icon: ClipboardList, label: "Section 3", title: "Key Gaps", body: `${pack.gaps.map((g: string) => `• ${g}`).join("\n")}\n\nChallenge: ${form.primaryChallenge}` },
        { id: "recommendations", icon: ShieldCheck, label: "Section 4", title: "Strategic Path", body: `${pack.recommendations.map((r: string) => `• ${r}`).join("\n")}\n\nGoals: ${form.goals}` },
        { id: "leaders", icon: LayoutGrid, label: "Section 5", title: "Leader Insights", body: pack.leaders },
        { id: "relevance", icon: CheckCircle2, label: "Section 6", title: "SpaceLift Relevance", body: `${pack.relevance}\n\nConstraints: ${form.constraints || "None provided."}` },
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
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reportForm, setReportForm] = useState<ReportForm>(reportInitial);
    const [contactForm, setContactForm] = useState<ContactForm>(contactInitial);

    const built = useMemo(() => buildReport(reportForm), [reportForm]);

    const reportReady = useMemo(() => {
        return !!reportForm.fullName && !!reportForm.company && !!reportForm.industry && !!reportForm.locations && !!reportForm.timeline && !!reportForm.scope && !!reportForm.environmentType && !!reportForm.primaryChallenge && !!reportForm.budgetApproach && !!reportForm.goals;
    }, [reportForm]);

    const contactReady = !!contactForm.fullName && !!contactForm.company && !!contactForm.email && !!contactForm.projectType && !!contactForm.projectDescription;

    useEffect(() => {
        if (showReport) window.scrollTo({ top: 0, behavior: "smooth" });
    }, [showReport]);

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
        await syncToCRM(reportForm, "Strategic Report");
        setShowReport(true);
    }

    async function submitDirectContact() {
        await syncToCRM(contactForm, "Direct Contact");

        const subject = encodeURIComponent(`SpaceLift Inquiry — ${contactForm.company}`);
        const body = encodeURIComponent(`Name: ${contactForm.fullName}\nEmail: ${contactForm.email}\nProject: ${contactForm.projectDescription}`);
        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(built.plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const ActiveIndustryIcon = reportForm.industry ? INDUSTRY_ICONS[reportForm.industry] : ClipboardList;

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form-view" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-16">
                        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
                            <div className="pt-2 lg:pt-6">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.26em]" style={{ color: COLORS.orange }}>
                                    <span className="inline-block h-px w-10" style={{ background: COLORS.orange }} />
                                    Strategic report & direct contact
                                </div>
                                <h1 className="max-w-[760px] text-[52px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[64px] lg:text-[82px] xl:text-[96px]">Start with the path that fits the opportunity.</h1>
                                <p className="mt-8 max-w-[740px] text-[22px] leading-[1.65]" style={{ color: COLORS.muted }}>Generate a premium industry-specific strategic report or contact SpaceLift directly if you already have a live opportunity in mind.</p>
                                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                    <FeatureCard title="Industry intelligence" body="Built around sector pressures, environment gaps, and perception signals." />
                                    <FeatureCard title="Personalized output" body="Locations, timeline, scope, and goals shape the final report." />
                                    <FeatureCard title="Immediate value" body="The report appears instantly in a premium format and can be copied." />
                                </div>
                            </div>

                            <div>
                                <div className="rounded-[34px] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] md:p-7 lg:p-8" style={{ background: COLORS.panel, border: "1px solid rgba(17,17,17,0.04)" }}>
                                    <h2 className="text-[40px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">Choose how you’d like to begin.</h2>
                                    <p className="mt-4 text-[19px] leading-[1.6]" style={{ color: COLORS.muted }}>Use the strategic report if you want immediate insight. Use direct contact if you already know you want to speak with us.</p>

                                    <div className="mt-8 overflow-hidden rounded-[24px] border" style={{ borderColor: COLORS.border, background: "rgba(255,255,255,0.55)" }}>
                                        <div className="grid grid-cols-2 border-b" style={{ borderColor: COLORS.border }}>
                                            <TabButton active={tab === "report"} onClick={() => setTab("report")} label="Strategic Report" />
                                            <TabButton active={tab === "contact"} onClick={() => setTab("contact")} label="Direct Contact" />
                                        </div>

                                        <div className="bg-white p-5 md:p-7 lg:p-8">
                                            <AnimatePresence mode="wait">
                                                {tab === "report" ? (
                                                    <motion.div key="report-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                                        <div className="mb-6 text-[14px] font-semibold uppercase tracking-[0.24em]" style={{ color: COLORS.orange }}>Strategic report intake</div>
                                                        <h3 className="max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">Tell us about the environment.</h3>
                                                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                            <div><FieldLabel>Full name</FieldLabel><TextInput value={reportForm.fullName} onChange={(e) => setReportForm({ ...reportForm, fullName: e.target.value })} /></div>
                                                            <div><FieldLabel>Company</FieldLabel><TextInput value={reportForm.company} onChange={(e) => setReportForm({ ...reportForm, company: e.target.value })} /></div>
                                                            <div><FieldLabel>Industry</FieldLabel>
                                                                <Select value={reportForm.industry} onChange={(e) => setReportForm({ ...reportForm, industry: e.target.value as IndustryKey })}>
                                                                    <option value="">Select industry</option>
                                                                    {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                                                </Select>
                                                            </div>
                                                            <div><FieldLabel>Timeline</FieldLabel>
                                                                <Select value={reportForm.timeline} onChange={(e) => setReportForm({ ...reportForm, timeline: e.target.value })}>
                                                                    <option value="">Select timeline</option>
                                                                    <option value="Immediate">Immediate</option>
                                                                    <option value="Within 3 months">Within 3 months</option>
                                                                    <option value="3–6 months">3–6 months</option>
                                                                </Select>
                                                            </div>
                                                            <div className="md:col-span-2"><FieldLabel>Environment description</FieldLabel><Textarea rows={3} value={reportForm.environment} onChange={(e) => setReportForm({ ...reportForm, environment: e.target.value })} /></div>
                                                            <div className="md:col-span-2"><FieldLabel>Main goals</FieldLabel><Textarea rows={3} value={reportForm.goals} onChange={(e) => setReportForm({ ...reportForm, goals: e.target.value })} /></div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <PrimaryButton disabled={!reportReady || loading} onClick={handleGenerateReport}>
                                                                {loading ? "Syncing..." : "Generate Strategic Report"}
                                                            </PrimaryButton>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="contact-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                                        <div className="mb-6 text-[14px] font-semibold uppercase tracking-[0.24em]" style={{ color: COLORS.orange }}>Direct contact</div>
                                                        <h3 className="text-[34px] font-bold leading-[1.08]">Tell us what the environment needs.</h3>
                                                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                            <div><FieldLabel>Full name</FieldLabel><TextInput value={contactForm.fullName} onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })} /></div>
                                                            <div><FieldLabel>Company</FieldLabel><TextInput value={contactForm.company} onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })} /></div>
                                                            <div className="md:col-span-2"><FieldLabel>Email</FieldLabel><TextInput value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} /></div>
                                                            <div className="md:col-span-2"><FieldLabel>Project description</FieldLabel><Textarea rows={4} value={contactForm.projectDescription} onChange={(e) => setContactForm({ ...contactForm, projectDescription: e.target.value })} /></div>
                                                        </div>
                                                        <div className="mt-10">
                                                            <PrimaryButton disabled={!contactReady || loading} onClick={submitDirectContact}>
                                                                <Send className="h-4 w-4" /> {loading ? "Syncing..." : "Submit Inquiry"}
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
                    <motion.section key="report-view" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-14">
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <SecondaryButton onClick={() => setShowReport(false)}><ArrowLeft className="h-4 w-4" /> Back to Form</SecondaryButton>
                            <SecondaryButton onClick={handleCopy}><Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy Report"}</SecondaryButton>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
                            <aside className="lg:sticky lg:top-8 lg:self-start">
                                <div className="overflow-hidden rounded-[30px] border bg-[#F3EDE8] p-6" style={{ borderColor: COLORS.border }}>
                                    <ActiveIndustryIcon className="h-8 w-8 text-[#FF6A17] mb-4" />
                                    <h2 className="text-[28px] font-bold leading-tight">{built.title}</h2>
                                    <div className="mt-6 space-y-3">
                                        <SummaryRow icon={Mail} label="Name" value={reportForm.fullName} />
                                        <SummaryRow icon={Building2} label="Company" value={reportForm.company} />
                                        <SummaryRow icon={Sparkles} label="Timeline" value={reportForm.timeline} />
                                    </div>
                                </div>
                            </aside>
                            <main className="space-y-6">
                                <div className="rounded-[30px] border bg-white p-8" style={{ borderColor: COLORS.border }}>
                                    <h1 className="text-4xl font-bold mb-4">{built.title}</h1>
                                    <p className="text-lg text-neutral-500 leading-relaxed">{built.summary}</p>
                                </div>
                                {built.sections.map((s) => (
                                    <div key={s.id} className="rounded-[30px] border bg-white p-8" style={{ borderColor: COLORS.border }}>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><s.icon className="w-5 h-5 text-orange-500" /> {s.title}</h3>
                                        <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">{s.body}</p>
                                    </div>
                                ))}
                            </main>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-components
function FeatureCard({ title, body }: any) {
    return (
        <div className="rounded-[22px] p-6 border bg-[#1A1B1F] text-white border-white/5">
            <div className="text-[15px] font-bold text-[#FFB184] mb-2">{title}</div>
            <div className="text-[14px] text-white/60 leading-relaxed">{body}</div>
        </div>
    );
}

function TabButton({ active, onClick, label }: any) {
    return (
        <button onClick={onClick} className={`px-4 py-5 text-center text-[16px] font-bold transition-all ${active ? "bg-white text-[#111] shadow-inner" : "text-neutral-400"}`} style={{ boxShadow: active ? `inset 0 -3px 0 ${COLORS.orange}` : "none" }}>
            {label}
        </button>
    );
}

function PrimaryButton({ children, onClick, disabled }: any) {
    return (
        <button onClick={onClick} disabled={disabled} className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-[18px] px-6 text-[17px] font-bold text-white transition-all bg-[#FF6A17] disabled:opacity-30 hover:shadow-lg">
            {children}
        </button>
    );
}

function SecondaryButton({ children, onClick }: any) {
    return (
        <button onClick={onClick} className="inline-flex items-center gap-2 rounded-[16px] border px-4 py-3 text-[14px] font-bold transition-all bg-white/40 border-neutral-200 hover:bg-white">
            {children}
        </button>
    );
}

function SummaryRow({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-start gap-3 rounded-xl p-3 bg-white/50 border border-neutral-200">
            <Icon className="h-4 w-4 text-[#FF6A17] mt-1" />
            <div>
                <div className="text-[10px] font-black uppercase text-neutral-400">{label}</div>
                <div className="text-sm font-bold">{value || "Not specified"}</div>
            </div>
        </div>
    );
}

function FieldLabel({ children }: any) {
    return <div className="mb-1 text-[11px] font-black uppercase tracking-widest text-neutral-400">{children}</div>;
}

function TextInput(props: any) {
    return <input {...props} className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-[#FF6A17] transition-colors" />;
}

function Textarea(props: any) {
    return <textarea {...props} className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#FF6A17] transition-colors" />;
}

function Select(props: any) {
    return <select {...props} className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-[#FF6A17] transition-colors" />;
}