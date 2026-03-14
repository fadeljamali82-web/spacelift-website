"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Briefcase,
    Building2,
    Check,
    ClipboardList,
    Hotel,
    Store,
} from "lucide-react";

type PathTab = "assessment" | "contact";
type Industry = "hospitality" | "corporate" | "venue" | "retail" | "not-sure";
type ProjectType = "hospitality" | "corporate" | "venue" | "retail" | "other";
type EnvironmentSize =
    | "single-space"
    | "multi-zone"
    | "large-site"
    | "multi-location";
type Condition =
    | "outdated"
    | "generic"
    | "inconsistent"
    | "strong-but-limited";
type Goal = "refresh" | "brand" | "experience" | "full-upgrade";
type Rollout = "single" | "phased" | "multi-site" | "not-sure";

type AssessmentState = {
    industry: Industry | "";
    size: EnvironmentSize | "";
    condition: Condition | "";
    goal: Goal | "";
    rollout: Rollout | "";
    perspective: string;
    fullName: string;
    company: string;
    email: string;
};

type ContactState = {
    fullName: string;
    company: string;
    email: string;
    phone: string;
    projectType: ProjectType | "";
    projectDescription: string;
};

const assessmentInitial: AssessmentState = {
    industry: "",
    size: "",
    condition: "",
    goal: "",
    rollout: "",
    perspective: "",
    fullName: "",
    company: "",
    email: "",
};

const contactInitial: ContactState = {
    fullName: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    projectDescription: "",
};

const ORANGE = "#FF6A17";
const PANEL = "#F3EDE8";
const TEXT = "#111111";
const MUTED = "#6B6B6B";
const BORDER = "#DDD6CE";
const SOFT_BG = "#F7F6F3";

const assessmentQuestions = [
    {
        key: "industry",
        stepLabel: "STEP 1 OF 6",
        title: "What industry best fits your business?",
        subtitle: "Select the primary environment category you focus on.",
        options: [
            { value: "hospitality", label: "Hospitality", icon: Hotel },
            { value: "corporate", label: "Corporate", icon: Briefcase },
            { value: "venue", label: "Venue / Events", icon: Building2 },
            { value: "retail", label: "Retail Environment", icon: Store },
            { value: "not-sure", label: "Not sure", icon: ClipboardList },
        ],
    },
    {
        key: "size",
        stepLabel: "STEP 2 OF 6",
        title: "How broad is the environment scope today?",
        subtitle:
            "This helps us understand whether the opportunity is localized or system-wide.",
        options: [
            { value: "single-space", label: "Single space or zone" },
            { value: "multi-zone", label: "Multiple zones in one site" },
            { value: "large-site", label: "Large environment / campus" },
            { value: "multi-location", label: "Multiple locations" },
        ],
    },
    {
        key: "condition",
        stepLabel: "STEP 3 OF 6",
        title: "How would you describe the environment today?",
        subtitle: "Choose the closest description.",
        options: [
            { value: "outdated", label: "Functional but outdated" },
            { value: "generic", label: "Clean but generic" },
            { value: "inconsistent", label: "Designed but inconsistent" },
            { value: "strong-but-limited", label: "Strong base, limited impact" },
        ],
    },
    {
        key: "goal",
        stepLabel: "STEP 4 OF 6",
        title: "What does the environment most need to achieve?",
        subtitle: "Pick the outcome that matters most right now.",
        options: [
            { value: "refresh", label: "Refresh the appearance" },
            { value: "brand", label: "Strengthen brand presence" },
            { value: "experience", label: "Improve visitor experience" },
            { value: "full-upgrade", label: "Support a broader upgrade" },
        ],
    },
    {
        key: "rollout",
        stepLabel: "STEP 5 OF 6",
        title: "How might this move forward if it proves successful?",
        subtitle: "This helps frame rollout logic and long-term fit.",
        options: [
            { value: "single", label: "Single project" },
            { value: "phased", label: "Phased implementation" },
            { value: "multi-site", label: "Multi-site rollout" },
            { value: "not-sure", label: "Still determining" },
        ],
    },
] as const;

