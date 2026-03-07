'use client';
import React from 'react';
import { motion } from 'framer-motion';
import TrustSlider from '../components/TrustSlider';

const TrustBar = () => {
    return (
        <section className="relative bg-[#FAFAFA] border-y border-gray-100 py-24 overflow-hidden">
            {/* Subtle Texture Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[10px] uppercase font-black tracking-[0.5em] text-brand-orange mb-16 px-6 text-center"
                >
                    Trusted by National Infrastructure Partners
                </motion.p>
                <TrustSlider />
            </div>
        </section>
    );
};

export default TrustBar;
