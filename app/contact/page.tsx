"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft, Briefcase, Building2, CheckCircle2, ClipboardList, Copy, Hotel,
    LayoutGrid, Mail, MapPinned, MessageSquareText, Send, ShieldCheck, Sparkles, Store,
    TrendingUp, Zap, Target, Check, ChevronRight, Download, MousePointer2, Layers, Clock
} from "lucide-react";

// --- CRM CONFIGURATION ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

const COLORS = { bg: "#F7F6F3", panel: "#F3EDE8", white: "#FFFFFF", text: "#111111", border: "#DDD6CE", orange: "#FF6A17" };

const SCOPE_OPTIONS = ["Architectural Resurfacing", "Elevator Modernization", "Lobby & Arrival Logic", "Furniture Upcycling", "Wayfinding & Brand ID", "Atmospheric Lighting"];
const ENVIRONMENT_OPTIONS = ["Main Entrance/Lobby", "Corridors & Circulation", "Guest/Client Rooms", "Collaboration Zones", "Social/Common Areas", "Executive Suites", "Exterior Facade"];
const INDUSTRY_LABELS: Record<string, string> = { hospitality: "Hospitality", corporate: "Corporate", retail: "Retail", healthcare: "Healthcare", venue: "Event / Venue", mixeduse: "Mixed-Use" };