function scoreAssessment(a: AssessmentState) {
    const map = {
        industry: {
            hospitality: 22,
            corporate: 22,
            venue: 22,
            retail: 20,
            "not-sure": 10,
        },
        size: {
            "single-space": 8,
            "multi-zone": 14,
            "large-site": 20,
            "multi-location": 25,
        },
        condition: {
            outdated: 14,
            generic: 12,
            inconsistent: 16,
            "strong-but-limited": 10,
        },
        goal: {
            refresh: 8,
            brand: 14,
            experience: 12,
            "full-upgrade": 20,
        },
        rollout: {
            single: 6,
            phased: 14,
            "multi-site": 20,
            "not-sure": 8,
        },
    } as const;

    const perspectiveBonus =
        a.perspective.trim().length > 140
            ? 8
            : a.perspective.trim().length > 60
                ? 5
                : 0;

    const total =
        (a.industry ? map.industry[a.industry] : 0) +
        (a.size ? map.size[a.size] : 0) +
        (a.condition ? map.condition[a.condition] : 0) +
        (a.goal ? map.goal[a.goal] : 0) +
        (a.rollout ? map.rollout[a.rollout] : 0) +
        perspectiveBonus;

    if (total >= 68) return { total, status: "Potentially aligned" };
    if (total >= 45) return { total, status: "Needs review" };
    return { total, status: "May not align currently" };
}

