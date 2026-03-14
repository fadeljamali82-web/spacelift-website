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

// --- FORM OPTIONS ---
const BUDGET_OPTIONS = ["Value-driven / Phased", "Standard CapEx", "Premium Rebranding", "Serious Asset Upgrade"];
const TIMELINE_OPTIONS = ["Immediate", "Within 3 months", "3-6 months", "Evaluating / TBC"];
const ENVIRONMENT_OPTIONS = ["Lobby/Entrance", "Corridors", "Guest Rooms", "Executive Suites", "Common Areas", "Exterior Facade"];
const INDUSTRY_LABELS: Record<string, string> = { hospitality: "Hospitality", corporate: "Corporate", retail: "Retail", healthcare: "Healthcare", venue: "Event / Venue", mixeduse: "Mixed-Use" };

// --- APPROVED 4-PAGE MCKINSEY STRATEGIC DATA ---
const STRATEGIES: Record<string, any> = {
    hospitality: {
        theme: "RevPAR Arbitrage",
        p1: "In the 2026 luxury market, guests decide your value within 7 seconds of entry. Your property, {company}, is likely suffering from an invisible Perception Tax. This occurs when elite service standards are overshadowed by a visual environment that signals a previous design era. SpaceLift stops this revenue leakage by aligning your physical architecture with your intended market position. Architecture is not a background; it is a financial driver.",
        p2: "We focus on the &apos;7-Second Anchor.&apos; 82% of travelers judge hotel quality within seconds of entry. Our move is surgical: we target the High-Perception Zones (HPZ)—check-in nodes, elevator cabs, and corridor envelopes. By deploying high-tactility textures—Rare Italian Stone and Exotic Brushed Metals—we reset the guest&apos;s internal value meter instantly.",
        p3: "The Math is unassailable. Traditional renovation kills 30% of annual revenue through room-blocks and closures. SpaceLift utilizes an &apos;Invis-Mode&apos; transformation model. Our crews operate in 72-hour sprints during low-occupancy windows. While your competitors are losing months to dust, {company} remains open for business, yielding a 12-18% ADR lift.",
        p4: "Our roadmap begins with a Visual Heat-Map Audit, identifying exactly where your guest&apos;s eyes linger. We curated a surface palette that matches your brand DNA and aligns your physical space with your financial ambition. You close a &apos;Standard&apos; property on Sunday night; you open a &apos;Premium Destination&apos; on Wednesday morning.",
        stats: [25, 95]
    },
    corporate: {
        theme: "Workplace Magnetism",
        p1: "The office is no longer a utility; it is a Cultural Destination. For {company}, the challenge is &apos;Commute Justification.&apos; If your workplace feels like a clinical container, your workforce will treat work as a transaction. To win the war for talent, your environment must feel more premium and intentional than the employee&apos;s home. SpaceLift transforms your square footage into a tool for recruitment.",
        p2: "We kill the &apos;Stagnation Loop.&apos; Corporate Beige is a productivity killer. Generic surfaces drive visual fatigue and signal a low-investment culture. Our playbook involves physicalizing your brand identity through high-performance matte finishes and biophilic textures in collaboration nodes. SpaceLift is a Strategic Pivot that refreshes your culture&apos;s home overnight.",
        p3: "Consider the 5X Visual ROI. Traditional construction wastes 80% of the budget on pipes and infrastructure the team never sees. SpaceLift flips the script. We spend your entire budget on the Visible Layer. Data shows that assets investing in &apos;Tactile Modernity&apos; see a 40% increase in engagement. You achieve world-class headquarters impact at 20% of the capital requirement.",
        p4: "Our roadmap moves from Utility to Gallery. We identify your high-traffic collaboration zones and apply high-performance architectural layers that reduce visual noise. Our rapid deployment means zero downtime for your operations. We don&apos;t just decorate; we engineer a space that pulls people back together. SpaceLift is the fastest path to a world-class HQ.",
        stats: [40, 88]
    },
    retail: {
        theme: "Social Currency",
        p1: "If a store isn&apos;t worth a photo, it&apos;s barely worth the visit. In 2026, physical retail has shifted to an Experience-Center. Your walls are the frame, and your product is the art. A dated frame devalues your inventory and weakens your brand&apos;s authority. SpaceLift bridges the gap between your digital perfection and your physical reality, ensuring the brand promise is kept.",
        p2: "We engineer Dwell-Time. If a store feels interchangeable, the customer defaults to e-commerce. We use high-contrast surface logic to create a sense of exclusivity. By transforming transactional nodes into concierge desks, we remove friction and increase atmospheric quality. Customers linger longer because they love the vibe, leading to significantly higher transaction values.",
        p3: "Speed is your competitive moat. Traditional retail fit-outs are slow and loud. SpaceLift is Sustainable Luxury. We refresh your entire aesthetic in 4 days with 75% less waste and zero operational downtime. By remaining 100% operational, {company} captures the &apos;Hidden Revenue&apos; that competitors lose during construction closures.",
        p4: "The path starts with identifying your high-impact &apos;Money Zones.&apos; We apply elite surfaces that pop on digital platforms, turning every customer into a brand ambassador. We don&apos;t just sell products; we sell the environment they live in. SpaceLift is the fastest way to turn a transactional floor into a high-performance stage for your brand.",
        stats: [15, 92]
    },
    healthcare: {
        theme: "Trust Protocol",
        p1: "In healthcare, the environment is the first interaction of care. Patients form impressions of clinical quality based on visual clarity and calm before they ever speak to a doctor. If {company} looks dated, the Trust Gap widens, increasing patient anxiety. SpaceLift closes that gap by signaling elite care through elite aesthetics, matching the caliber of your practitioners.",
        p2: "We specialize in Atmospheric Calm. High-stress environments require Visual Decompression. Our playbook replaces clinical surfaces with warm, self-healing natural textures. By signaling safety and modernity, we solve for &apos;Atmospheric Anxiety&apos; and improve satisfaction scores. Our materials are medical-grade and anti-microbial, ensuring safety meets style.",
        p3: "Construction in healthcare is usually a nightmare of hygiene disruption. SpaceLift works in low-traffic windows with zero dust and zero noise, ensuring care continuity remains 100% operational. Modernizing via resurfacing costs 70% less per square foot than traditional renovation, allowing {company} to modernize an entire network for the cost of one rebuild.",
        p4: "The Roadmap prioritizes arrival nodes. We deploy anti-microbial premium architectural layers that signal elite care, trust, and safety the moment a patient walks through your door. SpaceLift ensures your facility is as advanced as the medicine you practice, providing total reassurance to every visitor and practitioner.",
        stats: [45, 90]
    },
    venue: {
        theme: "Visual Agility",
        p1: "Event planners don&apos;t just book space; they book Possibility. If your venue at {company} feels locked into an old design language, you lose high-value bookings. In a market where &apos;New&apos; is the only currency, SpaceLift provides the visual agility needed to stay relevant without going dark for months. We ensure you are always the default choice for premium tiers.",
        p2: "We focus on &apos;Photographability.&apos; By resurfacing focal bars and stages with high-depth architectural films, we make your space look like a multi-million dollar build. We solve the &apos;Season Gap&apos; by transforming your aesthetic between event bookings—overnight—so you never miss a lead. Your venue stays &apos;Instagram-ready&apos; 365 days a year.",
        p3: "The ROI is found in Revenue Gap Protection. A 3-month renovation closure equals a 100% loss of seasonal revenue. SpaceLift is a Rapid Refresh. We transform while you sell, protecting your bottom line while increasing your venue&apos;s market positioning. You get 4x the perceived value increase relative to capital spent, giving you a massive competitive edge.",
        p4: "We turn your venue from a static room into an adaptive destination. We identify the zones planners look at first, apply elite textures that catch light perfectly for photography, and ensure your space sells itself. SpaceLift is your tactical partner in seasonal relevance and high-tier booking confidence.",
        stats: [30, 96]
    },
    mixeduse: {
        theme: "Prestige Life-Cycle",
        p1: "Developments compete on &apos;Lifestyle Promise.&apos; When common areas drift visually behind guest expectations, {company}&apos;s asset perception falls—and rent roll follows. SpaceLift protects your asset&apos;s valuation by maintaining a Visual Moat around your property, ensuring it remains the most desirable address in the zip code, even as newer buildings arise.",
        p2: "We focus on the Resident Journey. Shared spaces age 5x faster than structural systems. Our playbook targets entry lobbies and social commons. Every surface must signal prestige and coherence. We solve &apos;Asset Drift&apos; by maintaining a visual standard that keeps occupancy high and vacancies low, ensuring Grade-A status remains permanent.",
        p3: "Our Math is built for Capital Efficiency. Refreshing common areas with SpaceLift costs 90% less than a full reconstruction. We turn your CapEx from a structural burden into a visual asset, preserving your budget for structural needs while keeping the asset visually &apos;Grade-A.&apos; This is the most efficient way to protect your building&apos;s cap rate.",
        p4: "The Roadmap protects your prestige for the long term. We identify resident impressions nodes, apply durable, elite architectural surfaces that can be updated as trends evolve, and ensure your property never feels its age. SpaceLift is your partner in premium lifecycle management.",
        stats: [50, 92]
    }
};