// --- STRATEGIC DATA (Apostrophes escaped for Vercel) ---
const STRATEGIES: Record<string, any> = {
    hospitality: {
        theme: "RevPAR Arbitrage",
        p1: "In the 2026 luxury market, guests aren&apos;t just booking a room; they are acquiring &apos;Atmospheric Status.&apos; Your property, {company}, is likely suffering from an invisible Perception Tax. This occurs when elite service standards are overshadowed by a visual environment that signals a previous design era. SpaceLift stops this revenue leakage by aligning your physical architecture with your intended market position. Architecture is not a background; it is a financial driver.",
        p2: "We focus on the &apos;7-Second Anchor.&apos; 82% of travelers judge hotel quality within seconds of entry. Our move is surgical: we target the High-Perception Zones (HPZ)—check-in nodes, elevator cabs, and corridor envelopes. By deploying high-tactility textures—Rare Italian Stone, Exotic Brushed Metals, and Architectural Silks—we reset the guest&apos;s internal value meter.",
        p3: "The Math is unassailable. Traditional renovation kills 30% of annual revenue through closures. SpaceLift&apos;s &apos;Invis-Mode&apos; transformation happens in 72-hour sprints. While your competitors are losing months to dust and permits, {company} remains open for business. We spend your budget exclusively on the &apos;Revenue Layer&apos; yielding a 12-18% ADR lift.",
        stats: [25, 95]
    },
    corporate: {
        theme: "Workplace Magnetism",
        p1: "The office is no longer a utility; it is a Cultural Destination. For {company}, the challenge is &apos;Commute Justification.&apos; If your workplace feels like a clinical container, your workforce will treat work as a transaction. SpaceLift transforms your square footage into a powerful tool for recruitment and cultural alignment. If the space doesn&apos;t inspire, it devalues the talent within it.",
        p2: "We kill the &apos;Stagnation Loop.&apos; Corporate Beige is a productivity killer. Our playbook involves physicalizing your brand identity through high-performance matte finishes and biophilic textures in collaboration nodes. We solve the Commitment Conflict: structural rebuilds are 20-year liabilities. SpaceLift is a Strategic Pivot that refreshes your culture overnight.",
        p3: "Traditional construction wastes 80% of the budget on infrastructure the team never sees. SpaceLift flips the script. We spend your entire budget on the Visible Layer. Our data shows that assets investing in &apos;Tactile Modernity&apos; see a 40% increase in employee engagement scores.",
        stats: [40, 88]
    },
    retail: {
        theme: "Social Currency",
        p1: "If a store isn&apos;t worth a photo, it&apos;s barely worth the visit. In 2026, physical retail has shifted to an Experience-Center. Every square foot must provide &apos;Social Currency&apos; to the customer. Your walls are the frame, and your product is the art. A dated frame devalues your inventory and weakens your brand&apos;s authority.",
        p2: "We engineer Dwell-Time. If a store feels interchangeable, the customer defaults to e-commerce. We use high-contrast surface logic to create a sense of exclusivity. By transforming transactional checkout nodes into high-end concierge desks, we remove friction and increase atmospheric quality. Customers linger longer and spend more.",
        p3: "Speed is your competitive moat. SpaceLift is Sustainable Luxury. We refresh your entire aesthetic in 4 days with 75% less waste and zero operational downtime. While competitors lose months to closures, {company} captures the &apos;Hidden Revenue&apos; by remaining 100% operational.",
        stats: [15, 92]
    },
    healthcare: {
        theme: "Trust Protocol",
        p1: "In healthcare, the environment is the first interaction of care. Patients form impressions of clinical quality based on visual clarity before they ever speak to a doctor. If {company} looks dated, the Trust Gap widens. SpaceLift closes that gap by signaling elite care through elite aesthetics, matching the caliber of your practitioners.",
        p2: "We specialize in Atmospheric Calm. High-stress environments require Visual Decompression. Our playbook replaces clinical surfaces with warm, self-healing natural textures. By signaling safety and modernity, we solve for &apos;Atmospheric Anxiety&apos; and improve patient satisfaction scores (HCAHPS).",
        p3: "Construction in healthcare is usually a nightmare of hygiene disruption. SpaceLift works in low-traffic windows with zero dust and zero noise, ensuring care continuity remains 100% operational. Modernizing via resurfacing costs 70% less per square foot than traditional renovation.",
        stats: [45, 90]
    },
    venue: {
        theme: "Visual Agility",
        p1: "Event planners don&apos;t just book space; they book Possibility. If your venue at {company} feels locked into an old design, you lose high-value bookings. In a market where &apos;New&apos; is the only currency, SpaceLift provides the agility needed to stay relevant without going dark for months.",
        p2: "We focus on &apos;Photographability.&apos; By resurfacing focal bars and stages with high-depth architectural films, we make your space look like a multi-million dollar custom build. We solve the &apos;Season Gap&apos; by transforming your aesthetic between event bookings—overnight.",
        p3: "The ROI is found in Revenue Gap Protection. A 3-month renovation closure equals a 100% loss of seasonal revenue. SpaceLift is a Rapid Refresh. We transform while you sell, protecting your bottom line. You get 4x the perceived value increase relative to the capital spent.",
        stats: [30, 96]
    },
    mixeduse: {
        theme: "Prestige Life-Cycle",
        p1: "Developments like {company} no longer compete on amenities; you compete on &apos;Lifestyle Promise.&apos; When common areas drift visually, the asset feels less premium. SpaceLift protects your asset&apos;s valuation by maintaining a Visual Moat around your property, ensuring it remains the most desirable address.",
        p2: "We focus on the Resident Journey. Shared spaces age 5x faster than structural systems. Our playbook targets entry lobbies and social commons. We solve &apos;Asset Drift&apos; by maintaining a visual standard that keeps occupancy high and vacancies low, ensuring Grade-A status remains permanent.",
        p3: "A property feels &apos;dated&apos; in just 5 years. Our strategy refreshes high-impact surfaces at 10% of the cost of a full rebuild. This is the most efficient way to protect your building&apos;s cap rate. We turn your CapEx from a structural burden into a visual asset.",
        stats: [50, 92]
    }
};

