'use client';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const CTASection = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <section className="bg-brand-orange py-40 px-6 overflow-hidden relative group">
            {/* Animated Cinematic Background */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20 pointer-events-none"
            >
                <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_20%_30%,white,transparent)]" />
                <div className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(circle_at_80%_70%,white,transparent)]" />
            </motion.div>

            <div className="absolute top-0 right-0 p-12 opacity-5 select-none transition-transform duration-700 group-hover:translate-x-10 group-hover:-translate-y-10">
                <span className="text-[400px] font-black leading-none text-white italic">SL.</span>
            </div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-10 italic leading-[0.9]"
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-white/90 font-medium mb-16 max-w-3xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8"
                >
                    <Button
                        variant="secondary"
                        size="lg"
                        href="/contact"
                        className="bg-white text-brand-orange hover:bg-brand-dark hover:text-white px-12 py-5 shadow-2xl shadow-black/10 transition-all hover:scale-105 active:scale-95"
                    >
                        START PROJECT CONSULTATION
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        href="/contact"
                        className="border-white/40 text-white hover:bg-white/10 hover:border-white px-12 py-5 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                    >
                        CAPABILITIES DECK
                    </Button>
                </motion.div>
            </div>

            {/* Decorative Edge Glow */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </section>
    );
};

export default CTASection;
