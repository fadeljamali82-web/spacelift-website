"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft, Briefcase, Building2, CheckCircle2, ClipboardList, Copy, Hotel,
    LayoutGrid, Mail, MapPinned, MessageSquareText, Send, ShieldCheck, Sparkles, Store,
    TrendingUp, Zap, Target, Check, ChevronRight, BarChart3, Clock, MousePointer2, Layers, Download
} from "lucide-react";

// --- CRM CONFIGURATION ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

const COLORS = {
    bg: "#F7F6F3", panel: "#F3EDE8", white: "#FFFFFF", text: "#111111",
    muted: "#6B6B6B", border: "#DDD6CE", orange: "#FF6A17"
};

const SCOPE_OPTIONS = [
    "Architectural Resurfacing", "Elevator Modernization", "Lobby & Arrival Logic",
    "Furniture Upcycling", "Wayfinding & Brand ID", "Atmospheric Lighting"
];

const ENVIRONMENT_OPTIONS = [
    "Main Entrance/Lobby", "Corridors & Circulation", "Guest/Client Rooms",
    "Collaboration Zones", "Social/Common Areas", "Executive Suites", "Exterior Facade"
];

const INDUSTRY_LABELS: Record<string, string> = {
    hospitality: "Hospitality", corporate: "Corporate / Workplace", retail: "Retail Environment",
    healthcare: "Healthcare", venue: "Event / Venue", mixeduse: "Mixed-Use / Residential"
};

