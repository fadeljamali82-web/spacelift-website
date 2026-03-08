"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const SOLUTIONS = [
    {
        id: "consultation",
        eyebrow: "STRATEGIC CONSULTATION",
        title: "Strategic Surface and Environment Consultation",
        image: "/images/solutions-dsm.png",
        description:
            "We help define the right execution path before production begins, aligning environment goals, material direction, technical constraints, and rollout logic into a clearer project strategy.",
        bullets: [
            "Surface and environment planning",
            "Material and application guidance",
            "Technical feasibility direction",
            "Project structure and rollout logic",
        ],
    },
    {
        id: "translation",
        eyebrow: "DESIGN TRANSLATION",
        title: "Design and Technical Translation",
        image: "/images/solutions-exfab.png",
        description:
            "We translate creative intent into manufacturable, install-ready systems that preserve visual quality while resolving the physical realities of scale, finish, dimensional control, and deployment.",
        bullets: [
            "Design-to-manufacturing adaptation",
            "Material-aware layout preparation",
            "Execution-ready file and spec alignment",
            "Install sequence and application logic",
        ],
    },
    {
        id: "manufacturing",
        eyebrow: "PRODUCTION EXECUTION",
        title: "Manufacturing and Production Execution",
        image: "/images/solutions-lfp.png",
        description:
            "This is where strategy becomes physical. SpaceLift coordinates premium multi-surface production with disciplined finish control, scalable output quality, and systems built for real-world performance.",
        bullets: [
            "Digital surface manufacturing",
            "Architectural-grade visual output",
            "Precision finishing and quality control",
            "Install-ready modular production systems",
        ],
    },
    {
        id: "rollout",
        eyebrow: "ROLL OUT SUPPORT",
        title: "Logistics, Rollout, and Install Coordination",
        image: "/images/trust-wall.png",
        description:
            "We do not stop at output. We help structure packaging, sequencing, delivery, and install coordination so the final environment arrives with greater clarity, less friction, and stronger execution confidence.",
        bullets: [
            "Packaging and sequencing logic",
            "Direct-to-site coordination",
            "Install partner support",
            "Phased rollout and deployment clarity",
        ],
    },
];

export default function SolutionsPage() {
    const [open, setOpen] = useState<string[]>([]);

    const toggle = (id: string) => {
        setOpen((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24">
                <div className="mb-12 max-w-[980px] md:mb-16">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-[#f97316] md:w-10" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                            SOLUTIONS
                        </span>
                    </div>

                    <h1 className="text-[40px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:text-[60px] lg:text-[78px]">
                        A Structured System for Complex Physical Environments.
                    </h1>

                    <p className="mt-6 max-w-[860px] text-[16px] leading-7 text-[#5f6672] md:mt-8 md:text-[18px] md:leading-8 lg:text-[20px]">
                        SpaceLift Studio is built as a one-stop execution partner, not a
                        disconnected vendor chain. Our solution set combines strategic
                        consultation, design-aware technical translation, manufacturing
                        depth, and rollout coordination to help branded environments move
                        from concept to delivery with greater clarity and control.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:gap-10 xl:grid-cols-2 xl:gap-12">
                    {SOLUTIONS.map((item) => {
                        const isOpen = open.includes(item.id);

                        return (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-[24px] bg-neutral-900 text-white shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:rounded-[28px]"
                            >
                                <div className="relative h-[340px] overflow-hidden sm:h-[400px] md:h-[440px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className={`object-cover transition-transform duration-700 ease-out ${isOpen ? "scale-105" : "scale-100"
                                            }`}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                                    <div className="absolute bottom-6 left-6 right-6 z-10 md:bottom-8 md:left-8 md:right-8">
                                        <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-orange-500 md:text-xs md:tracking-widest">
                                            {item.eyebrow}
                                        </p>

                                        <h3 className="mb-3 text-[28px] font-semibold leading-tight md:text-3xl">
                                            {item.title}
                                        </h3>

                                        <p className="mb-5 max-w-[560px] text-sm leading-6 text-neutral-300 md:mb-6">
                                            {item.description}
                                        </p>

                                        <button
                                            onClick={() => toggle(item.id)}
                                            className="flex min-h-[44px] items-center gap-3 text-left text-[12px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-orange-500 md:text-sm md:tracking-wider"
                                            aria-expanded={isOpen}
                                            aria-controls={`solution-panel-${item.id}`}
                                        >
                                            View Scope
                                            <ChevronDown
                                                size={18}
                                                className={`transition-transform duration-500 ${isOpen ? "rotate-180 text-orange-500" : ""
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    id={`solution-panel-${item.id}`}
                                    className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="bg-black/95 px-6 py-8 backdrop-blur-md md:px-8 md:py-10">
                                        <ul className="space-y-4 text-sm leading-6 text-neutral-300">
                                            {item.bullets.map((point, i) => (
                                                <li
                                                    key={i}
                                                    className={`transform transition-all duration-500 ${isOpen
                                                            ? "translate-y-0 opacity-100"
                                                            : "translate-y-4 opacity-0"
                                                        }`}
                                                    style={{ transitionDelay: `${i * 80}ms` }}
                                                >
                                                    <span className="mr-2 text-orange-500">•</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}