'use client';
import { motion } from 'framer-motion';
import SafeImage from "../components/SafeImage";
import Button from '../components/Button';

const Hero = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <section className="relative min-h-[90vh] lg:h-screen flex items-center bg-white pt-32 pb-20 overflow-hidden">
            {/* Premium Background Element */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,107,0,0.03),transparent)] pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center space-x-3 text-xs font-black tracking-[0.3em] text-brand-orange uppercase"
                    >
                        <span className="w-12 h-[2px] bg-brand-orange" />
                        <span>Manufacturing Authority</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-brand-dark"
                    >
                        {title.split('.').map((part, i) => (
                            <span key={i} className="block">
                                {part}{part.includes('.') ? '' : '.'}
                            </span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-xl text-gray-500 max-w-xl leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-6"
                    >
                        <Button size="lg" href="/contact" className="shadow-2xl shadow-brand-orange/20">
                            START PROJECT DISCUSSION
                        </Button>
                        <Button variant="outline" size="lg" href="#solutions" className="backdrop-blur-sm">
                            VIEW CAPABILITIES
                        </Button>
                    </motion.div>
                </div>

                {/* Cinematic Media Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: 40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5 relative group"
                >
                    <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <SafeImage
                                src="/images/hero.png"
                                alt="SpaceLift Studio Branded Environment"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Premium Gradient Overlays */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute inset-0 ring-inset ring-1 ring-white/10" />

                        {/* Interactive Element */}
                        <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between pointer-events-none">
                            <div className="text-white/80 text-[10px] font-bold tracking-widest uppercase bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                Global Execution
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border border-brand-orange/10 rounded-2xl" />
                    <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-brand-orange/5 blur-3xl rounded-full" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
