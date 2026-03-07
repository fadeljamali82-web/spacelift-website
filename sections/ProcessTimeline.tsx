'use client';
import { motion } from 'framer-motion';

const ProcessTimeline = () => {
    const steps = [
        {
            title: "Design & Engineering",
            desc: "Our technicians translate your brand visual language into a technical fabrication blueprint.",
            tag: "Blueprint"
        },
        {
            title: "Advanced Manufacturing",
            desc: "Using high-speed digital surface manufacturing to engineer the physical canvas of your identity.",
            tag: "Production"
        },
        {
            title: "Quality Integration",
            desc: "Rigorous testing of materials and finishes in our state-of-the-art facility.",
            tag: "Validation"
        },
        {
            title: "National Installation",
            desc: "Flawless deployment and 360-degree logistics handled by our expert infrastructure team.",
            tag: "Deployment"
        }
    ];

    return (
        <section id="process" className="py-32 bg-brand-dark relative overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em] mb-6"
                    >
                        Infrastructure Workflow
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6 italic text-white"
                    >
                        Manufacturing Precision
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-400 font-medium max-w-xl mx-auto"
                    >
                        A systematic approach to engineering physical brand dominance at scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="relative group"
                        >
                            <div className="mb-8 flex items-baseline justify-between select-none">
                                <span className="text-6xl font-black text-white/5 group-hover:text-brand-orange/20 transition-colors italic">
                                    0{i + 1}
                                </span>
                                <span className="text-[10px] font-black text-brand-orange tracking-widest uppercase">
                                    {step.tag}
                                </span>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <h4 className="text-xl font-black tracking-tight text-white uppercase italic group-hover:text-brand-orange transition-colors">
                                    {step.title}
                                </h4>
                                <div className="w-12 h-[2px] bg-brand-orange transform origin-left transition-transform group-hover:scale-x-150" />
                                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessTimeline;
