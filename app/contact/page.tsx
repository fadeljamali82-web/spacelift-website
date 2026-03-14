"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft, Briefcase, Building2, CheckCircle2, ClipboardList, Copy, Hotel,
    LayoutGrid, Mail, MapPinned, MessageSquareText, Send, ShieldCheck, Sparkles, Store, TrendingUp, Clock, Target, Zap
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- CRM CONFIGURATION ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

const COLORS = {
    bg: "#F7F6F3", panel: "#F3EDE8", white: "#FFFFFF", text: "#111111",
    muted: "#6B6B6B", border: "#DDD6CE", orange: "#FF6A17"
};

// --- STRATEGIC DATA ENGINE ---
const STRATEGY_CONTENT: Record<string, any> = {
    hospitality: {
        p1_title: "The Experience Economy",
        p1_text: "In 2026, guests aren't just booking a room; they are investing in atmospheric status. If your surfaces signal the past, you are paying an invisible 'Perception Tax'—losing high-margin bookings to properties that look and feel more current. SpaceLift bridges this by transforming guest-facing textures in days, not months, instantly elevating your ADR (Average Daily Rate).",
        p2_title: "Tactile Trust",
        p2_text: "We focus on high-touch zones: reception nodes, elevator interiors, and corridors. By deploying rare-stone and exotic wood finishes that require zero demolition, we solve the 'Downtime Dilemma.' You stay open, your brand signals elite quality, and your revenue remains uninterrupted.",
        graphData: [
            { name: 'Traditional Renovation', value: 30, color: '#DDD6CE' },
            { name: 'SpaceLift Transformation', value: 95, color: '#FF6A17' }
        ]
    },
    corporate: {
        p1_title: "Workplace Magnetism",
        p1_text: "The office is no longer a utility; it's a cultural destination. To solve the hybrid-work friction, the environment must feel more premium than the employee's home. SpaceLift replaces stagnant corporate beige with high-tactility, matte surfaces that reduce visual noise and signal a high-investment culture.",
        p2_title: "Cultural ROI",
        p2_text: "We transform common areas and collaboration zones into gallery-grade environments. This isn't just an aesthetic fix—it’s a retention tool. By removing the 'utility' feel of the workspace, we help you lower recruitment costs and boost team energy through atmospheric alignment.",
        graphData: [
            { name: 'Standard Office', value: 40, color: '#DDD6CE' },
            { name: 'SpaceLift Workspace', value: 88, color: '#FF6A17' }
        ]
    },
    retail: {
        p1_title: "The Instagram Standard",
        p1_text: "If a store isn't worth a photo, it's barely worth a visit. Physical retail must now provide 'Social Currency.' SpaceLift uses high-contrast surface logic to make your walls act as frames for your product, turning a transactional floor into an experiential stage.",
        p2_title: "Dwell-Time Engineering",
        p2_text: "We resurface focal walls and checkout nodes to feel like high-end concierge desks. By deepening the atmospheric quality, we naturally increase dwell time. Longer stays lead to higher transaction values. We solve the 'E-commerce Exit' by making the physical store impossible to ignore.",
        graphData: [
            { name: 'Basic Retail', value: 25, color: '#DDD6CE' },
            { name: 'SpaceLift Boutique', value: 92, color: '#FF6A17' }
        ]
    }
};

