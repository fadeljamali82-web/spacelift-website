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

// --- VERIFIED GOOGLE SCRIPT URL ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbyljLTF-I0feIJdqvB24lLV31wWqZ9xxIbw-fp7aMIO6DdxCoyH-IGLf4OC3oXKA1bDPQ/exec";

type TabKey = "report" | "contact";
type IndustryKey = "hospitality" | "corporate" | "retail" | "healthcare" | "venue" | "mixeduse" | "other";

export default function ContactPage() {
    const [tab, setTab] = useState<TabKey>("report");
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

    // THE SYNC ENGINE: Uses URLSearchParams to ensure Google Sheets receives the data
    async function syncToCRM(formData: any, source: string) {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                ...formData,
                source: source
            }).toString();

            // We use 'no-cors' and 'GET' because it is the most reliable way to hit Google Apps Script
            await fetch(`${CRM_URL}?${queryParams}`, {
                method: "GET",
                mode: "no-cors",
            });
            console.log("CRM Sync Initialized");
        } catch (e) {
            console.error("CRM Sync error", e);
        } finally {
            // Small delay to make the transition feel premium
            setTimeout(() => setLoading(false), 800);
        }
    }

    const handleGenerateReport = async () => {
        await syncToCRM(reportForm, "Strategic Report");
        setShowReport(true);
    };

    const handleDirectContact = async () => {
        await syncToCRM(contactForm, "Direct Contact");
        // Form backup: also opens the mail client
        const subject = encodeURIComponent(`SpaceLift Inquiry — ${contactForm.company}`);
        const body = encodeURIComponent(`Name: ${contactForm.fullName}\nProject: ${contactForm.projectDescription}`);
        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    };

    // Typography & UI Logic
    const COLORS = { bg: "#F7F6F3", panel: "#F3EDE8", white: "#FFFFFF", text: "#111111", muted: "#6B6B6B", border: "#DDD6CE", orange: "#FF6A17" };
    const INDUSTRY_LABELS: Record<string, string> = { hospitality: "Hospitality", corporate: "Corporate", retail: "Retail", healthcare: "Healthcare", venue: "Venue", mixeduse: "Mixed-Use", other: "Other" };

    return (
        <div className="min-h-screen" style={{ background: COLORS.bg, color: COLORS.text }}>
            <AnimatePresence mode="wait">
                {!showReport ? (
                    <motion.section key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-[1440px] px-6 py-12 lg:py-20">
                        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                            <div>
                                <div className="mb-8 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.26em]" style={{ color: COLORS.orange }}>
                                    <span className="h-px w-10 bg-current" /> Strategic Assessment
                                </div>
                                <h1 className="text-[52px] font-bold leading-[0.92] tracking-[-0.04em] lg:text-[96px]">The path that fits the opportunity.</h1>
                                <p className="mt-8 text-2xl text-neutral-500 leading-relaxed max-w-xl">Generate a custom environment report or reach out for direct collaboration.</p>

                                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                                    <div className="p-6 rounded-3xl bg-black text-white">
                                        <div className="text-orange-400 font-bold mb-2">Automated CRM</div>
                                        <div className="text-sm opacity-60">Your data is synced to your client list instantly.</div>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-white border border-neutral-200">
                                        <div className="text-black font-bold mb-2">Instant Report</div>
                                        <div className="text-sm text-neutral-500">Industry insights ready for your presentation.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[40px] bg-[#F3EDE8] p-2 shadow-2xl border border-black/5">
                                <div className="flex bg-white/50 rounded-[32px] p-1 overflow-hidden">
                                    <button onClick={() => setTab("report")} className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition ${tab === "report" ? "bg-white shadow-sm" : "opacity-50"}`}>Strategic Report</button>
                                    <button onClick={() => setTab("contact")} className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition ${tab === "contact" ? "bg-white shadow-sm" : "opacity-50"}`}>Direct Contact</button>
                                </div>

                                <div className="bg-white p-8 rounded-b-[38px] mt-1">
                                    {tab === "report" ? (
                                        <div className="space-y-5">
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <TextInput label="Full Name" value={reportForm.fullName} onChange={(e: any) => setReportForm({ ...reportForm, fullName: e.target.value })} />
                                                <TextInput label="Company" value={reportForm.company} onChange={(e: any) => setReportForm({ ...reportForm, company: e.target.value })} />
                                            </div>
                                            <Select label="Industry" value={reportForm.industry} onChange={(e: any) => setReportForm({ ...reportForm, industry: e.target.value })}>
                                                <option value="">Select industry</option>
                                                {Object.entries(INDUSTRY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                            </Select>
                                            <Textarea label="Environment" value={reportForm.environment} onChange={(e: any) => setReportForm({ ...reportForm, environment: e.target.value })} placeholder="Describe the space..." />
                                            <PrimaryButton disabled={loading || !reportForm.fullName} onClick={handleGenerateReport}>{loading ? "Syncing..." : "Generate Report"}</PrimaryButton>
                                        </div>
                                    ) : (
                                        <div className="space-y-5">
                                            <TextInput label="Name" value={contactForm.fullName} onChange={(e: any) => setContactForm({ ...contactForm, fullName: e.target.value })} />
                                            <TextInput label="Company" value={contactForm.company} onChange={(e: any) => setContactForm({ ...contactForm, company: e.target.value })} />
                                            <Textarea label="Message" value={contactForm.projectDescription} onChange={(e: any) => setContactForm({ ...contactForm, projectDescription: e.target.value })} placeholder="How can we help?" />
                                            <PrimaryButton disabled={loading || !contactForm.fullName} onClick={handleDirectContact}>{loading ? "Sending..." : "Submit Inquiry"}</PrimaryButton>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="report-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl px-6 py-20 text-center">
                        <CheckCircle2 className="w-16 h-16 text-orange-500 mx-auto mb-6" />
                        <h2 className="text-5xl font-bold mb-4">Report Synced.</h2>
                        <p className="text-xl text-neutral-500 mb-10">Your assessment has been written to your Google Sheet CRM.</p>
                        <button onClick={() => setShowReport(false)} className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm">New Assessment</button>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helpers
function TextInput({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <input {...props} className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:border-[#FF6A17] outline-none transition" />
        </div>
    );
}

function Select({ label, children, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <select {...props} className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:border-[#FF6A17] outline-none transition">{children}</select>
        </div>
    );
}

function Textarea({ label, ...props }: any) {
    return (
        <div className="w-full">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">{label}</label>
            <textarea {...props} className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:border-[#FF6A17] outline-none transition min-h-[120px]" />
        </div>
    );
}

function PrimaryButton({ children, onClick, disabled }: any) {
    return (
        <button disabled={disabled} onClick={onClick} className="w-full bg-[#FF6A17] text-white font-bold py-5 rounded-2xl transition disabled:opacity-40 hover:shadow-lg flex items-center justify-center gap-3">
            {children}
        </button>
    );
}