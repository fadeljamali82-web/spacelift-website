"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft, Briefcase, Building2, CheckCircle2, ClipboardList, Copy, Hotel,
    LayoutGrid, Mail, MapPinned, MessageSquareText, Send, ShieldCheck, Sparkles, Store,
    TrendingUp, Zap, Target, Check, ChevronRight, Download, MousePointer2, Layers, Clock
} from "lucide-react";

const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

const SCOPE_OPTIONS = ["Architectural Resurfacing", "Elevator Modernization", "Lobby & Arrival Logic", "Furniture Upcycling", "Wayfinding & Brand ID", "Atmospheric Lighting"];
const ENVIRONMENT_OPTIONS = ["Main Entrance/Lobby", "Corridors & Circulation", "Guest/Client Rooms", "Collaboration Zones", "Social/Common Areas", "Executive Suites", "Exterior Facade"];
const INDUSTRY_LABELS: Record<string, string> = { hospitality: "Hospitality", corporate: "Corporate", retail: "Retail", healthcare: "Healthcare", venue: "Event / Venue", mixeduse: "Mixed-Use" };

const STRATEGIES: Record<string, any> = {
    hospitality: {
        theme: "RevPAR Arbitrage",
        p1: "In the 2026 luxury market, guests decide your value within 7 seconds of entry. Your property, {company}, is likely suffering from an invisible Perception Tax. Architecture is not a background; it is a financial driver.",
        p2: "We target the &apos;7-Second Anchor.&apos; By resurfacing elevator and lobby touchpoints with elite textures, {company} resets the guest&apos;s value anchor, naturally justifying a 12-18% ADR lift without operational friction.",
        p3: "Traditional renovation leaks 30%+ of revenue due to closures. SpaceLift transformations happen in 72-hour &apos;Ninja Sprints.&apos; Speed is the new luxury.",
        stats: [25, 95]
    },
    corporate: {
        theme: "Workplace Magnetism",
        p1: "The office is no longer a utility; it is a Cultural Destination. For {company}, the challenge is commute justification. If the space looks like a utility container, employees will stay remote.",
        p2: "We engineer Dwell-Time. Deeply textured background surfaces and matte gallery finishes turn transactional floors into experiential stages where employees naturally want to be.",
        p3: "Structural rebuilds are 20-year liabilities. SpaceLift is a Strategic Pivot. We spend 100% of your budget on the &apos;Perception Layer,&apos; maximizing recruitment alpha.",
        stats: [40, 88]
    },
    retail: {
        theme: "Social Currency",
        p1: "If a store isn&apos;t worth a photo, it&apos;s barely worth the visit. Walls are the frame, and product is the art. For {company}, a dated frame devalues your brand authority and inventory value.",
        p2: "We engineer Dwell-Time. By resurfacing transactional check-out nodes into concierge desks, we remove Price Friction and improve atmospheric quality. Social currency becomes revenue.",
        p3: "Traditional fit-outs are slow and produce tons of waste. SpaceLift is Sustainable Luxury. We refresh your entire aesthetic in 4 days with 75% less waste.",
        stats: [15, 92]
    },
    healthcare: {
        theme: "Trust Protocol",
        p1: "In healthcare, the environment is the first interaction of care. For {company}, unaddressed atmospheric anxiety in patients directly devalues your standards of medicine.",
        p2: "We engineer Dwell-Time. Replacing cold, clinical surfaces with warm, self-healing natural textures signaling safety and elite care the moment a patient enters.",
        p3: "Surgical Transformation: SpaceLift works in low-traffic windows with zero dust, zero noise, and zero care disruption. Aesthetic hygiene is clinical excellence.",
        stats: [45, 90]
    },
    venue: {
        theme: "Visual Agility",
        p1: "Event planners don&apos;t just book space; they book Possibility. For {company}, a static, un-adaptive aesthetic means losing high-value tiers to venues with visual agility.",
        p2: "We target the &apos;7-Second Anchor.&apos; Resurfacing key stages, focal bars, and entryways overnight with elite architectural films makes the space look custom-built every booking.",
        p3: "Traditional reconstruction kills an entire season. SpaceLift refreshes between bookings. Speed is your competitive moat.",
        stats: [30, 96]
    },
    mixeduse: {
        theme: "Prestige Life-Cycle",
        p1: "Developments compete on &apos;Lifestyle Promise.&apos; When common areas drift visually behind guest expectations, {company}&apos;s asset perception falls—and rent roll follows.",
        p2: "We engineer Dwell-Time. Every surface from the arrival lobby to the social common rooms must permanently signal Grade-A prestige to protect asset valuation.",
        p3: "A premium asset can feel dated in just 5 years. SpaceLift maintains visual relevance by focusing spend solely on the visible and high-impact nodes.",
        stats: [50, 92]
    }
};