// --- ELITE STRATEGIC CONTENT ENGINE (3-MIN READS) ---
const STRATEGIES: Record<string, any> = {
    hospitality: {
        theme: "RevPAR Arbitrage",
        p1: "In the 2026 luxury market, guests are no longer just booking a room; they are acquiring 'Atmospheric Status.' Your property, {company}, is likely suffering from an invisible Perception Tax. This occurs when elite service standards are overshadowed by a visual environment that signals a previous design era. This mismatch creates Price Friction, where guests feel they are overpaying even when the service is perfect. SpaceLift stops this revenue leakage by aligning your physical architecture with your intended market position. Architecture is not a background; it is a financial driver. To lead in your sector, the environment must signal the premium before the guest even checks in.",
        p2: "We focus on the '7-Second Anchor.' 82% of travelers judge hotel quality within seconds of entry. If your elevators look dated or your lobby focal walls feel generic, you have already lost the pricing battle. Our move is surgical: we target the High-Perception Zones (HPZ)—check-in nodes, elevator cabs, and corridor envelopes. By deploying high-tactility textures—Rare Italian Stone, Exotic Brushed Metals, and Architectural Silks—we reset the guest’s internal value meter. Because our process requires zero structural demolition, you achieve a $10M look for a fraction of the cost, keeping your asset 100% operational.",
        p3: "The Math is unassailable. Traditional renovation kills 30% of annual revenue through room-blocks and closures. SpaceLift utilizes an 'Invis-Mode' transformation model. Our crews operate in 72-hour sprints during low-occupancy windows. While your competitors are losing months to dust and permits, {company} remains open for business. We spend your budget exclusively on the 'Revenue Layer'—what the guest sees and touches—yielding a 12-18% ADR lift within the first quarter post-transformation. This is capital efficiency redefined for the hospitality sector.",
        p4: "SpaceLift Studio is your partner in Asset Repositioning. Our roadmap begins with a Visual Heat-Map Audit, identifying exactly where your guest's eyes linger. We curated a surface palette from our elite library that matches your brand DNA. Finally, we execute. You close a 'Standard' property on Sunday night; you open a 'Premium Destination' on Wednesday morning. We don't just fix walls; we align your physical space with your financial ambition.",
        stats: [25, 95]
    },
    corporate: {
        theme: "Workplace Magnetism",
        p1: "The office is no longer a utility; it is a Cultural Destination. For {company}, the primary challenge is no longer space efficiency—it is 'Commute Justification.' If your workplace feels like a clinical container, your workforce will treat work as a transaction. To win the war for talent, your environment must feel more premium, more inspiring, and more intentional than the employee’s home. SpaceLift transforms your square footage from a background expense into a powerful tool for recruitment and cultural alignment. If the space doesn't inspire, it devalues the talent within it.",
        p2: "We kill the 'Stagnation Loop.' Corporate Beige is a productivity killer. Generic, high-gloss surfaces drive visual fatigue and signal a 'low-investment' culture to top-tier talent. Our playbook involves physicalizing your brand identity through high-performance matte finishes and biophilic textures in collaboration nodes. We solve the Commitment Conflict: structural rebuilds are 20-year liabilities that disrupt flow for months. SpaceLift is a Strategic Pivot. We refresh your culture’s physical home overnight by focusing on high-impact zones like reception and breakout lounges.",
        p3: "Consider the 5X Visual ROI. Traditional construction wastes 80% of the budget on pipes, wiring, and permits—infrastructure the team never sees. SpaceLift flips the script. We spend your entire budget on the Visible Layer. Our data shows that assets investing in 'Tactile Modernity' see a 40% increase in employee engagement scores. You achieve world-class headquarters impact at 20% of the capital requirement. For {company}, this means significant CAPEX savings that can be redirected into core business growth.",
        p4: "Our roadmap moves from Utility to Gallery. We identify your high-traffic collaboration zones and apply high-performance architectural layers that reduce visual noise and promote focus. Our rapid deployment means zero downtime for your operations. We don't just decorate; we engineer a space that pulls people back together. SpaceLift is the fastest path to a world-class headquarters.",
        stats: [40, 88]
    },
    retail: {
        theme: "Social Currency",
        p1: "If a store isn’t worth a photo, it’s barely worth the visit. In 2026, physical retail for {company} has shifted from a transaction-center to an Experience-Center. Every square foot must justify its existence by providing 'Social Currency' to the customer. Your walls are the frame, and your product is the art. A dated frame devalues your inventory and weakens your brand's authority. SpaceLift bridges the gap between your digital perfection and your physical reality, ensuring that the brand promise made online is kept the moment a customer steps inside.",
        p2: "We engineer Dwell-Time. If a store feels interchangeable, the customer defaults to e-commerce. We use high-contrast surface logic—deeply textured backgrounds and architectural metals—to create a sense of exclusivity and curation. We focus on the 'Revenue Loop': the specific path from entry to checkout. By transforming transactional checkout nodes into high-end concierge desks, we remove the transactional friction and increase atmospheric quality. The result? Customers linger longer because they love the vibe, and longer stays lead to significantly higher transaction values.",
        p3: "Speed is your competitive moat. Traditional retail fit-outs are slow, loud, and produce tons of waste. SpaceLift is Sustainable Luxury. We refresh your entire aesthetic in 4 days with 75% less waste and zero operational downtime. By remaining 100% operational during the transformation, {company} captures the 'Hidden Revenue' that competitors lose during their 3-month construction closures. Visual ROI is maximized because the spend is concentrated solely on the customer's direct line of sight.",
        p4: "The path to Experiential Retail starts with identifying your high-impact 'Money Zones.' We apply elite surfaces that pop on digital platforms, turning every customer into a brand ambassador. We don't just sell products; we sell the environment they live in. SpaceLift is the fastest way to turn a transactional floor into a high-performance stage for your brand.",
        stats: [15, 92]
    },
    healthcare: {
        theme: "Trust Protocol",
        p1: "In healthcare, the environment is the first interaction of care. Patients form impressions of clinical quality based on visual clarity and calm before they ever speak to a doctor. If {company} looks dated, the Trust Gap widens, increasing patient anxiety and devaluing your care standards. SpaceLift closes that gap by signaling elite care through elite aesthetics. We help you realize a space that matches the caliber of your practitioners.",
        p2: "We specialize in Atmospheric Calm. High-stress environments require Visual Decompression. Our playbook replaces clinical surfaces with warm, self-healing natural textures. We focus on reception and circulation nodes. By signaling safety and modernity through the environment, we solve for 'Atmospheric Anxiety' and improve patient satisfaction scores (HCAHPS). Our materials are medical-grade and anti-microbial, ensuring your aesthetic upgrade meets the highest safety requirements.",
        p3: "We offer a non-invasive 'Surgical Transformation.' Construction in healthcare is usually a nightmare of permits and hygiene disruption. SpaceLift works in low-traffic windows with zero dust and zero noise, ensuring your care continuity remains 100% operational. Modernizing a facility via resurfacing costs 70% less per square foot than traditional renovation, allowing {company} to modernize an entire network for the cost of one full rebuild.",
        p4: "The Roadmap prioritizes your arrival nodes. We deploy anti-microbial premium architectural layers that signal elite care, trust, and safety the moment a patient walks through your door. SpaceLift ensures your facility is as advanced as the medicine you practice.",
        stats: [45, 90]
    },
    venue: {
        theme: "Visual Agility",
        p1: "Event planners don’t just book space; they book Possibility. If your ballroom or lounge at {company} feels locked into an old design language, you lose high-value bookings to competitors with 'Visual Agility.' In a fast-moving market where 'New' is the only currency that matters, your venue needs a way to evolve without going dark for months. SpaceLift provides that agility, ensuring you are always the default choice for premium event tiers.",
        p2: "We focus on 'Photographability.' Planners and guests are looking for 'The Money Shot.' By resurfacing focal bars, stages, and entryways with high-depth architectural films, we make your space look like a multi-million dollar custom build. We solve the 'Season Gap' by transforming your aesthetic between event bookings—overnight—so you never miss a lead or a season. Your venue stays 'Instagram-ready' 365 days a year.",
        p3: "The ROI is found in Revenue Gap Protection. A 3-month renovation closure equals a 100% loss of seasonal revenue. SpaceLift is a Rapid Refresh. We transform while you sell, protecting your bottom line while increasing your venue's market positioning. You get 4x the perceived value increase relative to the capital spent on surface transformation, giving {company} a massive competitive edge.",
        p4: "We turn your venue from a static room into an adaptive destination. We identify the zones planners look at first, apply elite textures that catch light perfectly for photography, and ensure your space sells itself. SpaceLift is your tactical partner in seasonal relevance.",
        stats: [30, 96]
    },
    mixeduse: {
        theme: "Prestige Life-Cycle",
        p1: "Developments like {company} no longer compete on amenities; you compete on 'Lifestyle Promise.' When common areas drift visually, the asset feels less premium—and your rent-roll follows. SpaceLift protects your asset’s valuation by maintaining a Visual Moat around your property. We ensure your development remains the most desirable address in the zip code, even as newer buildings arise.",
        p2: "We focus on the Resident Journey. Shared spaces age 5x faster than structural systems. Our playbook targets the 'Perception Loop'—entry lobbies and social commons. Every surface must signal prestige and coherence. We solve 'Asset Drift' by maintaining a visual standard that keeps occupancy high and vacancies low, ensuring your rent-roll remains elite without the staggering cost of a full rebuild.",
        p3: "Our Math is built for Capital Efficiency. Refreshing common area surfaces with SpaceLift costs 90% less than a full reconstruction. We turn your CapEx from a structural burden into a visual asset, preserving your budget for structural needs while keeping the asset visually 'Grade-A.' This is the most efficient way to protect your building's cap rate.",
        p4: "The Roadmap protects your prestige for the long term. We identify where resident impressions are formed, apply durable, elite architectural surfaces that can be updated as trends evolve, and ensure your property never feels its age. SpaceLift is your partner in lifecycle management.",
        stats: [50, 92]
    }
};

