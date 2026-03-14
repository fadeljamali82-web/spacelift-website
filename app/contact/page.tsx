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
const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

type TabKey = "report" | "contact";
type IndustryKey = "hospitality" | "corporate" | "retail" | "healthcare" | "venue" | "mixeduse" | "other";

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
};

const reportInitial: ReportForm = {
    fullName: "", company: "", email: "", industry: "", locations: "",
    timeline: "", scope: "", environmentType: "", primaryChallenge: "",
    budgetApproach: "", goals: "", constraints: "", notes: "",
};

const contactInitial = {
    fullName: "", company: "", email: "", phone: "", projectType: "", projectDescription: ""
};

const COLORS = {
    bg: "#F7F6F3", panel: "#F3EDE8", white: "#FFFFFF", text: "#111111",
    muted: "#6B6B6B", border: "#DDD6CE", orange: "#FF6A17", orangeSoft: "rgba(255,106,23,0.08)"
};

const INDUSTRY_LABELS: Record<string, string> = {
    hospitality: "Hospitality", corporate: "Corporate / Workplace", retail: "Retail Environment",
    healthcare: "Healthcare", venue: "Event / Venue", mixeduse: "Mixed-Use / Residential", other: "Other"
};

const INDUSTRY_ICONS: Record<string, any> = {
    hospitality: Hotel, corporate: Briefcase, retail: Store, healthcare: Building2,
    venue: Building2, mixeduse: LayoutGrid, other: ClipboardList
};

// --- DATA LOGIC ---
const REPORT_TEXT: Record<string, any> = {
    hospitality: { executive: "Hospitality environments are increasingly judged through atmosphere, consistency, and perceived quality.", dynamics: "The category is being shaped by rising guest expectations and capital discipline.", gaps: ["Arrival zones underperform", "Surface age precedes infrastructure"], recommendations: ["Rank by perception impact", "Phased refresh logic"], leaders: "Stronger operators maintain an active lifecycle strategy.", relevance: "SpaceLift improves perception faster than traditional routes.", nextPath: "Isolate high-impact guest zones." },
    corporate: { executive: "Workplaces support culture and identity. Spaces must justify physical presence.", dynamics: "Decisions are shaped by hybrid work and utilization pressure.", gaps: ["Generic environment", "Brand language mismatch"], recommendations: ["Upgrade collaboration zones", "Material-led transformation"], leaders: "Stronger operators use the office as a business tool.", relevance: "Stronger identity without full redesign cycles.", nextPath: "Define brand expression priorities." },
    retail: { executive: "Retail must function as a brand experience system. Atmosphere justifies the physical store.", dynamics: "Balancing customer experience with rollout consistency.", gaps: ["Lack of experience hierarchy", "Interchangeable feel"], recommendations: ["Identify dwell moments", "Premium surface logic"], leaders: "Stronger operators treat the store as a dynamic platform.", relevance: "Scalable logic for flagship and network locations.", nextPath: "Determine flagship vs network priorities." },
    healthcare: { executive: "Environments are judged by clarity, calm, trust, and perceived quality.", dynamics: "Providers face pressure to improve perception without reconstruction.", gaps: ["Reception feels outdated", "Patient care outperforms environment"], recommendations: ["Start with waiting zones", "Low-disruption transformation"], leaders: "Experience is shaped by the physical environment.", relevance: "Modernization without structural intervention.", nextPath: "Isolate high-perception patient zones." },
    venue: { executive: "Venues are chosen on visual flexibility and memorable experience potential.", dynamics: "Category rewards venues that create impact without production burden.", gaps: ["Visual interchangeability", "Dated focal surfaces"], recommendations: ["Identify planner-facing zones", "Competitive refresh strategy"], leaders: "Stronger venues use adaptable visual systems.", relevance: "High impact with low operational downtime.", nextPath: "Assess planner-facing perception points." },
    mixeduse: { executive: "Developments compete on atmosphere and lifestyle promise.", dynamics: "Shared spaces age visually faster than structural systems.", gaps: ["Arrival areas lack prestige", "Corridor coherence issues"], recommendations: ["Focus on socially visible spaces", "Recurring refresh logic"], leaders: "Stronger operators preserve asset leasing appeal.", relevance: "Protect prestige without full reconstruction.", nextPath: "Identify common areas shaping impression." },
    other: { executive: "Physical environments are strategic assets, not passive containers.", dynamics: "Stakeholder expectations rise despite budget pressure.", gaps: ["Weak brand presence", "Generic first impression"], recommendations: ["Identify focal surfaces", "Visibility-driven transformation"], leaders: "Selective transformation preserves capital flexibility.", relevance: "Coordinated delivery for high-visibility zones.", nextPath: "Define zones carrying strategic pressure." },
};

