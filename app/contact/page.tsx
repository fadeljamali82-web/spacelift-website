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

const INDUSTRY_LABELS: Record<string, string> = {
    hospitality: "Hospitality",
    corporate: "Corporate / Workplace",
    retail: "Retail Environment",
    healthcare: "Healthcare",
    venue: "Event / Venue",
    mixeduse: "Mixed-Use / Residential",
    other: "Other",
};

const INDUSTRY_ICONS: Record<string, any> = {
    hospitality: Hotel,
    corporate: Briefcase,
    retail: Store,
    healthcare: Building2,
    venue: Building2,
    mixeduse: LayoutGrid,
    other: ClipboardList,
};

const REPORT_TEXT: Record<string, any> = {
    hospitality: { executive: "Hospitality environments are increasingly judged through atmosphere, consistency, and perceived quality.", dynamics: "The category is being shaped by rising guest expectations and capital discipline.", gaps: ["Arrival zones underperform relative to brand standard", "Public spaces lose distinctiveness over time"], recommendations: ["Rank environments by perception impact", "Use phased refresh logic"], leaders: "Stronger operators maintain an active lifecycle strategy.", relevance: "SpaceLift is relevant when property needs to feel premium faster.", nextPath: "Isolate guest-facing zones shaping first impressions." },
    corporate: { executive: "Corporate workplaces support culture and identity. Spaces must justify physical presence.", dynamics: "Workplace decisions are now shaped by hybrid work and utilization pressure.", gaps: ["Generic environment with limited brand expression", "Work areas reflect pre-hybrid behavior patterns"], recommendations: ["Upgrade arrival and collaboration zones first", "Translate brand language into surfaces"], leaders: "Stronger operators use the office as a culture tool.", relevance: "SpaceLift adds identity without default redesign cycles.", nextPath: "Determine if the core issue is brand or collaboration." },
    retail: { executive: "Retail needs to function as a brand experience system. Atmosphere justifies the physical store.", dynamics: "Retailers are balancing experience with rollout consistency.", gaps: ["Lack of experiential hierarchy", "Visual backdrops are underused tools"], recommendations: ["Identify moments influencing dwell time", "Refresh visible layers to improve quality"], leaders: "Stronger operators treat the store as a dynamic platform.", relevance: "Stronger physical brand presence and scalable logic.", nextPath: "Prioritize flagship impact vs network consistency." },
    healthcare: { executive: "Healthcare environments are judged by trust, calm, and clarity.", dynamics: "Providers face pressure to improve perception without reconstruction.", gaps: ["Reception and waiting zones lack reassurance", "Visible surfaces appear dated vs operations"], recommendations: ["Prioritize surface systems", "Separate perception from infrastructure"], leaders: "Patient experience is shaped by the environment layer.", relevance: "Modernization without structural intervention.", nextPath: "Isolate environments where perception matters most." },
    venue: { executive: "Venues are chosen on visual flexibility. Planners judge spaces by memorable experiences.", dynamics: "Category rewards venues that create impact without production burden.", gaps: ["Ballrooms feel functional but interchangeable", "Static finishes limit event identity"], recommendations: ["Identify planner-facing zones", "Refresh as competitive strategy"], leaders: "Stronger venues use adaptable visual systems.", relevance: "Strong visual appeal and low operational downtime.", nextPath: "Assess planner-facing perception points." },
    mixeduse: { executive: "Developments compete on atmosphere and lifestyle promise. Prestige is maintained in social spaces.", dynamics: "Shared spaces age faster than structural systems.", gaps: ["Arrival areas lack prestige", "Incoherent common zones"], recommendations: ["Focus on resident impressions", "Recurring refresh cadence"], leaders: "Stronger operators preserve asset perception via updates.", relevance: "Protect prestige and leasing appeal.", nextPath: "Identify common areas shaping perception." },
    other: { executive: "Physical environments are strategic assets. Spaces must communicate quality.", dynamics: "Stakeholder expectations rise despite budget pressure.", gaps: ["Generic environment", "Weak brand expression"], recommendations: ["Identify high-impact surfaces", "Phased transformation"], leaders: "Stronger operators use selective transformation logic.", relevance: "High visibility and coordinated delivery.", nextPath: "Define zones carrying strategic pressure." },
};

