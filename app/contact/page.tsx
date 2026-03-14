"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ArrowLeft, Briefcase, Building2, Hotel, LayoutGrid, Store,
    TrendingUp, Zap, ChevronRight, Download, MousePointer2, Layers, Clock
} from "lucide-react";

// --- CRM CONFIGURATION ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

const COLORS = { bg: "#F7F6F3", white: "#FFFFFF", text: "#111111", orange: "#FF6A17" };

// Form Options
const BUDGET_OPTIONS = ["Value-driven / Phased", "Standard CapEx", "Premium Rebranding", "Serious Asset Upgrade"];
const TIMELINE_OPTIONS = ["Immediate", "Within 3 months", "3-6 months", "Evaluating / TBC"];
const ENVIRONMENT_OPTIONS = ["Lobby/Entrance", "Corridors", "Guest Rooms", "Executive Suites", "Common Areas", "Exterior Facade"];
const SCOPE_OPTIONS = ["Architectural Resurfacing", "Elevator Modernization", "Lobby Logic", "Furniture Upcycling", "Wayfinding", "Lighting"];
const INDUSTRY_LABELS: Record<string, string> = { hospitality: "Hospitality", corporate: "Corporate", retail: "Retail", healthcare: "Healthcare", venue: "Event / Venue", mixeduse: "Mixed-Use" };

