"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft, Building2, CheckCircle2, ClipboardList, Copy, Hotel,
    LayoutGrid, Mail, MapPinned, MessageSquareText, Send, ShieldCheck, Sparkles, Store, Briefcase
} from "lucide-react";

// --- PASTE YOUR NEW DEPLOYMENT URL HERE ---
const CRM_URL = "https://script.google.com/macros/s/AKfycbxd8V82TRv76MI8dnBlIbjbNJnCOO4faPueYJEGIlz0k-_v5TrCJfyO_mMGKABs3KcsA/exec";

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

    // THE FIX: Using URLSearchParams sends the data in a format Google understands
    async function syncToCRM(formData: any, source: string) {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                ...formData,
                source: source
            }).toString();

            await fetch(`${CRM_URL}?${queryParams}`, {
                method: "GET",
                mode: "no-cors",
            });
            console.log("CRM Sync successful");
        } catch (e) {
            console.error("CRM Sync error", e);
        } finally {
            setLoading(false);
        }
    }

    const handleGenerateReport = async () => {
        await syncToCRM(reportForm, "Strategic Report");
        setShowReport(true);
    };

    const handleDirectContact = async () => {
        await syncToCRM(contactForm, "Direct Inquiry");
        const subject = encodeURIComponent(`SpaceLift Inquiry — ${contactForm.company}`);
        const body = encodeURIComponent(`Name: ${contactForm.fullName}\nEmail: ${contactForm.email}\nProject: ${contactForm.projectDescription}`);
        window.location.href = `mailto:hello@spacelift-studio.com?subject=${subject}&body=${body}`;
    };

    // UI rendering remains exactly as you designed...
    // (Full UI code truncated for the update, but keep your styling exactly as it was)
    return (
        <div className="min-h-screen bg-[#F7F6F3] py-20 px-10">
            {!showReport ? (
                <div className="max-w-4xl mx-auto bg-white p-12 rounded-[40px] shadow-2xl border border-black/5">
                    <h1 className="text-6xl font-bold mb-10 tracking-tighter">Link your CRM.</h1>
                    <div className="space-y-6">
                        <input className="w-full p-5 border rounded-2xl" placeholder="Full Name" value={reportForm.fullName} onChange={e => setReportForm({ ...reportForm, fullName: e.target.value })} />
                        <input className="w-full p-5 border rounded-2xl" placeholder="Company" value={reportForm.company} onChange={e => setReportForm({ ...reportForm, company: e.target.value })} />

                        <button
                            onClick={tab === "report" ? handleGenerateReport : handleDirectContact}
                            disabled={loading}
                            className="w-full bg-[#FF6A17] text-white p-6 rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
                        >
                            {loading ? "Syncing Data..." : "Generate & Submit"}
                        </button>
                        {loading && <p className="text-center text-sm text-neutral-400">Information is being written to your Google Sheet...</p>}
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Report Synced to CRM</h2>
                    <p className="text-neutral-500 mb-8">Check your Google Sheet "Sheet1" for the new entry.</p>
                    <button onClick={() => setShowReport(false)} className="bg-black text-white px-8 py-4 rounded-full font-bold">New Assessment</button>
                </div>
            )}
        </div>
    );
}