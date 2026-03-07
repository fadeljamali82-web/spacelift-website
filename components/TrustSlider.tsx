'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SafeImage from './SafeImage';

const CAPABILITIES = [
    { src: "/images/capability-color-managed-production.png", alt: "Color Managed Production" },
    { src: "/images/capability-digital-surface-manufacturing.png", alt: "Digital Surface Manufacturing" },
    { src: "/images/capability-install-ready-systems.png", alt: "Install Ready Systems" },
    { src: "/images/capability-single-partner-execution.png", alt: "Single Partner Execution" },
    { src: "/images/capability-spec-driven-projects.png", alt: "Spec Driven Projects" }
];

const TrustSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [itemsPerView, setItemsPerView] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setItemsPerView(1);
            else if (window.innerWidth < 1280) setItemsPerView(2);
            else setItemsPerView(3);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % CAPABILITIES.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isPaused) {
            interval = setInterval(nextSlide, 1000);
        }
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const handleDragEnd = (event: any, info: any) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            nextSlide();
        } else if (info.offset.x > threshold) {
            prevSlide();
        }
    };

    return (
        <div
            className="w-full relative py-4 select-none touch-pan-y"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto px-6 overflow-hidden">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 26
                    }}
                    className="flex w-full gap-8"
                >
                    {/* Triple the array for infinite-feeling loop on drag */}
                    {[...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES].map((cap, idx) => {
                        const isCenter = (idx % CAPABILITIES.length) === currentIndex;
                        return (
                            <motion.div
                                key={idx}
                                animate={{
                                    scale: isCenter ? 1.06 : 0.96,
                                    opacity: isCenter ? 1 : 0.85,
                                    y: isCenter ? -6 : 0
                                }}
                                className="relative aspect-[16/9] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.10)]"
                                style={{
                                    flex: `0 0 calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 32 / itemsPerView}px)`
                                }}
                            >
                                <SafeImage
                                    src={cap.src}
                                    alt={cap.alt}
                                    fill
                                    className="object-contain transition-all duration-700 p-8 grayscale-0 group-hover:scale-105"
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            <div className="flex justify-center space-x-4 mt-16">
                {CAPABILITIES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className="group relative flex items-center justify-center p-2"
                        aria-label={`Go to slide ${i + 1}`}
                    >
                        <div className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-10 bg-brand-orange' : 'w-4 bg-gray-200 group-hover:bg-gray-400'}`} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrustSlider;