// --- APPROVED MCKINSEY-LEVEL STRATEGIC DATA ---
const STRATEGIES: Record<string, any> = {
    hospitality: {
        theme: "RevPAR Arbitrage",
        p1: "In the 2026 luxury market, guests decide your value within 7 seconds of entry. Your property, {company}, is likely suffering from an invisible Perception Tax. Architecture is not a background; it is a financial driver. To lead in your sector, the environment must signal the premium before the guest even checks in.",
        p2: "We focus on the &apos;7-Second Anchor.&apos; 82% of travelers judge hotel quality within seconds of entry. Our move is surgical: we target the High-Perception Zones (HPZ)—check-in nodes, elevator cabs, and corridor envelopes. By deploying high-tactility textures—Rare Stone and Exotic Metals—we reset the guest&apos;s internal value meter.",
        p3: "The Math is unassailable. Traditional renovation kills 30% of annual revenue through closures. SpaceLift utilizes an &apos;Invis-Mode&apos; transformation model. Our crews operate in 72-hour sprints during low-occupancy windows. While your competitors are losing months to dust, {company} remains open for business.",
        p4: "SpaceLift Studio is your partner in Asset Repositioning. Our roadmap begins with a Visual Heat-Map Audit, identifying exactly where your guest&apos;s eyes linger. We then curate a surface palette from our elite library that matches your brand DNA and aligns your physical space with your financial ambition.",
        stats: [25, 95]
    },
    corporate: {
        theme: "Workplace Magnetism",
        p1: "The office is no longer a utility; it is a Cultural Destination. For {company}, the challenge is &apos;Commute Justification.&apos; If your workplace feels like a clinical container, your workforce will treat work as a transaction. To win the war for talent, your environment must feel more intentional than the employee&apos;s home.",
        p2: "We kill the &apos;Stagnation Loop.&apos; Corporate Beige is a productivity killer. Generic surfaces drive visual fatigue. Our playbook involves physicalizing your brand identity through high-performance matte finishes and biophilic textures in collaboration nodes. We solve the Commitment Conflict: structural rebuilds are 20-year liabilities.",
        p3: "Consider the 5X Visual ROI. Traditional construction wastes 80% of the budget on pipes and infrastructure the team never sees. SpaceLift flips the script. We spend your entire budget on the Visible Layer. Our data shows that assets investing in &apos;Tactile Modernity&apos; see a 40% increase in employee engagement scores.",
        p4: "Our roadmap moves from Utility to Gallery. We identify high-traffic zones and apply high-performance architectural layers that reduce visual noise. Our rapid deployment means zero downtime for your operations. We don&apos;t just decorate; we engineer a space that pulls people back together.",
        stats: [40, 88]
    },
    retail: {
        theme: "Social Currency",
        p1: "If a store isn&apos;t worth a photo, it&apos;s barely worth the visit. In 2026, physical retail has shifted to an Experience-Center. Your walls are the frame, and your product is the art. A dated frame devalues your inventory and weakens your brand&apos;s authority. SpaceLift bridges the gap between your digital perfection and your physical reality.",
        p2: "We engineer Dwell-Time. If a store feels interchangeable, the customer defaults to e-commerce. We use high-contrast surface logic—deeply textured backgrounds and architectural metals—to create a sense of exclusivity. By transforming transactional nodes into concierge desks, we remove friction and increase atmospheric quality.",
        p3: "Speed is your competitive moat. Traditional retail fit-outs are slow and produce tons of waste. SpaceLift is Sustainable Luxury. We refresh your entire aesthetic in 4 days with 75% less waste and zero operational downtime. By remaining 100% operational, {company} captures the revenue that competitors lose during closures.",
        p4: "The path to Experiential Retail starts with identifying your high-impact &apos;Money Zones.&apos; We apply elite surfaces that pop on digital platforms, turning every customer into a brand ambassador. We don&apos;t just sell products; we sell the environment they live in. SpaceLift turns a transactional floor into a high-performance stage.",
        stats: [15, 92]
    },
    healthcare: {
        theme: "Trust Protocol",
        p1: "In healthcare, the environment is the first interaction of care. Patients form impressions of clinical quality based on visual clarity before they ever speak to a doctor. If {company} looks dated, the Trust Gap widens, increasing patient anxiety and devaluing your care standards. SpaceLift closes that gap by signaling elite care.",
        p2: "We specialize in Atmospheric Calm. High-stress environments require Visual Decompression. Our playbook replaces clinical surfaces with warm, self-healing natural textures. By signaling safety and modernity, we solve for &apos;Atmospheric Anxiety&apos; and improve patient satisfaction scores. Our materials are medical-grade and anti-microbial.",
        p3: "Construction in healthcare is usually a nightmare of hygiene disruption. SpaceLift works in low-traffic windows with zero dust and zero noise, ensuring your care continuity remains 100% operational. Modernizing via resurfacing costs 70% less per square foot than traditional renovation, allowing for a faster network upgrade.",
        p4: "The Roadmap prioritizes your arrival nodes. We deploy anti-microbial premium architectural layers that signal elite care and safety the moment a patient walks through your door. SpaceLift ensures your facility is as advanced as the medicine you practice, providing total reassurance to every visitor.",
        stats: [45, 90]
    },
    venue: {
        theme: "Visual Agility",
        p1: "Event planners don&apos;t just book space; they book Possibility. If your venue at {company} feels locked into an old design language, you lose high-value bookings. In a market where &apos;New&apos; is the only currency, SpaceLift provides the visual agility needed to stay relevant without going dark for months. We ensure you are always the default choice.",
        p2: "We focus on &apos;Photographability.&apos; By resurfacing focal bars and stages with high-depth architectural films, we make your space look like a multi-million dollar custom build. We solve the &apos;Season Gap&apos; by transforming your aesthetic between event bookings—overnight—so you never miss a lead. Your venue stays Instagram-ready 365 days a year.",
        p3: "The ROI is found in Revenue Gap Protection. A 3-month renovation closure equals a 100% loss of seasonal revenue. SpaceLift is a Rapid Refresh. We transform while you sell, protecting your bottom line. You get 4x the perceived value increase relative to the capital spent, giving you a massive competitive edge.",
        p4: "We turn your venue from a static room into an adaptive destination. We identify the zones planners look at first, apply elite textures that catch light perfectly for photography, and ensure your space sells itself. SpaceLift is your tactical partner in seasonal relevance.",
        stats: [30, 96]
    },
    mixeduse: {
        theme: "Prestige Life-Cycle",
        p1: "Developments compete on &apos;Lifestyle Promise.&apos; When common areas drift visually behind guest expectations, {company}&apos;s asset perception falls—and rent roll follows. SpaceLift protects your asset&apos;s valuation by maintaining a Visual Moat around your property, ensuring it remains the most desirable address in the zip code.",
        p2: "We focus on the Resident Journey. Shared spaces age 5x faster than structural systems. Our playbook targets entry lobbies and social commons. Every surface must signal prestige and coherence. We solve &apos;Asset Drift&apos; by maintaining Grade-A status without the staggering cost of a full rebuild.",
        p3: "Our Math is built for Capital Efficiency. Refreshing common area surfaces with SpaceLift costs 90% less than a full reconstruction. We turn your CapEx from a structural burden into a visual asset, preserving your budget for structural needs while keeping the asset visually &apos;Grade-A.&apos;",
        p4: "The Roadmap protects your prestige for the long term. We identify where resident impressions are formed, apply durable, elite architectural surfaces that can be updated as trends evolve, and ensure your property never feels its age. SpaceLift is your partner in premium lifecycle management.",
        stats: [50, 92]
    }
};

