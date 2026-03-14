"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft, Briefcase, Building2, CheckCircle2, ClipboardList, Copy, Hotel,
    LayoutGrid, Mail, MapPinned, MessageSquareText, Send, ShieldCheck, Sparkles, Store
} from "lucide-react";

// --- CRM CONFIGURATION ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

type TabKey = "report" | "contact";
type IndustryKey = "hospitality" | "corporate" | "retail" | "healthcare" | "venue" | "mixeduse" | "other";

const COLORS = {
    bg: "#F7F6F3", panel: "#F3EDE8", white: "#FFFFFF", text: "#111111",
    muted: "#6B6B6B", border: "#DDD6CE", orange: "#FF6A17"
};

const INDUSTRY_LABELS: Record<string, string> = {
    hospitality: "Hospitality", corporate: "Workplace", retail: "Retail",
    healthcare: "Healthcare", venue: "Event / Venue", mixeduse: "Mixed-Use", other: "Other"
};

const INDUSTRY_ICONS: Record<string, any> = {
    hospitality: Hotel, corporate: Briefcase, retail: Store, healthcare: Building2,
    venue: Building2, mixeduse: LayoutGrid, other: ClipboardList
};

// --- DEEP STRATEGIC INTELLIGENCE TEXT ---
const REPORT_TEXT: Record<string, any> = {
    hospitality: {
        executive: "Hospitality environments are increasingly judged through atmosphere, consistency, and perceived quality before service has a chance to do the heavy lifting. The real issue is often not whether the space works, but whether it still signals the standard the brand wants associated with itself.",
        dynamics: "The category is being shaped by rising guest expectations, tighter capital discipline, and stronger competition from operators who treat environment as part of the guest experience layer.",
        gaps: ["Arrival and first-impression zones often underperform relative to expectations.", "Guest-facing surfaces can age visually long before infrastructure requires replacement.", "Public spaces frequently lose distinctiveness and drift toward a generic feel over time."],
        recommendations: ["Rank environments by perception impact rather than renovation habit.", "Separate structural needs from perception needs to protect capital.", "Use phased refresh logic to improve quality without major operational disruption."],
        leaders: "Stronger operators maintain an active lifecycle strategy. They do not wait for a single major renovation event to solve everything; they keep visual freshness alive through targeted upgrades.",
        relevance: "SpaceLift is most relevant where the property needs to feel more premium, more coherent, and more brand-aligned without defaulting to a full reconstruction path.",
        nextPath: "Isolate the guest-facing zones that shape first impression most strongly and evaluate the immediate priority: perception, consistency, or scalability."
    },
    corporate: {
        executive: "Corporate workplaces are no longer evaluated simply as places to house teams. They are judged by how clearly they support culture, client impression, collaboration, and identity.",
        dynamics: "Workplace decisions are now shaped by hybrid work, utilization pressure, and the need to make office environments feel more intentional.",
        gaps: ["The environment may feel competent but generic, with limited physical expression of the brand.", "Space quality may lag behind the ambition the business wants to project externally."],
        recommendations: ["Reassess which spaces most influence employee perception and client confidence.", "Translate brand language into the physical workplace through high-visibility materials."],
        leaders: "Stronger workplace operators use the office as a culture and perception tool. They align the environment around purpose through selective, high-visibility transformation.",
        relevance: "SpaceLift is relevant where a workplace needs stronger identity and sharper quality without immediately defaulting to a full redesign cycle.",
        nextPath: "Determine whether the central issue is brand expression, collaboration quality, or employee engagement."
    },
    retail: {
        executive: "Retail environments increasingly need to function as brand experience systems rather than as purely transactional spaces. The physical store must justify itself through memorability and clarity of identity.",
        dynamics: "Retailers are balancing customer experience, operational efficiency, and rollout consistency.",
        gaps: ["The store may be presenting product well without creating a strong experiential hierarchy.", "Visual backdrops and surfaces are often underused as tools for brand memory."],
        recommendations: ["Identify moments in the store that most influence dwell time and product framing.", "Refresh the most visible environment layers first to improve perceived quality quickly."],
        leaders: "Stronger retail operators treat the store as a dynamic platform. They use coordinated refresh strategies to keep stores relevant while preserving rollout discipline.",
        relevance: "SpaceLift is most relevant where a retailer needs stronger brand presence or a more scalable transformation logic across locations.",
        nextPath: "Isolate whether the greatest opportunity sits in flagship impact, network consistency, or product framing."
    },
    healthcare: {
        executive: "Healthcare environments are increasingly judged not only by operational competence but by clarity, calm, trust, and perceived quality. Patients often form first impressions before any clinical interaction happens.",
        dynamics: "Providers face pressure from infrastructure aging, cost discipline, and rising patient experience expectations.",
        gaps: ["Reception, waiting, and corridor environments may not communicate reassurance strongly enough.", "Care experience often outperforms the environment, creating a perception mismatch."],
        recommendations: ["Start with zones that shape emotional tone.", "Prioritize surface systems that improve perceived quality while remaining operationally practical."],
        leaders: "Stronger healthcare operators understand that patient experience is shaped by environment as much as process. They invest in selective upgrades to preserve continuity.",
        relevance: "SpaceLift is most relevant where visual modernization is needed without broad structural intervention.",
        nextPath: "Isolate the environments where patient perception matters most and evaluate improvements with minimal disruption."
    },
    venue: {
        executive: "Venue environments are increasingly chosen on visual flexibility and distinction. Planners judge spaces by how effectively they support memorable experiences.",
        dynamics: "The category rewards venues that help planners create impact without excessive production burden.",
        gaps: ["Event spaces may feel functional but visually interchangeable.", "Static finishes can limit how easily the space supports varied event identities."],
        recommendations: ["Identify surfaces and visual zones that most influence planner perception.", "Treat visual refresh as a competitive strategy rather than background maintenance."],
        leaders: "Stronger venues use adaptable visual systems and more deliberate environment strategies to remain competitive and refresh between major capital cycles.",
        relevance: "SpaceLift is relevant where a venue needs stronger visual appeal and greater transformation capability without long closure.",
        nextPath: "Assess planner-facing perception points and determine where the environment feels least differentiated."
    },
    mixeduse: {
        executive: "Mixed-use and residential developments now compete on atmosphere, perceived prestige, and how convincingly shared spaces support the lifestyle promise of the asset.",
        dynamics: "Shared spaces age visually faster than structural systems, and newer competing developments can quickly reset expectations.",
        gaps: ["Arrival and common areas may not be maintaining the level of prestige the asset requires.", "Shared spaces often lack a refresh cadence that protects long-term leasing appeal."],
        recommendations: ["Focus first on the spaces that define everyday resident and visitor impression.", "Create a recurring refresh strategy instead of relying only on large renovation intervals."],
        leaders: "Stronger operators preserve asset perception through selective updates. They understand a premium property can feel dated long before it is obsolete.",
        relevance: "SpaceLift is relevant where an asset needs to protect prestige or improve shared-space perception without full reconstruction.",
        nextPath: "Identify common areas shaping asset perception most strongly and build a targeted refresh strategy."
    },
    other: {
        executive: "Across industries, physical environments are increasingly judged as strategic assets. Pattern reveals spaces continue to function while failing to communicate intended quality.",
        dynamics: "In most categories, budget and timeline pressure make full renovation difficult while visitor expectations rise.",
        gaps: ["The environment may feel more generic than the business itself.", "Physical space is not contributing enough to first impression or brand clarity."],
        recommendations: ["Clarify whether the core issue is aesthetics, brand expression, or consistency.", "Prioritize visible environment layers that can shift perception quickly."],
        leaders: "Stronger operators use selective transformation to keep spaces commercials aligned without overcommitting to full rebuilds.",
        relevance: "SpaceLift is relevant where high-visibility surfaces and environmental quality matter more than renovation volume.",
        nextPath: "Define which zones are carrying the most strategic pressure and where visible transformation creates the fastest return."
    }
};