export default function SpaceLiftStrategicPortal() {
    const [tab, setTab] = useState<"report" | "contact">("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);

    const [form, setForm] = useState({
        fullName: "", company: "", email: "", industry: "", locations: "",
        timeline: "", scope: "", primaryChallenge: "",
        budgetApproach: "", goals: ""
    });

    const toggleList = (list: string[], setList: Function, item: string) => {
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    const reportReady = !!form.fullName && !!form.company && !!form.industry && selectedEnvs.length > 0 && selectedServices.length > 0;

    const strategy = useMemo(() => {
        const s = STRATEGIES[form.industry] || STRATEGIES.hospitality;
        const rep = (t: string) => t.replace(/{company}/g, form.company || "Your Org").replace(/{fullName}/g, form.fullName || "Management");
        return { ...s, p1: rep(s.p1), p2: rep(s.p2), p3: rep(s.p3), p4: rep(s.p4) };
    }, [form.industry, form.company, form.fullName]);

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

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <style jsx global>{`
        @media print {
          nav, button, .no-print { display: none !important; }
          body { background: white !important; }
          .report-container { width: 100% !important; margin: 0 !important; padding: 0 !important; }
          .page-break { page-break-before: always; padding-top: 2rem; }
          .print-header { display: block !important; border-bottom: 2px solid black; margin-bottom: 2rem; padding-bottom: 1rem; }
        }
        .print-header { display: none; }
      `}</style>

            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20">
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                            <div className="pt-4">
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.26em]" style={{ color: COLORS.orange }}><span className="h-px w-10 bg-current" /> Strategic Audit</div>
                                <h1 className="text-[54px] lg:text-[92px] font-bold leading-[0.92] tracking-[-0.05em] mb-10">Don't Rebuild.<br />Reposition.</h1>
                                <p className="text-2xl text-neutral-500 leading-relaxed mb-12 max-w-xl">A high-level strategic roadmap designed to maximize your visual ROI and asset value.</p>
                                <div className="grid gap-6">
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><Zap className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg">Rapid Deployment</h4><p className="text-sm opacity-50">Elite results in days, not months.</p></div></div>
                                    <div className="flex items-center gap-6 p-8 rounded-[30px] bg-white border border-neutral-200 shadow-sm"><TrendingUp className="w-8 h-8 text-orange-500" /><div><h4 className="font-bold text-lg">Revenue Alignment</h4><p className="text-sm opacity-50">Built to increase ADR and market authority.</p></div></div>
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-[#F3EDE8] p-2 shadow-2xl border border-black/5">
                                <div className="flex bg-white/50 rounded-[32px] p-1 mb-1">
                                    <button onClick={() => setTab("report")} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition ${tab === "report" ? "bg-white text-black rounded-[28px] shadow-sm" : "opacity-40"}`}>Strategic Report</button>
                                    <button onClick={() => setTab("contact")} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition ${tab === "contact" ? "bg-white text-black rounded-[28px] shadow-sm" : "opacity-40"}`}>Direct Contact</button>
                                </div>
                                <div className="bg-white p-8 lg:p-12 rounded-b-[38px] space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <TextInput label="Full Name" value={form.fullName} onChange={(v: any) => setForm({ ...form, fullName: v })} placeholder="Name" />
                                        <TextInput label="Company" value={form.company} onChange={(v: any) => setForm({ ...form, company: v })} placeholder="Company" />
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Select label="Industry Focus" value={form.industry} onChange={(v: any) => setForm({ ...form, industry: v })}>
                                            <option value="">Select industry</option>
                                            {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                        </Select>
                                        <TextInput label="Email (Optional)" value={form.email} onChange={(v: any) => setForm({ ...form, email: v })} placeholder="Email" />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Layers className="w-3 h-3" /> Target Environments (Multi-Select)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {ENVIRONMENT_OPTIONS.map(e => (
                                                <button key={e} onClick={() => toggleList(selectedEnvs, setSelectedEnvs, e)} className={`px-4 py-2.5 rounded-full text-[10px] font-bold border transition-all ${selectedEnvs.includes(e) ? 'bg-black border-black text-white shadow-md' : 'bg-white border-neutral-200 text-neutral-400'}`}>{e}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><MousePointer2 className="w-3 h-3" /> Desired Scope (Multi-Select)</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {SCOPE_OPTIONS.map(s => (
                                                <button key={s} onClick={() => toggleList(selectedServices, setSelectedServices, s)} className={`px-4 py-3 rounded-xl text-[10px] font-bold text-left border transition-all ${selectedServices.includes(s) ? 'bg-[#FF6A17] border-[#FF6A17] text-white shadow-md' : 'bg-white border-neutral-200 text-neutral-400 hover:border-neutral-300'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <Textarea label="Strategic Goals" value={form.goals} onChange={(v: any) => setForm({ ...form, goals: v })} placeholder="What needs to improve?" />
                                    <PrimaryButton disabled={loading || !reportReady} onClick={handleSync}>{loading ? "Synchronizing..." : "Generate bespoke strategy"}</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-5xl px-6 py-20 report-container">
                        <div className="flex justify-between mb-20 items-center no-print">
                            <button onClick={() => setShowReport(false)} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition"><ArrowLeft className="w-4 h-4" /> Back to Intake</button>
                            <div className="flex gap-4">
                                <button onClick={handleDownload} className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-neutral-600 hover:text-black transition border-b border-black pb-1"><Download className="w-4 h-4" /> Download Analysis</button>
                                <div className="text-xs font-bold text-orange-600 uppercase tracking-widest tracking-[0.2em]">Strategy Generated for {form.company}</div>
                            </div>
                        </div>

                        <div className="print-header">
                            <div className="text-xl font-bold uppercase tracking-widest">SpaceLift Studio Strategic Report</div>
                            <div className="text-sm text-neutral-500">Prepared for: {form.fullName} | {form.company} | 2026</div>
                        </div>

                        <div className="space-y-32">
                            <StrategyPage num="01" title={strategy.theme} subtitle="Executive Thesis" text={strategy.p1} stats={strategy.stats} />
                            <div className="page-break" />
                            <StrategyPage num="02" title="Tactical Playbook" subtitle="Atmospheric Strategy" text={strategy.p2} />
                            <div className="page-break" />
                            <StrategyPage num="03" title="Economic Alignment" subtitle="Visual ROI" text={strategy.p3} />
                            <div className="page-break" />
                            <StrategyPage num="04" title="Transformation Roadmap" subtitle="Next Steps" text={strategy.p4} isLast />
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- UI COMPONENTS ---
function StrategyPage({ num, title, subtitle, text, isLast, stats }: any) {
    return (
        <section className="border-t-4 border-black pt-12">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] mb-20 text-neutral-400"><span>Page {num} / {subtitle}</span><span>SpaceLift Intelligence</span></div>
            <h2 className="text-7xl font-bold tracking-tighter mb-12 leading-[1.1]">{title}</h2>
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20">
                <p className="text-3xl font-medium leading-[1.4] text-neutral-800">{text}</p>
                {stats && (
                    <div className="p-10 rounded-[50px] bg-neutral-100 border border-neutral-200 flex flex-col justify-center gap-10">
                        <StatLine label="Current Asset Perception" val={stats[0]} />
                        <StatLine label="SpaceLift Post-Deployment" val={stats[1]} color="#FF6A17" />
                    </div>
                )}
            </div>
            {isLast && <button onClick={() => window.location.href = 'mailto:hello@spacelift-studio.com'} className="mt-16 px-10 py-5 bg-[#FF6A17] text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 no-print">Initiate Transformation <ChevronRight className="w-5 h-5" /></button>}
        </section>
    );
}

function StatLine({ label, val, color = "#DDD6CE" }: any) {
    return (
        <div className="w-full">
            <div className="flex justify-between text-[10px] font-black uppercase mb-3"><span>{label}</span><span>{val}%</span></div>
            <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-neutral-200">
                <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full" style={{ background: color }} />
            </div>
        </div>
    );
}

function TextInput({ label, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><input {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white" /></div>); }
function Select({ label, children, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><select {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full h-14 px-5 rounded-2xl border border-neutral-200 outline-none appearance-none focus:border-[#FF6A17] transition-all bg-white">{children}</select></div>); }
function Textarea({ label, ...props }: any) { return (<div className="w-full space-y-1.5"><label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label><textarea {...props} onChange={(e) => props.onChange(e.target.value)} className="w-full min-h-[140px] p-5 rounded-2xl border border-neutral-200 outline-none focus:border-[#FF6A17] transition-all bg-white" /></div>); }
function PrimaryButton({ children, onClick, disabled }: any) { return (<button disabled={disabled} onClick={onClick} className="w-full h-16 bg-[#FF6A17] text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-30 hover:shadow-xl flex items-center justify-center py-5 active:scale-[0.98]">{children}</button>); }