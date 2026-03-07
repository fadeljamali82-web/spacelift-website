"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const SOLUTIONS = [
    {
        id: "dsm",
        title: "Digital Surface Manufacturing",
        image: "/images/solutions-dsm.png",
        description:
            "Proprietary technical fabrication processes for architectural surfaces with physical depth and texture.",
        bullets: [
            "4K architectural-grade digital surface printing",
            "Material depth simulation & layered texture systems",
            "CNC precision finishing",
            "Install-ready modular panel systems",
        ],
    },
    {
        id: "exfab",
        title: "Experiential Fabrication",
        image: "/images/solutions-exfab.png",
        description:
            "Immersive structural builds and scenic construction for brand activations and corporate environments.",
        bullets: [
            "Immersive structural fabrication",
            "Integrated surface systems",
            "Activation-ready modular builds",
            "Precision engineered installations",
        ],
    },
    {
        id: "lfp",
        title: "Large Format Printing",
        image: "/images/solutions-lfp.png",
        description:
            "National-scale production capacity for venue-wide branding and event-scale visual environments.",
        bullets: [
            "Industrial-scale output",
            "Venue-wide branding systems",
            "Oversized fabric graphics",
            "Color-accurate production control",
        ],
    },
    {
        id: "env",
        title: "Environmental Graphics",
        image: "/images/trust-wall.png",
        description:
            "Authoritative branding systems for corporate interiors, hospitality hubs, and architectural environments.",
        bullets: [
            "Wayfinding & directional systems",
            "Interior branding installations",
            "Architectural surface graphics",
            "Long-term durable applications",
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
                        Technical Capabilities Built for Real Environments.
                    </h1>

                    <p className="mt-6 max-w-[860px] text-[16px] leading-7 text-[#5f6672] md:mt-8 md:text-[18px] md:leading-8 lg:text-[20px]">
                        From digitally manufactured surfaces to experiential builds and
                        large-scale branded graphics, our solution set is designed to bring
                        more structure, control, and production authority to demanding
                        physical environments.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:gap-10 xl:grid-cols-2 xl:gap-12">
                    {SOLUTIONS.map((item) => {
                        const isOpen = open.includes(item.id);

                        return (
                            <div
                                key={item.id}
                                className="overflow-hidden rounded-[24px] md:rounded-[28px] bg-neutral-900 text-white shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
                            >
                                <div className="relative h-[340px] sm:h-[400px] md:h-[440px] overflow-hidden">
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
                                            Core Capability
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
                                            Technical Specs
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