export default function SpaceLiftPortal() {
    const router = useRouter();
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const [form, setForm] = useState({
        fullName: "", company: "", email: "", industry: "",
        timeline: "", budget: "", goals: ""
    });

    const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const strategy = useMemo(() => {
        const s = STRATEGIES[form.industry] || STRATEGIES.hospitality;
        const rep = (t: string) => t.replace(/{company}/g, form.company || "Your Org");
        return { ...s, p1: rep(s.p1), p2: rep(s.p2), p3: rep(s.p3), p4: rep(s.p4) };
    }, [form.industry, form.company]);

    async function handleSync() {
        setLoading(true);
        const payload = {
            Source: "Strategic Report",
            Name: form.fullName,
            Company: form.company,
            Contact: form.email || "N/A",
            Category: form.industry,
            Environment: selectedEnvs.join(", "),
            Goals: form.goals || "N/A",
            Timeline: form.timeline || "N/A",
            Budget: form.budget || "N/A",
            Scope: selectedServices.join(", ")
        };

        try {
            const q = new URLSearchParams(payload).toString();
            await fetch(`${CRM_URL}?${q}`, { method: "GET", mode: "no-cors" });
            setShowReport(true);
            window.scrollTo(0, 0);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }

    return (
        <div className="min-h-screen bg-[#F7F6F3] text-[#111111] font-sans">
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20 print:hidden">
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                            <div className="pt-4">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.3em] text-[#FF6A17]"><span className="h-px w-10 bg-current" /> Strategic Audit</div>
                                <h1 className="text-[54px] lg:text-[92px] font-bold leading-[0.92] tracking-[-0.05em] mb-10 text-black">Don&apos;t Rebuild.<br />Reposition.</h1>
                                <p className="text-2xl text-neutral-500 leading-relaxed mb-12 max-w-xl">Get a strategic roadmap designed to maximize visual ROI and asset value.</p>
                                <div className="grid gap-6">
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><Zap className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg text-black">Rapid Deployment</h4><p className="text-sm opacity-50">Results in days, not months.</p></div></div>
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><TrendingUp className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg text-black">Revenue Alignment</h4><p className="text-sm opacity-50">Built to increase market authority.</p></div></div>
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-[#F3EDE8] p-2 shadow-2xl border border-black/5">
                                <div className="bg-white p-8 lg:p-12 rounded-[38px] space-y-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <TextInputSuave label="Full Name" value={form.fullName} onChange={(v) => setForm(f => ({ ...f, fullName: v }))} placeholder="Name" />
                                        <TextInputSuave label="Company Name" value={form.company} onChange={(v) => setForm(f => ({ ...f, company: v }))} placeholder="Company" />
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <SelectSuave label="Industry Focus" value={form.industry} onChange={(v) => setForm(f => ({ ...f, industry: v }))}>
                                            <option value="">Select Industry</option>
                                            {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                        </SelectSuave>
                                        <TextInputSuave label="Email (Optional)" value={form.email} onChange={(v) => setForm(f => ({ ...f, email: v }))} placeholder="Email" />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Layers className="w-3 h-3" /> Target Environments (Multi-Select)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {ENVIRONMENT_OPTIONS.map(e => (
                                                <button key={e} type="button" onClick={() => toggleItem(selectedEnvs, setSelectedEnvs, e)} className={`px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all ${selectedEnvs.includes(e) ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-neutral-200 text-neutral-400'}`}>{e}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><MousePointer2 className="w-3 h-3" /> Desired Scope (Multi-Select)</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {SCOPE_OPTIONS.map(s => (
                                                <button key={s} type="button" onClick={() => toggleItem(selectedServices, setSelectedServices, s)} className={`px-4 py-3 rounded-xl text-[10px] font-bold text-left border transition-all ${selectedServices.includes(s) ? 'bg-[#FF6A17] border-[#FF6A17] text-white shadow-lg' : 'bg-white border-neutral-200 text-neutral-400'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid gap-5 md:grid-cols-2">
                                        <SelectSuave label="Timeline" value={form.timeline} onChange={(v) => setForm(f => ({ ...f, timeline: v }))}>
                                            <option value="">Select Timeline</option>
                                            {TIMELINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                        </SelectSuave>
                                        <SelectSuave label="Rough Budget Approach" value={form.budget} onChange={(v) => setForm(f => ({ ...f, budget: v }))}>
                                            <option value="">Select Budget</option>
                                            {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                                        </SelectSuave>
                                    </div>

                                    <TextareaSuave label="Main Goals" value={form.goals} onChange={(v) => setForm(f => ({ ...f, goals: v }))} placeholder="Visual or commercial objectives?" />

                                    <button
                                        disabled={loading || !form.fullName || !form.industry}
                                        onClick={handleSync}
                                        className="w-full h-16 bg-[#FF6A17] text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-30 hover:shadow-[0_15px_35px_rgba(255,106,23,0.3)] flex items-center justify-center py-5 active:scale-[0.98]"
                                    >
                                        {loading ? <span className="flex items-center gap-2"><Clock className="w-5 h-5 animate-spin" /> Syncing Data...</span> : "Generate Bespoke Strategy"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-5xl px-6 py-20 print:p-0">
                        <div className="flex justify-between mb-20 items-center print:hidden">
                            <button onClick={() => setShowReport(false)} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition"><ArrowLeft className="w-4 h-4" /> Back to Intake</button>
                            <button onClick={() => window.print()} className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-500 hover:text-[#FF6A17] transition border-b border-transparent hover:border-[#FF6A17] pb-1"><Download className="w-4 h-4" /> Download PDF</button>
                        </div>
                        <div className="space-y-32 print:space-y-20">
                            <StrategyPage num="01" title={strategy.theme} subtitle="Executive Thesis" text={strategy.p1} stats={strategy.stats} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="02" title="Tactical Playbook" subtitle="Atmospheric Strategy" text={strategy.p2} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="03" title="Economic ROI" subtitle="Visual Alignment" text={strategy.p3} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="04" title="The Roadmap" subtitle="Execution Plan" text={strategy.p4} isLast onAction={() => router.push('/')} />
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- SUB-COMPONENTS (FIXED SYNTAX) ---
function StrategyPage({ num, title, subtitle, text, isLast, stats, onAction }: any) {
    return (
        <section className="border-t-4 border-black pt-12">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] mb-20 text-neutral-400"><span>Page {num} / {subtitle}</span><span>SpaceLift Intelligence</span></div>
            <h2 className="text-7xl font-bold tracking-tighter mb-12 leading-[1.1] text-black">{title}</h2>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 print:grid-cols-1">
                <p className="text-3xl font-medium leading-[1.4] text-neutral-800">{text}</p>
                {stats && (
                    <div className="p-10 rounded-[50px] bg-neutral-100 border border-neutral-200 flex flex-col justify-center gap-10 print:border-none print:p-0">
                        <div className="w-full">
                            <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-black"><span>Current Perception Index</span><span>{stats[0]}%</span></div>
                            <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-neutral-200"><motion.div initial={{ width: 0 }} animate={{ width: `${stats[0]}%` }} transition={{ duration: 1.2 }} className="h-full bg-neutral-300" /></div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between text-[10px] font-black uppercase mb-3 text-black"><span>SpaceLift Potential</span><span>{stats[1]}%</span></div>
                            <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-neutral-200"><motion.div initial={{ width: 0 }} animate={{ width: `${stats[1]}%` }} transition={{ duration: 1.2, delay: 0.5 }} className="h-full bg-[#FF6A17]" /></div>
                        </div>
                    </div>
                )}
            </div>
            {isLast && <button onClick={onAction} className="mt-16 px-10 py-5 bg-[#FF6A17] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 print:hidden active:scale-95">Return to Homepage <ChevronRight className="w-5 h-5" /></button>}
        </section>
    );
}

function TextInputSuave({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div className="w-full space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white text-black"
            />
        </div>
    );
}

function SelectSuave({ label, value, onChange, children }: { label: string, value: string, onChange: (v: string) => void, children: React.ReactNode }) {
    return (
        <div className="w-full space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none appearance-none focus:border-[#FF6A17] transition-all bg-white text-black"
            >
                {children}
            </select>
        </div>
    );
}

function TextareaSuave({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <div className="w-full space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[140px] p-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white text-black"
            />
        </div>
    );
}