export default function SpaceLiftPortal() {
    const router = useRouter();
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);

    const [form, setForm] = useState({
        fullName: "", company: "", email: "", industry: "",
        timeline: "", budget: "", goals: ""
    });

    const toggleEnv = (item: string) => {
        setSelectedEnvs(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const strategy = useMemo(() => {
        const s = STRATEGIES[form.industry] || STRATEGIES.hospitality;
        const rep = (t: string) => t.replace(/{company}/g, form.company || "Your Org");
        return { ...s, p1: rep(s.p1), p2: rep(s.p2), p3: rep(s.p3), p4: rep(s.p4) };
    }, [form.industry, form.company]);

    async function handleSync() {
        setLoading(true);
        // Keys match your Google Sheet Headers EXACTLY
        const payload = {
            Source: "Strategic Report",
            Name: form.fullName,
            Company: form.company,
            Contact: form.email || "N/A",
            Category: form.industry,
            Environment: selectedEnvs.join(", "),
            Goals: form.goals || "N/A",
            Timeline: form.timeline || "N/A",
            Budget: form.budget || "N/A"
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
                    <motion.section key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20 print:hidden">
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                            <div className="pt-4">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.3em] text-[#FF6A17]"><span className="h-px w-10 bg-current" /> Strategic Audit</div>
                                <h1 className="text-[54px] lg:text-[92px] font-bold leading-[0.92] tracking-[-0.05em] mb-10 text-black">Don&apos;t Rebuild.<br />Reposition.</h1>
                                <p className="text-2xl text-neutral-500 leading-relaxed mb-12 max-w-xl">Get a high-level strategic roadmap designed to maximize visual ROI and asset value.</p>
                                <div className="grid gap-6">
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><Zap className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg text-black">Rapid Deployment</h4><p className="text-sm opacity-50">Results in days, not months.</p></div></div>
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><TrendingUp className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg text-black">Revenue Alignment</h4><p className="text-sm opacity-50">Built to increase market authority.</p></div></div>
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-[#F3EDE8] p-2 shadow-2xl border border-black/5">
                                <div className="bg-white p-8 lg:p-12 rounded-[38px] space-y-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-neutral-400">Full Name</label><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Name" className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] bg-white text-black" /></div>
                                        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-neutral-400">Company</label><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company Name" className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] bg-white text-black" /></div>
                                    </div>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-neutral-400">Industry Focus</label><select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none appearance-none bg-white text-black"><option value="">Select Industry</option>{Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
                                        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-neutral-400">Email (Optional)</label><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] bg-white text-black" /></div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Layers className="w-3 h-3" /> Target Environments (Multi-Select)</label>
                                        <div className="flex flex-wrap gap-2">{ENVIRONMENT_OPTIONS.map(e => (<button key={e} type="button" onClick={() => toggleEnv(e)} className={`px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all ${selectedEnvs.includes(e) ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-neutral-200 text-neutral-400'}`}>{e}</button>))}</div>
                                    </div>
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-neutral-400">Timeline</label><select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 bg-white text-black outline-none"><option value="">Select Timeline</option>{TIMELINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
                                        <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-neutral-400">Budget Approach</label><select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 bg-white text-black outline-none"><option value="">Select Budget</option>{BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
                                    </div>
                                    <div className="space-y-1.5"><label className="text-[10px] font-black uppercase text-neutral-400">Strategic Goals</label><textarea value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })} placeholder="What needs to improve?" className="w-full min-h-[120px] p-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] bg-white text-black" /></div>
                                    <button disabled={loading || !form.fullName || !form.industry} onClick={handleSync} className="w-full h-16 bg-[#FF6A17] text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-30 hover:shadow-xl flex items-center justify-center py-5 active:scale-[0.98]">{loading ? <Clock className="w-5 h-5 animate-spin" /> : "Generate Strategic Analysis"}</button>
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
                            <StrategyPage num="03" title="Economic ROI" subtitle="Financial Alignment" text={strategy.p3} />
                            <div className="print:break-after-page" />
                            <StrategyPage num="04" title="Transformation Roadmap" subtitle="Execution Plan" text={strategy.p4} isLast onAction={() => router.push('/')} />
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
            {isLast && <button onClick={onAction} className="mt-16 px-10 py-5 bg-[#FF6A17] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 print:hidden active:scale-95">Return to Overview <ChevronRight className="w-5 h-5" /></button>}
        </section>
    );
}