function buildReport(form: ReportForm) {
    const ind = form.industry || "other";
    const pack = REPORT_TEXT[ind];
    const label = INDUSTRY_LABELS[ind];
    const intro = `For ${form.company || "the organization"}, the opportunity involves ${form.scope || "the scope"} across ${form.locations || "the footprint"} with a timeline of ${form.timeline || "the current window"}. Primary challenge: ${form.primaryChallenge || "undefined"}.`;

    const sections = [
        { id: "s1", icon: Sparkles, label: "Section 1", title: "Executive Snapshot", body: `${pack.executive}\n\n${intro}` },
        { id: "s2", icon: Building2, label: "Section 2", title: "Market Dynamics", body: `${pack.dynamics}\n\nEnvironment: ${form.environmentType}` },
        { id: "s3", icon: ClipboardList, label: "Section 3", title: "Key Gaps", body: pack.gaps.map((g: string) => `• ${g}`).join("\n") },
        { id: "s4", icon: ShieldCheck, label: "Section 4", title: "Strategic Path", body: `${pack.recommendations.map((r: string) => `• ${r}`).join("\n")}\n\nGoals: ${form.goals}` },
        { id: "s5", icon: LayoutGrid, label: "Section 5", title: "Leader Insights", body: pack.leaders },
        { id: "s6", icon: CheckCircle2, label: "Section 6", title: "SpaceLift Relevance", body: `${pack.relevance}\n\nBudget: ${form.budgetApproach}` },
        { id: "s7", icon: MessageSquareText, label: "Section 7", title: "Next Path", body: `${pack.nextPath}\n\nNotes: ${form.notes || "None."}` },
    ];

    return { title: `${label} Strategic Report`, badge: label, summary: intro, sections, plainText: sections.map(s => `${s.title}\n${s.body}`).join("\n\n") };
}

