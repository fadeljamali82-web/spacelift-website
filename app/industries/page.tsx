"use client";

import Image from "next/image";

const INDUSTRIES = [
    {
        id: "corporate",
        eyebrow: "CORPORATE",
        title: "Branded corporate environments with more authority and less visual drift.",
        description:
            "From executive interiors to large-scale workplace branding, we help corporate environments feel more unified, intentional, and technically resolved through digitally manufactured surfaces and architectural-grade visual systems.",
        image: "/images/industries-corporate.png",
        alt: "Corporate branded interior environment",
        theme: "light",
    },
    {
        id: "hospitality",
        eyebrow: "HOSPITALITY",
        title: "Hospitality spaces that carry atmosphere, consistency, and brand presence.",
        description:
            "Hotels, lounges, dining environments, and guest-facing spaces demand a visual language that feels elevated without losing durability. We support hospitality environments through surface systems built for impact, repeatability, and long-term performance.",
        image: "/images/industries-hospitality.png",
        alt: "Hospitality environment with refined branded surfaces",
        theme: "dark",
    },
    {
        id: "cultural",
        eyebrow: "CULTURAL & PUBLIC",
        title: "Public-facing environments that need clarity, durability, and visual cohesion.",
        description:
            "Museums, institutions, public programs, and cultural environments often require solutions that balance storytelling, movement, and architectural sensitivity. We help translate those requirements into controlled physical execution.",
        image: "/images/industries-cultural.png",
        alt: "Cultural or public environment with immersive branded design",
        theme: "light",
    },
    {
        id: "sports",
        eyebrow: "SPORTS & VENUES",
        title: "High-traffic venues built to perform under pressure and still look resolved.",
        description:
            "Arenas, stadium environments, event venues, and high-volume branded spaces need surfaces and systems that can scale, install cleanly, and maintain authority under demanding real-world conditions.",
        image: "/images/industries-sports.png",
        alt: "Sports or large venue branded environment",
        theme: "dark",
    },
];

export default function IndustriesPage() {
    return (
        <main className="bg-[#f6f4ef] text-[#111111]">
            <section className="mx-auto max-w-[1450px] px-6 pt-24 pb-14 md:px-10 md:pt-28 md:pb-16 lg:px-14 lg:pt-32 lg:pb-20">
                <div className="max-w-[980px]">
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-8 bg-[#f97316] md:w-10" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f97316] md:text-[11px] md:tracking-[0.28em]">
                            INDUSTRIES
                        </span>
                    </div>

                    <h1 className="text-[40px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:text-[60px] lg:text-[78px]">
                        Built for Environments Where Brand, Scale, and Execution Must Work Together.
                    </h1>

                    <p className="mt-6 max-w-[860px] text-[16px] leading-7 text-[#5f6672] md:mt-8 md:text-[18px] md:leading-8 lg:text-[20px]">
                        SpaceLift Studio supports industries that require more than attractive visuals alone.
                        We help translate brand systems into physical environments that feel intentional,
                        scalable, and structurally resolved across demanding real-world settings.
                    </p>
                </div>
            </section>

            <section>
                {INDUSTRIES.map((industry, index) => {
                    const isDark = industry.theme === "dark";
                    const reverse = index % 2 === 1;

                    return (
                        <div
                            key={industry.id}
                            className={`relative overflow-hidden ${isDark ? "bg-[#0c0f14] text-white" : "bg-[#f6f4ef] text-[#111111]"
                                }`}
                        >
                            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                                <div
                                    className={`absolute -top-20 ${reverse ? "right-[8%]" : "left-[8%]"
                                        } h-40 w-40 rounded-full blur-3xl md:h-56 md:w-56 ${isDark ? "bg-[#f97316]/10" : "bg-[#f97316]/8"
                                        } animate-pulse`}
                                />
                            </div>

                            <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:py-28">
                                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
                                    <div
                                        className={`lg:col-span-5 ${reverse ? "lg:order-2" : "lg:order-1"
                                            }`}
                                    >
                                        <div className="mb-5 flex items-center gap-4 md:mb-6">
                                            <span className="h-px w-8 md:w-10 bg-[#f97316]" />
                                            <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] md:tracking-[0.28em] text-[#f97316]">
                                                {industry.eyebrow}
                                            </span>
                                        </div>

                                        <h2
                                            className={`max-w-[760px] text-[38px] font-black leading-[0.96] tracking-[-0.05em] sm:text-[46px] md:text-[56px] lg:text-[62px] xl:text-[76px] ${isDark ? "text-white" : "text-[#111111]"
                                                }`}
                                        >
                                            {industry.title}
                                        </h2>

                                        <p
                                            className={`mt-6 md:mt-8 max-w-[700px] text-[16px] leading-7 md:text-[18px] md:leading-8 lg:text-[19px] ${isDark ? "text-white/68" : "text-[#5f6672]"
                                                }`}
                                        >
                                            {industry.description}
                                        </p>
                                    </div>

                                    <div
                                        className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:order-2"
                                            }`}
                                    >
                                        <div
                                            className={`group relative overflow-hidden rounded-[22px] md:rounded-[28px] border ${isDark ? "border-white/10" : "border-black/5"
                                                } bg-black/5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-[4px] hover:shadow-[0_32px_100px_rgba(0,0,0,0.24)]`}
                                        >
                                            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                                            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden">
                                                <Image
                                                    src={industry.image}
                                                    alt={industry.alt}
                                                    fill
                                                    className="object-cover transition duration-700 group-hover:scale-[1.035]"
                                                    priority={index < 2}
                                                />
                                            </div>

                                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />

                                            <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                                                <div className="rounded-full border border-white/15 bg-black/35 px-3 py-2 md:px-4 backdrop-blur-sm transition duration-500 group-hover:translate-x-1">
                                                    <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em] md:tracking-[0.22em] text-white/80">
                                                        Industry {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="absolute right-0 top-0 h-full w-[24%] bg-gradient-to-l from-[#f97316]/8 to-transparent opacity-60 transition duration-500 group-hover:opacity-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </main>
    );
}