function buildReport(form: any) {
    const ind = form.industry || "other";
    const pack = REPORT_TEXT[ind];
    const label = INDUSTRY_LABELS[ind] || "Strategic";
    const intro = `For ${form.company || "the organization"}, the opportunity involves ${form.scope || "the scope"} across ${form.locations || "the footprint"} with a timeline of ${form.timeline || "the current timing window"}. Primary challenge: ${form.primaryChallenge || "undefined"}.`;

    const sections = [
        { id: "s1", icon: Sparkles, label: "Section 1", title: "Executive Snapshot", body: `${pack.executive}\n\n${intro}` },
        { id: "s2", icon: Building2, label: "Section 2", title: "Market Dynamics", body: pack.dynamics },
        { id: "s3", icon: ClipboardList, label: "Section 3", title: "Key Gaps", body: pack.gaps.map((g: string) => `• ${g}`).join("\n") },
        { id: "s4", icon: ShieldCheck, label: "Section 4", title: "Strategic Recommendations", body: `${pack.recommendations.map((r: string) => `• ${r}`).join("\n")}\n\nPrimary Goals: ${form.goals}` },
        { id: "s5", icon: LayoutGrid, label: "Section 5", title: "Leader Insights", body: pack.leaders },
        { id: "s6", icon: CheckCircle2, label: "Section 6", title: "SpaceLift Relevance", body: `${pack.relevance}\n\nBudget: ${form.budgetApproach}` },
        { id: "s7", icon: MessageSquareText, label: "Section 7", title: "Next Path", body: `${pack.nextPath}` },
    ];

    return { title: `${label} Strategic Environment Report`, badge: label, summary: intro, sections, plainText: sections.map(s => `${s.title}\n${s.body}`).join("\n\n") };
}