export default function ContactPage() {
    const [tab, setTab] = useState<TabKey>("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [reportForm, setReportForm] = useState<ReportForm>(reportInitial);
    const [contactForm, setContactForm] = useState(contactInitial);

    const built = useMemo(() => buildReport(reportForm), [reportForm]);

    const reportReady = !!reportForm.fullName && !!reportForm.company && !!reportForm.industry && !!reportForm.locations && !!reportForm.timeline && !!reportForm.scope && !!reportForm.environmentType && !!reportForm.primaryChallenge && !!reportForm.budgetApproach && !!reportForm.goals;

    async function syncToCRM(formData: any, source: string) {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({ ...formData, source }).toString();
            await fetch(`${CRM_URL}?${queryParams}`, { method: "GET", mode: "no-cors" });
        } catch (e) { console.error(e); }
        finally { setTimeout(() => setLoading(false), 800); }
    }

    const handleReport = async () => { await syncToCRM(reportForm, "Report Generated"); setShowReport(true); };

    const handleContact = async () => {
        await syncToCRM(contactForm, "Direct Contact");
        const subject = encodeURIComponent(`Inquiry: ${contactForm.company}`);
        const body = encodeURIComponent(`Name: ${contactForm.fullName}\nMessage: ${contactForm.projectDescription}`);
        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    };

    const ActiveIndustryIcon = reportForm.industry ? INDUSTRY_ICONS[reportForm.industry] : ClipboardList;

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="mx-auto max-w-[1440px] px-5 py-10 lg:py-16">
                        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
                            <div className="pt-2 lg:pt-6">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.26em]" style={{ color: COLORS.orange }}>
                                    <span className="inline-block h-px w-10" style={{ background: COLORS.orange }} /> Strategic assessment
                                </div>
                                <h1 className="text-[52px] font-bold leading-[0.92] tracking-[-0.04em] lg:text-[86px]">Start with the path that fits the opportunity.</h1>
                                <p className="mt-8 max-w-[740px] text-[22px] leading-[1.65]" style={{ color: COLORS.muted }}>Generate a premium strategic report or contact SpaceLift directly for live collaboration.</p>
                                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                    <FeatureCard title="Industry Intel" body="Built around recurring sector pressures and perception signals." />
                                    <FeatureCard title="Personalized" body="Locations, timeline, and goals shape the final report." />
                                    <FeatureCard title="Immediate" body="Instantly formatted for internal review or copy." />
                                </div>
                            </div>

                            <div>
                                <div className="rounded-[34px] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] md:p-8" style={{ background: COLORS.panel, border: "1px solid rgba(17,17,17,0.04)" }}>
                                    <h2 className="text-[40px] font-bold leading-[1.02] tracking-[-0.04em] lg:text-[52px]">Choose your path.</h2>
                                    <div className="mt-8 overflow-hidden rounded-[24px] border shadow-sm" style={{ borderColor: COLORS.border, background: "rgba(255,255,255,0.55)" }}>
                                        <div className="grid grid-cols-2 border-b" style={{ borderColor: COLORS.border }}>
                                            <TabButton active={tab === "report"} onClick={() => setTab("report")} label="Strategic Report" />
                                            <TabButton active={tab === "contact"} onClick={() => setTab("contact")} label="Direct Contact" />
                                        </div>
                                        <div className="bg-white p-6 md:p-8">
                                            <AnimatePresence mode="wait">
                                                {tab === "report" ? (
                                                    <motion.div key="rep" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                                        <div className="grid gap-5 md:grid-cols-2">
                                                            <TextInput label="Full Name" value={reportForm.fullName} onChange={(e: any) => setReportForm({ ...reportForm, fullName: e.target.value })} />
                                                            <TextInput label="Company" value={reportForm.company} onChange={(e: any) => setReportForm({ ...reportForm, company: e.target.value })} />
                                                        </div>
                                                        <div className="grid gap-5 md:grid-cols-2">
                                                            <Select label="Industry" value={reportForm.industry} onChange={(e: any) => setReportForm({ ...reportForm, industry: e.target.value })}>
                                                                <option value="">Select industry</option>
                                                                {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                                            </Select>
                                                            <Select label="Number of locations" value={reportForm.locations} onChange={(e: any) => setReportForm({ ...reportForm, locations: e.target.value })}>
                                                                <option value="">Select range</option>
                                                                <option value="1 location">1 location</option>
                                                                <option value="2–5 locations">2–5 locations</option>
                                                                <option value="6–20 locations">6–20 locations</option>
                                                                <option value="20+ locations">20+ locations</option>
                                                            </Select>
                                                        </div>
                                                        <div className="grid gap-5 md:grid-cols-2">
                                                            <Select label="Timeline" value={reportForm.timeline} onChange={(e: any) => setReportForm({ ...reportForm, timeline: e.target.value })}>
                                                                <option value="">Select timeline</option>
                                                                <option value="Immediate">Immediate</option>
                                                                <option value="Within 3 months">Within 3 months</option>
                                                                <option value="3–6 months">3–6 months</option>
                                                            </Select>
                                                            <Select label="Scope of work" value={reportForm.scope} onChange={(e: any) => setReportForm({ ...reportForm, scope: e.target.value })}>
                                                                <option value="">Select scope</option>
                                                                <option value="Single priority zone">Single priority zone</option>
                                                                <option value="Multiple zones">Multiple zones</option>
                                                                <option value="Full refresh">Full refresh</option>
                                                            </Select>
                                                        </div>
                                                        <Select label="Environment Type" value={reportForm.environmentType} onChange={(e: any) => setReportForm({ ...reportForm, environmentType: e.target.value })}>
                                                            <option value="">Select environment</option>
                                                            <option value="Arrival / Lobby">Arrival / Lobby</option>
                                                            <option value="Guest-facing areas">Guest-facing areas</option>
                                                            <option value="Workplace zones">Workplace zones</option>
                                                            <option value="Shared amenities">Shared amenities</option>
                                                        </Select>
                                                        <Select label="Primary Challenge" value={reportForm.primaryChallenge} onChange={(e: any) => setReportForm({ ...reportForm, primaryChallenge: e.target.value })}>
                                                            <option value="">Select challenge</option>
                                                            <option value="Outdated environment">Outdated environment</option>
                                                            <option value="Weak brand presence">Weak brand presence</option>
                                                            <option value="Generic experience">Generic experience</option>
                                                            <option value="Inconsistent quality">Inconsistent quality</option>
                                                        </Select>
                                                        <Select label="Budget Approach" value={reportForm.budgetApproach} onChange={(e: any) => setReportForm({ ...reportForm, budgetApproach: e.target.value })}>
                                                            <option value="">Select budget approach</option>
                                                            <option value="Phased / Value-driven">Phased / Value-driven</option>
                                                            <option value="Serious premium upgrade">Serious premium upgrade</option>
                                                            <option value="TBC / Evaluating">TBC / Evaluating</option>
                                                        </Select>
                                                        <Textarea label="Main Strategic Goals" value={reportForm.goals} onChange={(e: any) => setReportForm({ ...reportForm, goals: e.target.value })} placeholder="What needs to improve visually or commercially?" rows={3} />
                                                        <PrimaryButton disabled={!reportReady || loading} onClick={handleReport}>{loading ? "Syncing CRM..." : "Generate Strategic Report"}</PrimaryButton>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="con" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                                        <TextInput label="Name" value={contactForm.fullName} onChange={(e: any) => setContactForm({ ...contactForm, fullName: e.target.value })} placeholder="Your name" />
                                                        <TextInput label="Company" value={contactForm.company} onChange={(e: any) => setContactForm({ ...contactForm, company: e.target.value })} placeholder="Org name" />
                                                        <Textarea label="Project Description" rows={6} value={contactForm.projectDescription} onChange={(e: any) => setContactForm({ ...contactForm, projectDescription: e.target.value })} placeholder="Tell us about the environment..." />
                                                        <PrimaryButton disabled={!contactForm.fullName || loading} onClick={handleContact}><Send className="w-4 h-4" /> {loading ? "Syncing..." : "Submit Inquiry"}</PrimaryButton>
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
                    <motion.section key="res" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-[1440px] px-5 py-10 lg:py-14">
                        <div className="mb-8 flex justify-between gap-4">
                            <SecondaryButton onClick={() => setShowReport(false)}><ArrowLeft className="h-4 w-4" /> Back to Form</SecondaryButton>
                            <SecondaryButton onClick={async () => { await navigator.clipboard.writeText(built.plainText); setCopied(true); setTimeout(() => setCopied(false), 2000); }}><Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy Report"}</SecondaryButton>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
                            <aside className="lg:sticky lg:top-8 lg:self-start">
                                <div className="rounded-[30px] border bg-[#F3EDE8] p-6 shadow-xl border-[#DDD6CE]">
                                    <ActiveIndustryIcon className="h-10 w-10 text-[#FF6A17] mb-4" />
                                    <h2 className="text-[32px] font-bold leading-tight">{built.title}</h2>
                                    <div className="mt-8 space-y-4">
                                        <SummaryRow icon={Mail} label="Prepared for" value={reportForm.fullName} />
                                        <SummaryRow icon={Building2} label="Company" value={reportForm.company} />
                                        <SummaryRow icon={MapPinned} label="Footprint" value={reportForm.locations} />
                                    </div>
                                </div>
                            </aside>
                            <main className="space-y-6">
                                <div className="rounded-[30px] bg-white p-8 border shadow-sm border-[#DDD6CE]">
                                    <h1 className="text-4xl font-bold mb-4">{built.title}</h1>
                                    <p className="text-lg text-neutral-500 leading-relaxed">{built.summary}</p>
                                </div>
                                {built.sections.map((s, i) => (
                                    <div key={s.id} className="rounded-[30px] bg-white p-8 border shadow-sm border-[#DDD6CE]">
                                        <div className="text-[12px] font-bold uppercase tracking-widest text-[#FF6A17] mb-2">{s.label}</div>
                                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><s.icon className="h-6 w-6 text-[#FF6A17]" /> {s.title}</h3>
                                        <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap text-[17px]">{s.body}</p>
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

// Helpers
function FeatureCard({ title, body }: any) {
    return (
        <div className="rounded-[22px] p-6 border shadow-sm" style={{ background: "radial-gradient(circle at top left, rgba(255,106,23,0.10), transparent 28%), linear-gradient(135deg, #1A1B1F 0%, #2A2A2D 100%)", color: "#FFF", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[15px] font-bold text-[#FFB184] mb-2">{title}</div>
            <div className="text-[14px] opacity-70 leading-relaxed">{body}</div>
        </div>
    );
}

function TabButton({ active, onClick, label }: any) {
    return (
        <button onClick={onClick} className="px-4 py-5 text-center text-[18px] font-bold transition" style={{ background: active ? "#FFF" : "transparent", color: COLORS.text, boxShadow: active ? `inset 0 -3px 0 ${COLORS.orange}` : "none" }}>{label}</button>
    );
}

function TextInput({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <input {...props} className="h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] transition-all border-[#DDD6CE]" />
        </div>
    );
}

function Select({ label, children, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <select {...props} className="h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] transition-all border-[#DDD6CE] appearance-none">{children}</select>
        </div>
    );
}

function Textarea({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <textarea {...props} className="w-full rounded-[18px] border bg-white px-5 py-4 text-[18px] outline-none focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] transition-all border-[#DDD6CE] min-h-[120px]" />
        </div>
    );
}

function PrimaryButton({ children, onClick, disabled }: any) {
    return (
        <button disabled={disabled} onClick={onClick} className="h-14 w-full rounded-[18px] bg-[#FF6A17] text-white font-bold text-[17px] transition disabled:opacity-40 hover:shadow-xl flex items-center justify-center gap-2">{children}</button>
    );
}

function SecondaryButton({ children, onClick }: any) {
    return (
        <button onClick={onClick} className="inline-flex items-center gap-2 rounded-[16px] border px-6 py-3 text-[15px] font-bold bg-white/50 border-[#DDD6CE] hover:bg-white transition">{children}</button>
    );
}

function SummaryRow({ icon: Icon, label, value }: any) {
    return (
        <div className="bg-white/60 p-4 rounded-2xl border border-[#DDD6CE] flex items-start gap-3">
            <Icon className="h-4 w-4 text-[#FF6A17] mt-1" />
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">{label}</div>
                <div className="text-[15px] font-bold">{value || "Not specified"}</div>
            </div>
        </div>
    );
}