export default function SpaceLiftPortal() {
    const [tab, setTab] = useState<"report" | "contact">("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);
    const [form, setForm] = useState({ fullName: "", company: "", email: "", industry: "", timeline: "", goals: "" });

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
        <div className="min-h-screen bg-[#F7F6F3] text-[#111111]">
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20 print:hidden">
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
                                <div className="flex bg-white/50 rounded-[32px] p-1 mb-1">
                                    <button onClick={() => setTab("report")} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${tab === "report" ? "bg-white text-black rounded-[28px] shadow-sm" : "opacity-40"}`}>Strategic Report</button>
                                    <button onClick={() => setTab("contact")} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${tab === "contact" ? "bg-white text-black rounded-[28px] shadow-sm" : "opacity-40"}`}>Direct Contact</button>
                                </div>
                                <div className="bg-white p-8 lg:p-12 rounded-b-[38px] space-y-7">
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <TextInput label="Full Name" value={form.fullName} onChange={(v: string) => setForm({ ...form, fullName: v })} placeholder="Your Name" />
                                        <TextInput label="Company" value={form.company} onChange={(v: string) => setForm({ ...form, company: v })} placeholder="Company Name" />
                                    </div>
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <Select label="Industry Focus" value={form.industry} onChange={(v: string) => setForm({ ...form, industry: v })}>
                                            <option value="">Select industry</option>
                                            {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                        </Select>
                                        <TextInput label="Email (Optional)" value={form.email} onChange={(v: string) => setForm({ ...form, email: v })} placeholder="your@email.com" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Layers className="w-3 h-3" /> Target Environments (Multi-Select)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {ENVIRONMENT_OPTIONS.map(e => (
                                                <button key={e} type="button" onClick={() => toggleList(selectedEnvs, setSelectedEnvs, e)} className={`px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all ${selectedEnvs.includes(e) ? 'bg-black border-black text-white shadow-lg scale-[1.02]' : 'bg-white border-neutral-200 text-neutral-400 hover:border-neutral-300'}`}>{e}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><MousePointer2 className="w-3 h-3" /> Desired Scope (Multi-Select)</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {SCOPE_OPTIONS.map(s => (
                                                <button key={s} type="button" onClick={() => toggleList(selectedServices, setSelectedServices, s)} className={`px-4 py-3 rounded-xl text-[10px] font-bold text-left border transition-all ${selectedServices.includes(s) ? 'bg-[#FF6A17] border-[#FF6A17] text-white shadow-lg scale-[1.02]' : 'bg-white border-neutral-200 text-neutral-400 hover:border-neutral-300'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <Textarea label="Strategic Goals" value={form.goals} onChange={(v: string) => setForm({ ...form, goals: v })} placeholder="What needs to improve?" />
                                    <PrimaryButton disabled={loading || !form.fullName || selectedServices.length === 0} onClick={handleSync}>
                                        {loading ? (
                                            <span className="flex items-center gap-2"><Clock className="w-5 h-5 animate-spin" /> Syncing...</span>
                                        ) : (
                                            "Generate Bespoke Strategy"
                                        )}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-5xl px-6 py-20 print:p-0">
                        <div className="flex justify-between mb-20 items-center print:hidden">
                            <button onClick={() => setShowReport(false)} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition"><ArrowLeft className="w-4 h-4" /> Back</button>
                            <button onClick={() => window.print()} className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-500 hover:text-[#FF6A17] transition border-b border-transparent hover:border-[#FF6A17] pb-1"><Download className="w-4 h-4" /> Download PDF</button>
                        </div>
                        <div className="space-y-32 print:space-y-20">
                            <StrategyPage num="01" title={strategy.theme} subtitle="Thesis" text={strategy.p1} stats={strategy.stats} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="02" title="Tactical Playbook" subtitle="Atmosphere" text={strategy.p2} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="03" title="Economic ROI" subtitle="Alignment" text={strategy.p3} isLast />
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

function StrategyPage({ num, title, subtitle, text, isLast, stats }: any) {
    return (
        <section className="border-t-4 border-black pt-12">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] mb-20 text-neutral-400"><span>Page {num} / {subtitle}</span><span>SpaceLift Intelligence © 2026</span></div>
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
            {isLast && <button onClick={() => window.location.href = 'mailto:hello@spacelift-studio.com'} className="mt-16 px-10 py-5 bg-[#FF6A17] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 print:hidden">Initiate Transformation <ChevronRight className="w-5 h-5" /></button>}
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

function TextInput({ label, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><input {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white text-black" /></div>); }
function Select({ label, children, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><select {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none appearance-none focus:border-[#FF6A17] transition-all bg-white text-black">{children}</select></div>); }
function Textarea({ label, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><textarea {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full min-h-[140px] p-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white text-black" /></div>); }
function PrimaryButton({ children, onClick, disabled }: any) { return (<button disabled={disabled} onClick={onClick} className="w-full h-16 bg-[#FF6A17] text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-30 hover:shadow-xl flex items-center justify-center py-5 active:scale-[0.98]">{children}</button>); }