export default function ContactPage() {
    const [tab, setTab] = useState<TabKey>("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const [reportForm, setReportForm] = useState({
        fullName: "", company: "", email: "", industry: "", locations: "",
        timeline: "", scope: "", environmentType: "", primaryChallenge: "",
        budgetApproach: "", goals: "", constraints: "", notes: ""
    });

    const [contactForm, setContactForm] = useState({
        fullName: "", company: "", email: "", phone: "", projectType: "", projectDescription: ""
    });

    const built = useMemo(() => buildReport(reportForm), [reportForm]);
    const reportReady = !!reportForm.fullName && !!reportForm.company && !!reportForm.industry && !!reportForm.primaryChallenge && !!reportForm.goals;

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
        await syncToCRM(contactForm, "Direct Inquiry");
        const subject = encodeURIComponent(`SpaceLift Inquiry: ${contactForm.company}`);
        const body = encodeURIComponent(`Name: ${contactForm.fullName}\nEmail: ${contactForm.email}\nProject: ${contactForm.projectDescription}`);
        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    };

    const ActiveIndustryIcon = reportForm.industry ? INDUSTRY_ICONS[reportForm.industry] : ClipboardList;

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20">
                        <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr]">
                            <div className="pt-2">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.26em]" style={{ color: COLORS.orange }}>
                                    <span className="inline-block h-px w-10 bg-[#FF6A17]" /> Strategic assessment
                                </div>
                                <h1 className="text-[52px] font-bold leading-[0.92] tracking-[-0.04em] lg:text-[88px] xl:text-[96px]">The path that fits the opportunity.</h1>
                                <p className="mt-8 max-w-[740px] text-[22px] leading-[1.65] text-neutral-500">Generate a premium strategic report or contact SpaceLift directly for live collaboration.</p>
                                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                                    <FeatureCard title="Industry Intel" body="Built around recurring sector pressures and perception signals." />
                                    <FeatureCard title="Personalized" body="Locations, timeline, and goals shape the final report." />
                                    <FeatureCard title="Immediate" body="Instantly formatted for internal review or copy." />
                                </div>
                            </div>

                            <div>
                                <div className="rounded-[34px] p-6 lg:p-10 shadow-[0_24px_80px_rgba(17,17,17,0.08)] bg-[#F3EDE8] border border-black/5">
                                    <h2 className="text-[40px] font-bold leading-[1.02] tracking-[-0.04em] lg:text-[54px]">Choose your path.</h2>
                                    <div className="mt-8 overflow-hidden rounded-[24px] border bg-white/55 border-[#DDD6CE]">
                                        <div className="grid grid-cols-2 border-b border-[#DDD6CE]">
                                            <TabButton active={tab === "report"} onClick={() => setTab("report")} label="Strategic Report" />
                                            <TabButton active={tab === "contact"} onClick={() => setTab("contact")} label="Direct Contact" />
                                        </div>
                                        <div className="bg-white p-8">
                                            <AnimatePresence mode="wait">
                                                {tab === "report" ? (
                                                    <motion.div key="rep" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <TextInput label="Full Name" value={reportForm.fullName} onChange={(e: any) => setReportForm({ ...reportForm, fullName: e.target.value })} />
                                                            <TextInput label="Company" value={reportForm.company} onChange={(e: any) => setReportForm({ ...reportForm, company: e.target.value })} />
                                                        </div>
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <Select label="Industry" value={reportForm.industry} onChange={(e: any) => setReportForm({ ...reportForm, industry: e.target.value })}>
                                                                <option value="">Select industry</option>
                                                                {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                                            </Select>
                                                            <Select label="Locations" value={reportForm.locations} onChange={(e: any) => setReportForm({ ...reportForm, locations: e.target.value })}>
                                                                <option value="">Select range</option>
                                                                <option value="1 location">1 location</option>
                                                                <option value="2-5 locations">2-5 locations</option>
                                                                <option value="6-20 locations">6-20 locations</option>
                                                                <option value="20+ locations">20+ locations</option>
                                                            </Select>
                                                        </div>
                                                        <div className="grid gap-4 md:grid-cols-2">
                                                            <Select label="Timeline" value={reportForm.timeline} onChange={(e: any) => setReportForm({ ...reportForm, timeline: e.target.value })}>
                                                                <option value="">Select timeline</option>
                                                                <option value="Immediate">Immediate need</option>
                                                                <option value="Within 3 months">Within 3 months</option>
                                                                <option value="3-6 months">3-6 months</option>
                                                            </Select>
                                                            <Select label="Primary Challenge" value={reportForm.primaryChallenge} onChange={(e: any) => setReportForm({ ...reportForm, primaryChallenge: e.target.value })}>
                                                                <option value="">Select challenge</option>
                                                                <option value="Outdated environment">Outdated environment</option>
                                                                <option value="Generic experience">Generic experience</option>
                                                                <option value="Weak brand presence">Weak brand presence</option>
                                                            </Select>
                                                        </div>
                                                        <Textarea label="Strategic Goals" value={reportForm.goals} onChange={(e: any) => setReportForm({ ...reportForm, goals: e.target.value })} placeholder="What needs to improve?" />
                                                        <PrimaryButton disabled={!reportReady || loading} onClick={handleReport}>{loading ? "Syncing..." : "Generate Strategic Report"}</PrimaryButton>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div key="con" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                                                        <TextInput label="Name" value={contactForm.fullName} onChange={(e: any) => setContactForm({ ...contactForm, fullName: e.target.value })} />
                                                        <TextInput label="Company" value={contactForm.company} onChange={(e: any) => setContactForm({ ...contactForm, company: e.target.value })} />
                                                        <Textarea label="Project Description" rows={6} value={contactForm.projectDescription} onChange={(e: any) => setContactForm({ ...contactForm, projectDescription: e.target.value })} />
                                                        <PrimaryButton disabled={!contactForm.fullName || loading} onClick={handleContact}>{loading ? "Sending..." : "Submit Inquiry"}</PrimaryButton>
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
                    <motion.section key="res" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20">
                        <div className="mb-12 flex justify-between">
                            <button onClick={() => setShowReport(false)} className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-500"><ArrowLeft className="w-4 h-4" /> Back to Form</button>
                            <button onClick={async () => { await navigator.clipboard.writeText(built.plainText); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="bg-black text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase">{copied ? "Copied!" : "Copy Report"}</button>
                        </div>
                        <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
                            <aside className="lg:sticky lg:top-10 lg:self-start">
                                <div className="rounded-[40px] border bg-[#F3EDE8] p-8 shadow-xl border-[#DDD6CE]">
                                    <ActiveIndustryIcon className="h-10 w-10 text-[#FF6A17] mb-6" />
                                    <h2 className="text-4xl font-bold leading-[1.1] mb-8">{built.title}</h2>
                                    <div className="space-y-4">
                                        <SummaryRow icon={Mail} label="Name" value={reportForm.fullName} />
                                        <SummaryRow icon={Building2} label="Company" value={reportForm.company} />
                                        <SummaryRow icon={MapPinned} label="Footprint" value={reportForm.locations} />
                                    </div>
                                </div>
                            </aside>
                            <main className="space-y-8">
                                <div className="rounded-[40px] bg-white p-10 border border-[#DDD6CE] shadow-sm">
                                    <div className="text-xs font-black uppercase tracking-widest text-[#FF6A17] mb-3">Executive Summary</div>
                                    <h1 className="text-5xl font-bold mb-6 tracking-tight">{built.title}</h1>
                                    <p className="text-xl text-neutral-500 leading-relaxed">{built.summary}</p>
                                </div>
                                {built.sections.map((s, i) => (
                                    <div key={s.id} className="rounded-[40px] bg-white p-10 border border-[#DDD6CE] shadow-sm">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">Section {i + 1}</div>
                                        <h3 className="text-3xl font-bold mb-6 flex items-center gap-4"><s.icon className="h-7 w-7 text-[#FF6A17]" /> {s.title}</h3>
                                        <p className="text-neutral-700 leading-relaxed text-lg whitespace-pre-wrap">{s.body}</p>
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

// Sub-components for tight design
function FeatureCard({ title, body }: any) {
    return (
        <div className="rounded-[24px] p-8 border shadow-sm" style={{ background: "radial-gradient(circle at top left, rgba(255,106,23,0.12), transparent 30%), linear-gradient(135deg, #1A1B1F 0%, #2A2A2D 100%)", color: "#FFF", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[16px] font-bold text-[#FFB184] mb-2">{title}</div>
            <div className="text-sm opacity-60 leading-relaxed">{body}</div>
        </div>
    );
}

function TabButton({ active, onClick, label }: any) {
    return (
        <button onClick={onClick} className={`flex-1 py-5 text-center text-sm font-bold uppercase tracking-widest transition ${active ? "bg-white text-black" : "text-neutral-400"}`} style={{ boxShadow: active ? `inset 0 -3px 0 ${COLORS.orange}` : "none" }}>{label}</button>
    );
}

function TextInput({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1.5">{label}</label>
            <input {...props} className="h-14 w-full rounded-2xl border bg-white px-5 text-lg outline-none focus:border-[#FF6A17] transition-all border-[#DDD6CE]" />
        </div>
    );
}

function Select({ label, children, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1.5">{label}</label>
            <select {...props} className="h-14 w-full rounded-2xl border bg-white px-5 text-lg outline-none focus:border-[#FF6A17] transition-all border-[#DDD6CE] appearance-none">{children}</select>
        </div>
    );
}

function Textarea({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1.5">{label}</label>
            <textarea {...props} className="w-full rounded-2xl border bg-white px-5 py-4 text-lg outline-none focus:border-[#FF6A17] transition-all border-[#DDD6CE] min-h-[140px]" />
        </div>
    );
}

function PrimaryButton({ children, onClick, disabled }: any) {
    return (
        <button disabled={disabled} onClick={onClick} className="h-16 w-full rounded-2xl bg-[#FF6A17] text-white font-bold text-lg transition disabled:opacity-40 hover:shadow-xl flex items-center justify-center gap-3">{children}</button>
    );
}

function SummaryRow({ icon: Icon, label, value }: any) {
    return (
        <div className="bg-white/80 p-5 rounded-2xl border border-[#DDD6CE] flex items-start gap-4">
            <Icon className="h-5 w-5 text-[#FF6A17] mt-1" />
            <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">{label}</div>
                <div className="text-lg font-bold text-[#111]">{value || "Pending"}</div>
            </div>
        </div>
    );
}