function InfoCard({ title, body }: { title: string; body: string }) {
    return (
        <div
            className="rounded-[22px] p-6 shadow-sm"
            style={{
                background:
                    "radial-gradient(circle at top left, rgba(255,106,23,0.10), transparent 28%), linear-gradient(135deg, #1a1b1f 0%, #2a2a2d 100%)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            <div className="text-[15px] font-semibold leading-6 text-[#FFB184]">
                {title}
            </div>
            <div className="mt-3 text-[15px] leading-7 text-white/80">{body}</div>
        </div>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="mb-2 text-[12px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: MUTED }}
        >
            {children}
        </div>
    );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none transition placeholder:text-[#9A9A9A] ${props.className || ""}`}
            style={{ borderColor: BORDER, color: TEXT }}
        />
    );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={`w-full rounded-[18px] border bg-white px-5 py-4 text-[18px] outline-none transition placeholder:text-[#9A9A9A] ${props.className || ""}`}
            style={{ borderColor: BORDER, color: TEXT }}
        />
    );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={`h-14 w-full rounded-[18px] border bg-white px-5 text-[18px] outline-none transition ${props.className || ""}`}
            style={{ borderColor: BORDER, color: TEXT }}
        />
    );
}

export default function ContactPage() {
    const [tab, setTab] = useState<PathTab>("assessment");
    const [assessmentStep, setAssessmentStep] = useState(0);
    const [assessment, setAssessment] =
        useState<AssessmentState>(assessmentInitial);
    const [contact, setContact] = useState<ContactState>(contactInitial);
    const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const [loadingAssessment, setLoadingAssessment] = useState(false);
    const [loadingContact, setLoadingContact] = useState(false);

    const isUnlockStep = assessmentStep === 5;
    const result = useMemo(() => scoreAssessment(assessment), [assessment]);

    const canContinueAssessment = useMemo(() => {
        if (assessmentStep < 5) {
            const key = assessmentQuestions[assessmentStep]
                .key as keyof AssessmentState;
            return Boolean(assessment[key]);
        }

        return Boolean(
            assessment.fullName && assessment.company && assessment.email,
        );
    }, [assessment, assessmentStep]);

    const currentQuestion =
        assessmentQuestions[Math.min(assessmentStep, assessmentQuestions.length - 1)];

    const startOver = () => {
        setAssessment(assessmentInitial);
        setAssessmentStep(0);
        setAssessmentSubmitted(false);
    };

    const handleAssessmentSubmit = async () => {
        setLoadingAssessment(true);

        try {
            await fetch("/api/generate-report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "assessment",
                    name: assessment.fullName,
                    email: assessment.email,
                    company: assessment.company,
                    industry: assessment.industry,
                    environment: `Environment size: ${assessment.size}
Current condition: ${assessment.condition}
Goal: ${assessment.goal}
Rollout: ${assessment.rollout}
Perspective: ${assessment.perspective}`,
                    goals: assessment.goal,
                }),
            });

            setAssessmentSubmitted(true);
        } catch (error) {
            alert("Something went wrong while preparing the report.");
        } finally {
            setLoadingAssessment(false);
        }
    };

    const handleContactSubmit = async () => {
        setLoadingContact(true);

        try {
            await fetch("/api/generate-report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "contact",
                    name: contact.fullName,
                    email: contact.email,
                    company: contact.company,
                    industry: contact.projectType,
                    environment: contact.projectDescription,
                    goals: contact.projectDescription,
                    phone: contact.phone,
                }),
            });

            setContactSubmitted(true);
        } catch (error) {
            alert("Something went wrong while sending the request.");
        } finally {
            setLoadingContact(false);
        }
    };

    return (
        <div className="min-h-screen" style={{ background: SOFT_BG, color: TEXT }}>
            <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-8 lg:px-12 lg:py-16">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 xl:gap-16">
                    <div className="pt-2 lg:pt-6">
                        <div
                            className="mb-8 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.26em]"
                            style={{ color: ORANGE }}
                        >
                            <span
                                className="inline-block h-px w-10"
                                style={{ background: ORANGE }}
                            />
                            Project fit & insight check
                        </div>

                        <h1 className="max-w-[680px] text-[54px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[64px] lg:text-[82px] xl:text-[92px]">
                            Start with the path that fits the project.
                        </h1>

                        <p
                            className="mt-8 max-w-[700px] text-[22px] leading-[1.65]"
                            style={{ color: MUTED }}
                        >
                            You can either complete a short project fit and insight check or
                            contact SpaceLift directly if you already have a live opportunity
                            in mind.
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
                            <InfoCard
                                title="Short strategic perspective"
                                body="Gain insight into your environment."
                            />
                            <InfoCard
                                title="Environment fit review"
                                body="See whether the opportunity aligns with our work."
                            />
                            <InfoCard
                                title="Clear next step"
                                body="Determine the logical path forward."
                            />
                        </div>
                    </div>

                    <div>
                        <div
                            className="rounded-[34px] p-5 shadow-[0_24px_80px_rgba(17,17,17,0.08)] md:p-7 lg:p-8"
                            style={{
                                background: PANEL,
                                border: "1px solid rgba(17,17,17,0.04)",
                            }}
                        >
                            <h2 className="text-[40px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">
                                Choose how you’d like to begin.
                            </h2>
                            <p
                                className="mt-4 max-w-[760px] text-[19px] leading-[1.6]"
                                style={{ color: MUTED }}
                            >
                                Use the assessment if you’d like a short perspective first. Use
                                direct contact if you’re ready to discuss the project now.
                            </p>

                            <div
                                className="mt-8 overflow-hidden rounded-[24px] border"
                                style={{
                                    borderColor: BORDER,
                                    background: "rgba(255,255,255,0.55)",
                                }}
                            >
                                <div
                                    className="grid grid-cols-2 gap-0 border-b"
                                    style={{ borderColor: BORDER }}
                                >
                                    <button
                                        onClick={() => setTab("assessment")}
                                        className="px-4 py-5 text-center text-[18px] font-semibold transition"
                                        style={{
                                            background: tab === "assessment" ? "white" : "transparent",
                                            color: TEXT,
                                            boxShadow:
                                                tab === "assessment"
                                                    ? `inset 0 -3px 0 ${ORANGE}`
                                                    : "none",
                                        }}
                                    >
                                        Project Fit & Insight Check
                                    </button>
                                    <button
                                        onClick={() => setTab("contact")}
                                        className="px-4 py-5 text-center text-[18px] font-semibold transition"
                                        style={{
                                            background: tab === "contact" ? "white" : "transparent",
                                            color: TEXT,
                                            boxShadow:
                                                tab === "contact" ? `inset 0 -3px 0 ${ORANGE}` : "none",
                                        }}
                                    >
                                        Contact SpaceLift Directly
                                    </button>
                                </div>

                                <div className="bg-white p-5 md:p-7 lg:p-8">
                                    <AnimatePresence mode="wait">
                                        {tab === "assessment" ? (
                                            <motion.div
                                                key="assessment"
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -12 }}
                                                transition={{ duration: 0.22 }}
                                            >
                                                {!assessmentSubmitted ? (
                                                    <>
                                                        {!isUnlockStep ? (
                                                            <>
                                                                <div className="mb-6 flex items-center gap-4">
                                                                    <div
                                                                        className="text-[14px] font-semibold uppercase tracking-[0.24em]"
                                                                        style={{ color: ORANGE }}
                                                                    >
                                                                        {currentQuestion.stepLabel}
                                                                    </div>
                                                                    <div
                                                                        className="h-px w-20"
                                                                        style={{ background: BORDER }}
                                                                    />
                                                                </div>

                                                                <h3 className="max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">
                                                                    {currentQuestion.title}
                                                                </h3>
                                                                <p
                                                                    className="mt-3 text-[20px] leading-[1.55]"
                                                                    style={{ color: MUTED }}
                                                                >
                                                                    {currentQuestion.subtitle}
                                                                </p>

                                                                <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                                                    {currentQuestion.options.map((option) => {
                                                                        const selected =
                                                                            assessment[
                                                                            currentQuestion.key as keyof AssessmentState
                                                                            ] === option.value;
                                                                        const Icon =
                                                                            option.icon as React.ComponentType<{
                                                                                className?: string;
                                                                                style?: React.CSSProperties;
                                                                            }>;

                                                                        return (
                                                                            <button
                                                                                key={option.value}
                                                                                onClick={() =>
                                                                                    setAssessment((prev) => ({
                                                                                        ...prev,
                                                                                        [currentQuestion.key]: option.value,
                                                                                    }))
                                                                                }
                                                                                className="flex min-h-[72px] items-center justify-between gap-3 rounded-[18px] border px-5 py-4 text-left transition"
                                                                                style={{
                                                                                    borderColor: selected ? ORANGE : BORDER,
                                                                                    background: selected
                                                                                        ? "rgba(255,106,23,0.06)"
                                                                                        : "white",
                                                                                }}
                                                                            >
                                                                                <div className="flex items-center gap-3">
                                                                                    {Icon ? (
                                                                                        <Icon
                                                                                            className="h-5 w-5"
                                                                                            style={{
                                                                                                color: selected ? ORANGE : TEXT,
                                                                                            }}
                                                                                        />
                                                                                    ) : null}
                                                                                    <span className="text-[17px] font-medium leading-6">
                                                                                        {option.label}
                                                                                    </span>
                                                                                </div>
                                                                                {selected ? (
                                                                                    <Check
                                                                                        className="h-5 w-5"
                                                                                        style={{ color: ORANGE }}
                                                                                    />
                                                                                ) : null}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>

                                                                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                                    <button
                                                                        onClick={() =>
                                                                            setAssessmentStep((s) => Math.max(0, s - 1))
                                                                        }
                                                                        className="inline-flex h-14 items-center gap-2 rounded-[18px] border px-5 text-[17px] font-medium disabled:opacity-40"
                                                                        style={{
                                                                            borderColor: BORDER,
                                                                            color: MUTED,
                                                                        }}
                                                                        disabled={assessmentStep === 0}
                                                                    >
                                                                        <ArrowLeft className="h-4 w-4" />
                                                                        Back
                                                                    </button>

                                                                    <button
                                                                        onClick={() =>
                                                                            setAssessmentStep((s) => s + 1)
                                                                        }
                                                                        disabled={!canContinueAssessment}
                                                                        className="inline-flex h-14 items-center gap-2 rounded-[18px] px-6 text-[17px] font-semibold text-white transition disabled:opacity-40"
                                                                        style={{ background: ORANGE }}
                                                                    >
                                                                        Continue
                                                                        <ArrowRight className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="mb-6 flex items-center gap-4">
                                                                    <div
                                                                        className="text-[14px] font-semibold uppercase tracking-[0.24em]"
                                                                        style={{ color: ORANGE }}
                                                                    >
                                                                        STEP 6 OF 6
                                                                    </div>
                                                                    <div
                                                                        className="h-px w-20"
                                                                        style={{ background: BORDER }}
                                                                    />
                                                                </div>

                                                                <h3 className="max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">
                                                                    Unlock your short strategic perspective.
                                                                </h3>
                                                                <p
                                                                    className="mt-3 text-[20px] leading-[1.55]"
                                                                    style={{ color: MUTED }}
                                                                >
                                                                    Add your details below and share any short
                                                                    context you think matters.
                                                                </p>

                                                                <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                                    <div>
                                                                        <FieldLabel>Full name</FieldLabel>
                                                                        <TextInput
                                                                            placeholder="Your Name"
                                                                            value={assessment.fullName}
                                                                            onChange={(e) =>
                                                                                setAssessment((p) => ({
                                                                                    ...p,
                                                                                    fullName: e.target.value,
                                                                                }))
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <FieldLabel>Company</FieldLabel>
                                                                        <TextInput
                                                                            placeholder="Company Name"
                                                                            value={assessment.company}
                                                                            onChange={(e) =>
                                                                                setAssessment((p) => ({
                                                                                    ...p,
                                                                                    company: e.target.value,
                                                                                }))
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="md:col-span-2">
                                                                        <FieldLabel>Email</FieldLabel>
                                                                        <TextInput
                                                                            placeholder="you@company.com"
                                                                            type="email"
                                                                            value={assessment.email}
                                                                            onChange={(e) =>
                                                                                setAssessment((p) => ({
                                                                                    ...p,
                                                                                    email: e.target.value,
                                                                                }))
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="md:col-span-2">
                                                                        <FieldLabel>Your perspective</FieldLabel>
                                                                        <Textarea
                                                                            rows={5}
                                                                            placeholder="Tell us anything helpful about the environment, pressure points, timeline, or what you think the space needs."
                                                                            value={assessment.perspective}
                                                                            onChange={(e) =>
                                                                                setAssessment((p) => ({
                                                                                    ...p,
                                                                                    perspective: e.target.value,
                                                                                }))
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                                    <button
                                                                        onClick={() =>
                                                                            setAssessmentStep(assessmentStep - 1)
                                                                        }
                                                                        className="inline-flex h-14 items-center gap-2 rounded-[18px] border px-5 text-[17px] font-medium"
                                                                        style={{
                                                                            borderColor: BORDER,
                                                                            color: MUTED,
                                                                        }}
                                                                    >
                                                                        <ArrowLeft className="h-4 w-4" />
                                                                        Back
                                                                    </button>

                                                                    <button
                                                                        onClick={handleAssessmentSubmit}
                                                                        disabled={!canContinueAssessment || loadingAssessment}
                                                                        className="inline-flex h-14 items-center gap-2 rounded-[18px] px-6 text-[17px] font-semibold text-white transition disabled:opacity-40"
                                                                        style={{ background: ORANGE }}
                                                                    >
                                                                        {loadingAssessment
                                                                            ? "Preparing..."
                                                                            : "Unlock Perspective"}
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                        <div
                                                            className="text-[14px] font-semibold uppercase tracking-[0.24em]"
                                                            style={{ color: ORANGE }}
                                                        >
                                                            Assessment received
                                                        </div>
                                                        <h3 className="mt-4 text-[36px] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[44px]">
                                                            Your request is in.
                                                        </h3>
                                                        <p
                                                            className="mt-4 text-[20px] leading-[1.55]"
                                                            style={{ color: MUTED }}
                                                        >
                                                            Your short premium memo is being prepared and will
                                                            arrive by email shortly.
                                                        </p>

                                                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                                                            <div
                                                                className="rounded-[18px] border p-5"
                                                                style={{ borderColor: BORDER }}
                                                            >
                                                                <div
                                                                    className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                                                                    style={{ color: MUTED }}
                                                                >
                                                                    Initial status
                                                                </div>
                                                                <div className="mt-3 text-[22px] font-semibold">
                                                                    {result.status}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="rounded-[18px] border p-5"
                                                                style={{ borderColor: BORDER }}
                                                            >
                                                                <div
                                                                    className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                                                                    style={{ color: MUTED }}
                                                                >
                                                                    Environment category
                                                                </div>
                                                                <div className="mt-3 text-[22px] font-semibold">
                                                                    {assessment.industry || "Not specified"}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="mt-8 rounded-[18px] border p-5"
                                                            style={{ borderColor: BORDER }}
                                                        >
                                                            <div
                                                                className="text-[12px] font-semibold uppercase tracking-[0.24em]"
                                                                style={{ color: MUTED }}
                                                            >
                                                                Short perspective
                                                            </div>
                                                            <p
                                                                className="mt-3 text-[18px] leading-[1.7]"
                                                                style={{ color: MUTED }}
                                                            >
                                                                Based on what you shared, this looks like an
                                                                environment that may benefit from clearer
                                                                coordination, stronger physical brand alignment,
                                                                and a more structured path from concept to
                                                                rollout.
                                                            </p>
                                                        </div>

                                                        <div className="mt-8 flex flex-wrap gap-3">
                                                            <button
                                                                onClick={startOver}
                                                                className="inline-flex h-14 items-center rounded-[18px] border px-5 text-[17px] font-medium"
                                                                style={{
                                                                    borderColor: BORDER,
                                                                    color: MUTED,
                                                                }}
                                                            >
                                                                Start again
                                                            </button>
                                                            <a
                                                                href="mailto:hello@spacelift-studio.com"
                                                                className="inline-flex h-14 items-center rounded-[18px] px-6 text-[17px] font-semibold text-white"
                                                                style={{ background: ORANGE }}
                                                            >
                                                                Contact SpaceLift
                                                            </a>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="contact"
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -12 }}
                                                transition={{ duration: 0.22 }}
                                            >
                                                {!contactSubmitted ? (
                                                    <>
                                                        <div className="mb-6 flex items-center gap-4">
                                                            <div
                                                                className="text-[14px] font-semibold uppercase tracking-[0.24em]"
                                                                style={{ color: ORANGE }}
                                                            >
                                                                Project brief
                                                            </div>
                                                            <div
                                                                className="h-px w-20"
                                                                style={{ background: BORDER }}
                                                            />
                                                        </div>

                                                        <h3 className="max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">
                                                            Tell us what the environment needs to achieve.
                                                        </h3>
                                                        <p
                                                            className="mt-3 text-[20px] leading-[1.55]"
                                                            style={{ color: MUTED }}
                                                        >
                                                            The more clearly we understand the environment, the
                                                            pressure points, the timeline, and the surfaces
                                                            involved, the better we can guide the path forward.
                                                        </p>

                                                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                                                            <div>
                                                                <FieldLabel>Full name</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Your Name"
                                                                    value={contact.fullName}
                                                                    onChange={(e) =>
                                                                        setContact((p) => ({
                                                                            ...p,
                                                                            fullName: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <FieldLabel>Company</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Company Name"
                                                                    value={contact.company}
                                                                    onChange={(e) =>
                                                                        setContact((p) => ({
                                                                            ...p,
                                                                            company: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <FieldLabel>Email</FieldLabel>
                                                                <TextInput
                                                                    placeholder="you@company.com"
                                                                    type="email"
                                                                    value={contact.email}
                                                                    onChange={(e) =>
                                                                        setContact((p) => ({
                                                                            ...p,
                                                                            email: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <FieldLabel>Phone</FieldLabel>
                                                                <TextInput
                                                                    placeholder="Optional"
                                                                    value={contact.phone}
                                                                    onChange={(e) =>
                                                                        setContact((p) => ({
                                                                            ...p,
                                                                            phone: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Project type</FieldLabel>
                                                                <Select
                                                                    value={contact.projectType}
                                                                    onChange={(e) =>
                                                                        setContact((p) => ({
                                                                            ...p,
                                                                            projectType: e.target.value as ProjectType,
                                                                        }))
                                                                    }
                                                                >
                                                                    <option value="">Select Project Type</option>
                                                                    <option value="hospitality">
                                                                        Hospitality environment
                                                                    </option>
                                                                    <option value="corporate">
                                                                        Corporate / workplace
                                                                    </option>
                                                                    <option value="venue">
                                                                        Venue / event environment
                                                                    </option>
                                                                    <option value="retail">
                                                                        Retail environment
                                                                    </option>
                                                                    <option value="other">Other</option>
                                                                </Select>
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <FieldLabel>Project description</FieldLabel>
                                                                <Textarea
                                                                    rows={5}
                                                                    placeholder="Tell us about the environment, surfaces involved, project scale, timeline, and what kind of support you need."
                                                                    value={contact.projectDescription}
                                                                    onChange={(e) =>
                                                                        setContact((p) => ({
                                                                            ...p,
                                                                            projectDescription: e.target.value,
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mt-10">
                                                            <button
                                                                onClick={handleContactSubmit}
                                                                disabled={
                                                                    !contact.fullName ||
                                                                    !contact.company ||
                                                                    !contact.email ||
                                                                    !contact.projectType ||
                                                                    !contact.projectDescription ||
                                                                    loadingContact
                                                                }
                                                                className="inline-flex h-14 w-full items-center justify-center rounded-[18px] px-6 text-[17px] font-semibold text-white transition disabled:opacity-40"
                                                                style={{ background: ORANGE }}
                                                            >
                                                                {loadingContact
                                                                    ? "Sending..."
                                                                    : "Request a Conversation"}
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                        <div
                                                            className="text-[14px] font-semibold uppercase tracking-[0.24em]"
                                                            style={{ color: ORANGE }}
                                                        >
                                                            Request received
                                                        </div>
                                                        <h3 className="mt-4 text-[36px] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[44px]">
                                                            We’ve got your project brief.
                                                        </h3>
                                                        <p
                                                            className="mt-4 text-[20px] leading-[1.55]"
                                                            style={{ color: MUTED }}
                                                        >
                                                            Your request has been sent. We’ll review the
                                                            details and follow up by email.
                                                        </p>

                                                        <div className="mt-8 flex flex-wrap gap-3">
                                                            <button
                                                                onClick={() => {
                                                                    setContact(contactInitial);
                                                                    setContactSubmitted(false);
                                                                }}
                                                                className="inline-flex h-14 items-center rounded-[18px] border px-5 text-[17px] font-medium"
                                                                style={{
                                                                    borderColor: BORDER,
                                                                    color: MUTED,
                                                                }}
                                                            >
                                                                Reset form
                                                            </button>
                                                            <a
                                                                href="mailto:hello@spacelift-studio.com"
                                                                className="inline-flex h-14 items-center rounded-[18px] px-6 text-[17px] font-semibold text-white"
                                                                style={{ background: ORANGE }}
                                                            >
                                                                Email SpaceLift
                                                            </a>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}