function buildReport(form: any) {
    const industry = form.industry || "other";
    const pack = REPORT_TEXT[industry];
    const label = INDUSTRY_LABELS[industry] || "Strategic";
    const company = form.company || "The organization";
    const intro = `For ${company}, the opportunity involves ${(form.scope || "the stated scope").toLowerCase()} across ${(form.locations || "the footprint").toLowerCase()} with a timeline of ${(form.timeline || "the current window").toLowerCase()}. Primary challenge: ${(form.primaryChallenge || "undefined").toLowerCase()}.`;

    const sections = [
        { id: "exec", icon: Sparkles, label: "Section 1", title: "Executive Snapshot", body: `${pack.executive}\n\n${intro}` },
        { id: "dyn", icon: Building2, label: "Section 2", title: "Market Dynamics", body: `${pack.dynamics}\n\nEnvironment Description:\n${form.environment || "Not provided."}` },
        { id: "gaps", icon: ClipboardList, label: "Section 3", title: "Key Gaps", body: `${pack.gaps.map((g: string) => `• ${g}`).join("\n")}\n\nChallenge: ${form.primaryChallenge || "N/A"}` },
        { id: "rec", icon: ShieldCheck, label: "Section 4", title: "Strategic Path", body: `${pack.recommendations.map((r: string) => `• ${r}`).join("\n")}\n\nGoals: ${form.goals || "N/A"}` },
        { id: "lead", icon: LayoutGrid, label: "Section 5", title: "Leader Insights", body: pack.leaders },
        { id: "rel", icon: CheckCircle2, label: "Section 6", title: "SpaceLift Relevance", body: `${pack.relevance}\n\nBudget: ${form.budgetApproach || "N/A"}\nConstraints: ${form.constraints || "None."}` },
        { id: "next", icon: MessageSquareText, label: "Section 7", title: "Next Steps", body: pack.nextPath },
    ];

    return { title: `${label} Strategic Report`, badge: label, summary: intro, sections, plainText: sections.map(s => `${s.title}\n${s.body}`).join("\n\n") };
}