export default function ContactPage() {
    const [tab, setTab] = useState<"report" | "contact">("report");
    const [showReport, setShowReport] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const [form, setForm] = useState({
        fullName: "", company: "", email: "", industry: "", locations: "",
        timeline: "", scope: "", environmentType: "", primaryChallenge: "",
        budgetApproach: "", goals: "", constraints: "", notes: ""
    });

    const content = useMemo(() => STRATEGY_CONTENT[form.industry as string] || STRATEGY_CONTENT.hospitality, [form.industry]);

    async function syncToCRM(formData: any, source: string) {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({ ...formData, source }).toString();
            await fetch(`${CRM_URL}?${queryParams}`, { method: "GET", mode: "no-cors" });
        } catch (e) { console.error(e); }
        finally { setTimeout(() => setLoading(false), 800); }
    }

    const handleAction = async () => {
        if (tab === "report") {
            await syncToCRM(form, "Strategic Report");
            setShowReport(true);
            window.scrollTo(0, 0);
        } else {
            await syncToCRM(form, "Direct Contact");
            window.location.href = `mailto:hello@spacelift-studio.com?subject=Project Inquiry: ${form.company}&body=Name: ${form.fullName}`;
        }
    };

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
                                <h1 className="text-[54px] lg:text-[96px] font-bold leading-[0.9] tracking-[-0.04em] mb-10">The path that fits the opportunity.</h1>
                                <p className="text-2xl text-neutral-500 leading-relaxed mb-12 max-w-xl">Get a custom, 4-page strategic report on your environment, built for decision makers.</p>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="p-8 rounded-[30px] bg-black text-white border border-white/5">
                                        <Target className="w-8 h-8 text-orange-500 mb-4" />
                                        <h3 className="font-bold text-lg mb-2">Zero Friction</h3>
                                        <p className="text-sm opacity-50">Syncs directly to our studio team for immediate review.</p>
                                    </div>
                                    <div className="p-8 rounded-[30px] bg-white border border-neutral-200">
                                        <TrendingUp className="w-8 h-8 text-orange-500 mb-4" />
                                        <h3 className="font-bold text-lg mb-2">Revenue Focused</h3>
                                        <p className="text-sm text-neutral-500">Every recommendation is designed to drive asset value.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-[#F3EDE8] p-2 shadow-2xl border border-black/5">
                                <div className="flex bg-white/50 rounded-[32px] p-1 overflow-hidden">
                                    <button onClick={() => setTab("report")} className={`flex-1 py-5 text-xs font-black uppercase tracking-widest transition ${tab === "report" ? "bg-white shadow-sm" : "opacity-40"}`}>Strategic Report</button>
                                    <button onClick={() => setTab("contact")} className={`flex-1 py-5 text-xs font-black uppercase tracking-widest transition ${tab === "contact" ? "bg-white shadow-sm" : "opacity-40"}`}>Direct Contact</button>
                                </div>
                                <div className="bg-white p-8 lg:p-12 rounded-b-[38px] mt-1 space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <TextInput label="Full Name" value={form.fullName} onChange={(v: string) => setForm({ ...form, fullName: v })} />
                                        <TextInput label="Company" value={form.company} onChange={(v: string) => setForm({ ...form, company: v })} />
                                    </div>
                                    <Select label="Industry" value={form.industry} onChange={(v: string) => setForm({ ...form, industry: v })}>
                                        <option value="">Select industry</option>
                                        <option value="hospitality">Hospitality</option>
                                        <option value="corporate">Corporate</option>
                                        <option value="retail">Retail</option>
                                    </Select>
                                    <Select label="Timeline" value={form.timeline} onChange={(v: string) => setForm({ ...form, timeline: v })}>
                                        <option value="">Select timeline</option>
                                        <option value="Immediate">Immediate need</option>
                                        <option value="Within 3 months">Within 3 months</option>
                                    </Select>
                                    <Textarea label="What needs to improve?" value={form.goals} onChange={(v: string) => setForm({ ...form, goals: v })} placeholder="Visually, operationally, or commercially?" />
                                    <PrimaryButton disabled={loading || !form.fullName} onClick={handleAction}>
                                        {loading ? "Synchronizing..." : tab === "report" ? "Generate 4-Page Report" : "Submit Inquiry"}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
                        <div className="flex justify-between items-center mb-16">
                            <button onClick={() => setShowReport(false)} className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition"><ArrowLeft className="w-4 h-4" /> Back to Intake</button>
                            <button onClick={() => { navigator.clipboard.writeText(content.p1_text); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="bg-black text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl">{copied ? "Copied!" : "Export Full Analysis"}</button>
                        </div>

                        <div className="space-y-24">
                            {/* PAGE 1: THESIS */}
                            <section className="border-t-2 border-black pt-12">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">Phase 01 / Strategic Thesis</div>
                                    <div className="text-xs font-bold text-neutral-400">SpaceLift Studio © 2026</div>
                                </div>
                                <h2 className="text-6xl font-bold tracking-tighter mb-10 max-w-3xl">{content.p1_title}</h2>
                                <div className="grid lg:grid-cols-2 gap-16">
                                    <p className="text-2xl leading-relaxed text-neutral-800 font-medium">{content.p1_text}</p>
                                    <div className="bg-neutral-100 rounded-[40px] p-10 flex flex-col justify-center">
                                        <div className="text-xs font-black uppercase tracking-widest mb-8 text-neutral-400 text-center">Visual Perception Index</div>
                                        <div className="h-[200px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={content.graphData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                                                        {content.graphData.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* PAGE 2: TRANSFORMATION */}
                            <section className="border-t-2 border-black pt-12">
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-orange-600 mb-12">Phase 02 / Asset Optimization</div>
                                <div className="grid lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2">
                                        <h2 className="text-5xl font-bold tracking-tight mb-8">{content.p2_title}</h2>
                                        <p className="text-xl leading-relaxed text-neutral-600 mb-10">{content.p2_text}</p>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-6 rounded-3xl border border-neutral-200">
                                                <Clock className="text-orange-500 w-6 h-6 mb-3" />
                                                <div className="font-bold">Rapid Sprint</div>
                                                <div className="text-sm opacity-60">72-hour zone transformation.</div>
                                            </div>
                                            <div className="p-6 rounded-3xl border border-neutral-200">
                                                <Zap className="text-orange-500 w-6 h-6 mb-3" />
                                                <div className="font-bold">Zero Demo</div>
                                                <div className="text-sm opacity-60">No dust. No closure. No waste.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-black rounded-[40px] p-10 text-white flex flex-col justify-between">
                                        <Sparkles className="w-12 h-12 text-orange-500" />
                                        <div>
                                            <h4 className="text-2xl font-bold mb-4">The Solution</h4>
                                            <p className="text-sm opacity-60 leading-relaxed">SpaceLift Studio serves as your tactical visual partner. We identify the high-perception zones that drive the most revenue and transform them overnight using elite architectural surfaces.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

// RESTORED PREMIUM UI COMPONENTS
function TextInput({ label, value, onChange, placeholder }: any) {
    return (
        <div className="w-full space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full h-14 px-5 rounded-2xl border border-[#DDD6CE] bg-white text-lg outline-none focus:border-[#FF6A17] transition-all"
            />
        </div>
    );
}

function Select({ label, value, onChange, children }: any) {
    return (
        <div className="w-full space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl border border-[#DDD6CE] bg-white text-lg outline-none appearance-none focus:border-[#FF6A17] transition-all"
            >
                {children}
            </select>
        </div>
    );
}

function Textarea({ label, value, onChange, placeholder }: any) {
    return (
        <div className="w-full space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[120px] p-5 rounded-2xl border border-[#DDD6CE] bg-white text-lg outline-none focus:border-[#FF6A17] transition-all"
            />
        </div>
    );
}

function PrimaryButton({ children, onClick, disabled }: any) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className="w-full h-16 bg-[#FF6A17] text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-30 hover:shadow-[0_15px_35px_rgba(255,106,23,0.3)] active:scale-[0.98]"
        >
            {children}
        </button>
    );
}

function FeatureCard({ title, body }: any) {
    return (
        <div className="rounded-[24px] p-8 border shadow-sm" style={{ background: "radial-gradient(circle at top left, rgba(255,106,23,0.12), transparent 30%), linear-gradient(135deg, #1A1B1F 0%, #2A2A2D 100%)", color: "#FFF", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="text-[16px] font-bold text-[#FFB184] mb-2">{title}</div>
            <div className="text-sm opacity-50 leading-relaxed">{body}</div>
        </div>
    );
}

function TabButton({ active, onClick, label }: any) {
    return (
        <button onClick={onClick} className={`flex-1 py-5 text-center text-xs font-black uppercase tracking-widest transition ${active ? "bg-white text-black" : "text-neutral-400"}`} style={{ boxShadow: active ? `inset 0 -3px 0 ${COLORS.orange}` : "none" }}>{label}</button>
    );
}

function SummaryRow({ icon: Icon, label, value }: any) {
    return (
        <div className="bg-white/80 p-5 rounded-2xl border border-[#DDD6CE] flex items-start gap-4">
            <Icon className="h-5 w-5 text-[#FF6A17] mt-1" />
            <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">{label}</div>
                <div className="text-lg font-bold text-[#111]">{value || "---"}</div>
            </div>
        </div>
    );
}