'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SafeImage from "../components/SafeImage";

const SolutionsGrid = ({ items, title, subtitle }: { items: any[], title: string, subtitle: string }) => {
    return (
        <section id="solutions" className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black mb-6 tracking-tighter italic"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-500 leading-relaxed font-medium"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="group relative"
                        >
                            <Link href="/solutions" className="block focus:outline-none">
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] group-hover:-translate-y-2 bg-white ring-1 ring-black/5">
                                    {item.image && (
                                        <SafeImage
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    )}

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent p-10 flex flex-col justify-end">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2 text-brand-orange">
                                                <span className="w-8 h-[2px] bg-brand-orange" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Core Capability</span>
                                            </div>
                                            <h3 className="text-3xl font-black text-white italic tracking-tight group-hover:text-brand-orange transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-300 text-sm leading-relaxed max-w-sm opacity-90 group-hover:opacity-100 transition-opacity">
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Action Indicator */}
                                        <div className="mt-10 flex items-center space-x-4">
                                            <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase">Technical Specs</span>
                                            <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center transform transition-transform group-hover:translate-x-3">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glass Edge Highlight */}
                                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionsGrid;