export default function ContactPage() {
    const [tab, setTab] = useState<"report" | "contact">("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const [reportForm, setReportForm] = useState({
        fullName: "", company: "", email: "", industry: "", locations: "",
        timeline: "", scope: "", environmentType: "", primaryChallenge: "",
        budgetApproach: "", goals: "", constraints: "", notes: "", environment: ""
    });

    const [contactForm, setContactForm] = useState({
        fullName: "", company: "", email: "", phone: "", projectType: "", projectDescription: ""
    });

    const built = useMemo(() => buildReport(reportForm), [reportForm]);

    const reportReady = !!reportForm.fullName && !!reportForm.company && !!reportForm.industry && !!reportForm.environment;
    const contactReady = !!contactForm.fullName && !!contactForm.company && !!contactForm.projectDescription;

    async function syncToCRM(formData: any, source: string) {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({ ...formData, source }).toString();
            await fetch(`${CRM_URL}?${queryParams}`, { method: "GET", mode: "no-cors" });
        } catch (e) {
            console.error("CRM Sync Error", e);
        } finally {
            setTimeout(() => setLoading(false), 600);
        }
    }

    const handleReport = async () => {
        await syncToCRM(reportForm, "Report Generated");
        setShowReport(true);
    };

    const handleContact = async () => {
        await syncToCRM(contactForm, "Direct Inquiry");
        const subject = encodeURIComponent(`SpaceLift Inquiry — ${contactForm.company}`);
        const body = encodeURIComponent(`Name: ${contactForm.fullName}\nMessage: ${contactForm.projectDescription}`);
        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    };

    const ActiveIndustryIcon = reportForm.industry ? INDUSTRY_ICONS[reportForm.industry] : ClipboardList;

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }} className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-16">
                        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
                            <div className="pt-2 lg:pt-6">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.26em]" style={{ color: COLORS.orange }}>
                                    <span className="inline-block h-px w-10" style={{ background: COLORS.orange }} />
                                    Strategic report & direct contact
                                </div>
                                <h1 className="max-w-[760px] text-[52px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[64px] lg:text-[82px] xl:text-[96px]">Start with the path that fits the opportunity.</h1>
                                <p className="mt-8 max-w-[740px] text-[22px] leading-[1.65]" style={{ color: COLORS.muted }}>Generate a premium industry-specific strategic report or contact SpaceLift directly if you already have a live opportunity in mind.</p>

                                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                    <FeatureCard title="Industry intelligence" body="Built around recurring sector pressures and perception signals." />
                                    <FeatureCard title="Personalized output" body="Locations, timeline, and goals shape the final report." />
                                    <FeatureCard title="Immediate value" body="The report appears instantly and can be copied to your decks." />
                                </div>
                            </div>

                            <div>
                                <div className="rounded-[34px] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] md:p-7 lg:p-8" style={{ background: COLORS.panel, border: "1px solid rgba(17,17,17,0.04)" }}>
                                    <h2 className="text-[40px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">Choose how you’d like to begin.</h2>

                                    <div className="mt-8 overflow-hidden rounded-[24px] border shadow-sm" style={{ borderColor: COLORS.border, background: "rgba(255,255,255,0.55)" }}>
                                        <div className="grid grid-cols-2 border-b" style={{ borderColor: COLORS.border }}>
                                            <TabButton active={tab === "report"} onClick={() => setTab("report")} label="Strategic Report" />
                                            <TabButton active={tab === "contact"} onClick={() => setTab("contact")} label="Direct Contact" />
                                        </div>

                                        <div className="bg-white p-5 md:p-7 lg:p-8">
                                            <AnimatePresence mode="wait">
                                                {tab === "report" ? (
                                                    <motion.div key="report-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
                                                        <div className="space-y-6">
                                                            <div className="grid gap-5 md:grid-cols-2">
                                                                <TextInput label="Full Name" value={reportForm.fullName} onChange={(e: any) => setReportForm({ ...reportForm, fullName: e.target.value })} placeholder="Your name" />
                                                                <TextInput label="Company" value={reportForm.company} onChange={(e: any) => setReportForm({ ...reportForm, company: e.target.value })} placeholder="Company name" />
                                                            </div>
                                                            <div className="grid gap-5 md:grid-cols-2">
                                                                <Select label="Industry" value={reportForm.industry} onChange={(e: any) => setReportForm({ ...reportForm, industry: e.target.value })}>
                                                                    <option value="">Select industry</option>
                                                                    {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                                                </Select>
                                                                <Select label="Timeline" value={reportForm.timeline} onChange={(e: any) => setReportForm({ ...reportForm, timeline: e.target.value })}>
                                                                    <option value="">Select timeline</option>
                                                                    <option value="Immediate">Immediate need</option>
                                                                    <option value="Within 3 months">Within 3 months</option>
                                                                    <option value="3-6 months">3-6 months</option>
                                                                </Select>
                                                            </div>
                                                            <Textarea label="Environment description" value={reportForm.environment} onChange={(e: any) => setReportForm({ ...reportForm, environment: e.target.value })} placeholder="Describe the space, who uses it, and current condition..." rows={4} />
                                                            <PrimaryButton disabled={!reportReady || loading} onClick={handleReport}>{loading ? "Synchronizing to CRM..." : "Generate Strategic Report"}</PrimaryButton>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="contact-tab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
                                                        <div className="space-y-6">
                                                            <TextInput label="Name" value={contactForm.fullName} onChange={(e: any) => setContactForm({ ...contactForm, fullName: e.target.value })} placeholder="Your name" />
                                                            <TextInput label="Company" value={contactForm.company} onChange={(e: any) => setContactForm({ ...contactForm, company: e.target.value })} placeholder="Company name" />
                                                            <Textarea label="Project Inquiry" rows={5} value={contactForm.projectDescription} onChange={(e: any) => setContactForm({ ...contactForm, projectDescription: e.target.value })} placeholder="How can we help? (Scope, goals, timeline...)" />
                                                            <PrimaryButton disabled={!contactReady || loading} onClick={handleContact}><Send className="w-4 h-4" /> {loading ? "Sending Inquiry..." : "Submit Inquiry"}</PrimaryButton>
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
                            <button onClick={() => setShowReport(false)} className="inline-flex items-center gap-2 rounded-[16px] border px-4 py-3 text-[15px] font-medium bg-white/50 border-[#DDD6CE] hover:bg-white transition"><ArrowLeft className="h-4 w-4" /> Back to Form</button>
                            <button onClick={async () => { await navigator.clipboard.writeText(built.plainText); setCopied(true); setTimeout(() => setCopied(false), 1800); }} className="inline-flex items-center gap-2 rounded-[16px] border px-4 py-3 text-[15px] font-medium bg-white/50 border-[#DDD6CE] hover:bg-white transition"><Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy Report"}</button>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[350px_1fr]">
                            <aside className="lg:sticky lg:top-8 lg:self-start">
                                <div className="rounded-[30px] border bg-[#F3EDE8] p-6 shadow-xl" style={{ borderColor: COLORS.border }}>
                                    <ActiveIndustryIcon className="h-10 w-10 text-[#FF6A17] mb-4" />
                                    <h2 className="text-[32px] font-bold leading-tight">{built.title}</h2>
                                    <div className="mt-8 space-y-4">
                                        <SummaryRow label="Prepared for" value={reportForm.fullName} />
                                        <SummaryRow label="Company" value={reportForm.company} />
                                        <SummaryRow label="Industry" value={INDUSTRY_LABELS[reportForm.industry] || "Other"} />
                                    </div>
                                </div>
                            </aside>

                            <main className="space-y-6">
                                <div className="rounded-[30px] bg-white p-8 border shadow-sm" style={{ borderColor: COLORS.border }}>
                                    <h1 className="text-4xl font-bold mb-4">{built.title}</h1>
                                    <p className="text-lg text-neutral-500 leading-relaxed">{built.summary}</p>
                                </div>
                                {built.sections.map((s, i) => (
                                    <div key={s.id} className="rounded-[30px] bg-white p-8 border shadow-sm" style={{ borderColor: COLORS.border }}>
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
        <motion.div whileHover={{ y: -4 }} className="rounded-[22px] p-6 border shadow-sm" style={{ background: "radial-gradient(circle at top left, rgba(255,106,23,0.10), transparent 28%), linear-gradient(135deg, #1A1B1F 0%, #2A2A2D 100%)", color: "#FFF", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[15px] font-semibold text-[#FFB184] mb-2">{title}</div>
            <div className="text-[15px] opacity-70 leading-relaxed">{body}</div>
        </motion.div>
    );
}

function TabButton({ active, onClick, label }: any) {
    return (
        <button onClick={onClick} className="px-4 py-5 text-center text-[18px] font-semibold transition" style={{ background: active ? "#FFF" : "transparent", color: COLORS.text, boxShadow: active ? `inset 0 -3px 0 ${COLORS.orange}` : "none" }}>
            {label}
        </button>
    );
}

function TextInput({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <input {...props} className="h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] transition-all" style={{ borderColor: COLORS.border }} />
        </div>
    );
}

function Select({ label, children, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <select {...props} className="h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] transition-all appearance-none" style={{ borderColor: COLORS.border }}>{children}</select>
        </div>
    );
}

function Textarea({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <textarea {...props} className="w-full rounded-[18px] border bg-white px-5 py-4 text-[18px] outline-none focus:shadow-[0_0_0_3px_rgba(255,106,23,0.10)] transition-all min-h-[140px]" style={{ borderColor: COLORS.border }} />
        </div>
    );
}

function PrimaryButton({ children, onClick, disabled }: any) {
    return (
        <button disabled={disabled} onClick={onClick} className="h-14 w-full rounded-[18px] bg-[#FF6A17] text-white font-bold text-[17px] transition disabled:opacity-40 hover:shadow-[0_12px_30px_rgba(255,106,23,0.22)] flex items-center justify-center gap-2">
            {children}
        </button>
    );
}

function SummaryRow({ label, value }: any) {
    return (
        <div className="bg-white/60 p-4 rounded-2xl border border-[#DDD6CE]">
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">{label}</div>
            <div className="text-[16px] font-bold">{value || "Not specified"}</div>
        </div>
    );
}