export default function StrategicPortal() {
    const [tab, setTab] = useState<"report" | "contact">("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);
    const [form, setForm] = useState({ fullName: "", company: "", email: "", industry: "", goals: "" });

    const toggleList = (list: string[], setList: Function, item: string) => setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

    const strategy = useMemo(() => {
        const s = STRATEGIES[form.industry] || STRATEGIES.hospitality;
        const rep = (t: string) => t.replace(/{company}/g, form.company || "Your Org");
        return { ...s, p1: rep(s.p1), p2: rep(s.p2), p3: rep(s.p3) };
    }, [form.industry, form.company]);

    async function handleSync() {
        setLoading(true);
        const payload = { ...form, environments: selectedEnvs.join(", "), services: selectedServices.join(", "), source: tab };
        try {
            const q = new URLSearchParams(payload).toString();
            await fetch(`${CRM_URL}?${q}`, { method: "GET", mode: "no-cors" });
            if (tab === "report") { setShowReport(true); window.scrollTo(0, 0); }
            else { window.location.href = `mailto:hello@spacelift-studio.com?subject=Inquiry: ${form.company}`; }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }

    return (
        <div className="min-h-screen bg-[#F7F6F3] text-[#111111] font-sans">
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20 print:hidden">
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                            <div className="pt-4">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.3em] text-[#FF6A17]"><span className="h-px w-10 bg-current" /> Strategic Audit</div>
                                <h1 className="text-[54px] lg:text-[92px] font-bold leading-[0.92] tracking-[-0.05em] mb-10 text-black">Don&apos;t Rebuild.<br />Reposition.</h1>
                                <p className="text-2xl text-neutral-500 leading-relaxed mb-12 max-w-xl">Get a bespoke strategic roadmap designed to maximize visual ROI and asset value.</p>
                                <div className="grid gap-6">
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><Zap className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg text-black">Rapid Deployment</h4><p className="text-sm opacity-50">Elite results in days, not months.</p></div></div>
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><TrendingUp className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg text-black">Revenue Alignment</h4><p className="text-sm opacity-50">Built to increase ADR and market authority.</p></div></div>
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-[#F3EDE8] p-2 shadow-2xl border border-black/5">
                                <div className="flex bg-white/50 rounded-[32px] p-1 mb-8">
                                    <button onClick={() => setTab("report")} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${tab === "report" ? "bg-white text-black rounded-[28px] shadow-sm" : "opacity-40"}`}>Strategic Report</button>
                                    <button onClick={() => setTab("contact")} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${tab === "contact" ? "bg-white text-black rounded-[28px] shadow-sm" : "opacity-40"}`}>Direct Contact</button>
                                </div>
                                <div className="bg-white p-8 lg:p-12 rounded-b-[38px] space-y-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <TextInput label="Full Name" value={form.fullName} onChange={(v: any) => setForm({ ...form, fullName: v })} placeholder="Name" />
                                        <TextInput label="Company" value={form.company} onChange={(v: any) => setForm({ ...form, company: v })} placeholder="Company Name" />
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <Select label="Industry Focus" value={form.industry} onChange={(v: any) => setForm({ ...form, industry: v })}>
                                            <option value="">Select industry</option>
                                            {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                        </Select>
                                        <TextInput label="Email (Optional)" value={form.email} onChange={(v: any) => setForm({ ...form, email: v })} placeholder="Email" />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Layers className="w-3 h-3" /> Target Environments (Multi-Select)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {ENVIRONMENT_OPTIONS.map(e => (
                                                <button key={e} type="button" onClick={() => toggleList(selectedEnvs, setSelectedEnvs, e)} className={`px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all ${selectedEnvs.includes(e) ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-neutral-200 text-neutral-400 hover:border-neutral-300'}`}>{e}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><MousePointer2 className="w-3 h-3" /> Desired Scope (Multi-Select)</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {SCOPE_OPTIONS.map(s => (
                                                <button key={s} type="button" onClick={() => toggleList(selectedServices, setSelectedServices, s)} className={`px-4 py-3 rounded-xl text-[10px] font-bold text-left border transition-all ${selectedServices.includes(s) ? 'bg-[#FF6A17] border-[#FF6A17] text-white shadow-lg' : 'bg-white border-neutral-200 text-neutral-400 hover:border-neutral-300'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <Textarea label="Strategic Goals" value={form.goals} onChange={(v: any) => setForm({ ...form, goals: v })} placeholder="What needs to improve?" />
                                    <PrimaryButton disabled={loading || !form.fullName || !form.industry} onClick={handleSync}>
                                        {loading ? (
                                            <span className="flex items-center gap-2"><Clock className="w-5 h-5 animate-spin" /> Synchronizing...</span>
                                        ) : (
                                            <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-black">Generate Strategic Report <ChevronRight className="w-4 h-4" /></span>
                                        )}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-5xl px-6 py-20 print:p-0">
                        <div className="flex justify-between mb-20 items-center print:hidden">
                            <button onClick={() => setShowReport(false)} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition"><ArrowLeft className="w-4 h-4" /> Back to Intake</button>
                            <div className="flex items-center gap-6">
                                <button onClick={() => window.print()} className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-500 hover:text-[#FF6A17] transition border-b border-transparent hover:border-[#FF6A17] pb-1"><Download className="w-4 h-4" /> Download PDF</button>
                                <div className="text-xs font-bold text-[#FF6A17] uppercase tracking-[0.2em]">Strategy for {form.company}</div>
                            </div>
                        </div>
                        <div className="space-y-32 print:space-y-20">
                            <StrategyPage num="01" title={strategy.theme} subtitle="Executive Thesis" text={strategy.p1} stats={strategy.stats} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="02" title="Tactical Playbook" subtitle="Atmospheric Strategy" text={strategy.p2} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="03" title="Economic Alignment" subtitle="Visual ROI" text={strategy.p3} isLast onAction={() => { setShowReport(false); setTab("contact"); window.scrollTo(0, 0); }} />
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

function StrategyPage({ num, title, subtitle, text, isLast, stats, onAction }: any) {
    return (
        <section className="border-t-4 border-black pt-12">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] mb-20 text-neutral-400"><span>Page {num} / {subtitle}</span><span>SpaceLift Intelligence</span></div>
            <h2 className="text-7xl font-bold tracking-tighter mb-12 leading-[1.1] text-black">{title}</h2>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 print:grid-cols-1">
                <p className="text-3xl font-medium leading-[1.4] text-neutral-800">{text}</p>
                {stats && (
                    <div className="p-10 rounded-[50px] bg-neutral-100 border border-neutral-200 flex flex-col justify-center gap-10 print:border-none print:p-0">
                        <StatLine label="Current Asset Perception" val={stats[0]} />
                        <StatLine label="SpaceLift Potential" val={stats[1]} color="#FF6A17" />
                    </div>
                )}
            </div>
            {isLast && <button onClick={onAction} className="mt-16 px-10 py-5 bg-[#FF6A17] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 print:hidden active:scale-95">Initiate Transformation <ChevronRight className="w-5 h-5" /></button>}
        </section>
    );
}

function StatLine({ label, val, color = "#DDD6CE" }: any) {
    return (
        <div className="w-full">
            <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-black"><span>{label}</span><span>{val}%</span></div>
            <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-neutral-200">
                <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1.2, delay: 0.5 }} className="h-full" style={{ background: color }} />
            </div>
        </div>
    );
}

function TextInput({ label, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><input {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white text-black placeholder:text-neutral-300" /></div>); }
function Select({ label, children, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><div className="relative"><select {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none appearance-none focus:border-[#FF6A17] transition-all bg-white text-black">{children}</select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400"><ChevronRight className="w-4 h-4 rotate-90" /></div></div></div>); }
function Textarea({ label, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><textarea {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full min-h-[140px] p-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white text-black placeholder:text-neutral-300" /></div>); }
function PrimaryButton({ children, onClick, disabled }: any) { return (<button disabled={disabled} onClick={onClick} className="w-full h-16 bg-[#FF6A17] text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-30 hover:shadow-[0_15px_35px_rgba(255,106,23,0.3)] flex items-center justify-center py-5 active:scale-[0.98]">{children}</button>); }