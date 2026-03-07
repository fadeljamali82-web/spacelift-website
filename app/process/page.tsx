"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Layers, PenTool, Factory, Package, Rocket } from "lucide-react";

const CARDS = [
    {
        image: "/images/capability-color-managed-production.png",
        title: "Color Managed Production",
        description:
            "Precision-controlled color workflows ensure consistency across every surface and rollout.",
    },
    {
        image: "/images/capability-digital-surface-manufacturing.png",
        title: "Digital Surface Manufacturing",
        description:
            "Architectural-grade printing and fabrication built for durability, scale, and repeatable quality.",
    },
    {
        image: "/images/capability-install-ready-systems.png",
        title: "Install Ready Systems",
        description:
            "Pre-engineered components labeled and sequenced for seamless installation.",
    },
    {
        image: "/images/capability-single-partner-execution.png",
        title: "Single Partner Execution",
        description:
            "One partner managing design, engineering, fabrication, and rollout delivery.",
    },
    {
        image: "/images/capability-spec-driven-projects.png",
        title: "Spec Driven Projects",
        description:
            "Systems aligned with architectural specifications, timelines, and brand standards.",
    },
];

const STEPS = [
    {
        icon: Layers,
        title: "Strategic Discovery",
        description:
            "We align brand standards, architectural constraints, and rollout scale before production begins.",
    },
    {
        icon: PenTool,
        title: "Design & Engineering",
        description:
            "Creative intent is translated into engineered surface systems with fabrication logic built in.",
    },
    {
        icon: Factory,
        title: "Digital Surface Manufacturing",
        description:
            "Controlled workflows ensure architectural-grade output with repeatable quality.",
    },
    {
        icon: Package,
        title: "Install Ready Systems",
        description:
            "Components are labeled, sequenced, and engineered to reduce friction on-site.",
    },
    {
        icon: Rocket,
        title: "Execution & Rollout",
        description:
            "From single-site builds to national programs, systems are built for scalability and durability.",
    },
];

export default function ProcessPage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % CARDS.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#0E0F12] text-white">
            <section className="mx-auto max-w-[1450px] px-6 pt-24 pb-14 md:px-10 md:pt-28 md:pb-16 lg:px-14 lg:pt-32 lg:pb-20">
                <div className="max-w-[980px]">
                    <div className="text-brand-orange text-[10px] font-semibold uppercase tracking-[0.24em] md:text-xs md:tracking-[0.28em]">
                        Our System
                    </div>

                    <h1 className="mt-5 text-[40px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:mt-6 md:text-[60px] lg:text-[78px]">
                        How We Execute
                    </h1>

                    <p className="mt-5 max-w-3xl text-[16px] leading-7 text-white/70 md:mt-6 md:text-[18px] md:leading-8 lg:text-lg">
                        A structured manufacturing workflow built for precision,
                        scalability, and architectural integrity.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-14">
                <div className="relative overflow-hidden rounded-[22px] md:rounded-[28px]">
                    <div
                        className="flex transition-transform duration-700 ease-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {CARDS.map((card, i) => (
                            <div key={i} className="min-w-full">
                                <div className="overflow-hidden rounded-[22px] md:rounded-[28px] bg-white shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        width={1400}
                                        height={700}
                                        className="h-[240px] w-full bg-white object-contain sm:h-[300px] md:h-[380px] lg:h-[420px]"
                                        priority={i === 0}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 flex justify-center gap-2 md:mt-6">
                        {CARDS.map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all ${i === index ? "bg-brand-orange w-6" : "w-2 bg-white/30"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:mt-10">
                        <h2 className="text-[28px] font-bold leading-tight sm:text-[32px] md:text-[40px]">
                            {CARDS[index].title}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-white/70 md:text-[18px] md:leading-8">
                            {CARDS[index].description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1450px] px-6 pt-20 pb-24 md:px-10 md:pt-24 md:pb-28 lg:px-14 lg:pt-28 lg:pb-32">
                <div className="space-y-12 md:space-y-14 lg:space-y-16">
                    {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={i}
                                className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange shadow-lg">
                                    <Icon size={20} />
                                </div>

                                <div>
                                    <h3 className="text-[24px] font-semibold leading-tight md:text-[28px]">
                                        {step.title}
                                    </h3>
                                    <p className="mt-3 max-w-2xl text-[16px] leading-7 text-white/70 md:text-[17px] md:leading-8">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}