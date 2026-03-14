'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navItems = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Industries', href: '/industries' },
    { name: 'Process', href: '/process' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Strategic Audit', href: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navRef = useRef<HTMLDivElement | null>(null);
    const underlineRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    useEffect(() => {
        const activeLink = navRef.current?.querySelector(
            `a[data-href="${pathname}"]`
        ) as HTMLAnchorElement | null;

        if (activeLink) {
            moveUnderlineToElement(activeLink);
        } else if (underlineRef.current) {
            underlineRef.current.style.opacity = '0';
            underlineRef.current.style.width = '0px';
            underlineRef.current.style.transform = 'translateX(0px)';
        }
    }, [pathname]);

    useEffect(() => {
        const onResize = () => {
            const activeLink = navRef.current?.querySelector(
                `a[data-href="${pathname}"]`
            ) as HTMLAnchorElement | null;

            if (activeLink) {
                moveUnderlineToElement(activeLink);
            }
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [pathname]);

    const moveUnderlineToElement = (element: HTMLElement) => {
        if (!navRef.current || !underlineRef.current) return;

        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = element.getBoundingClientRect();

        underlineRef.current.style.opacity = '1';
        underlineRef.current.style.width = `${linkRect.width}px`;
        underlineRef.current.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        moveUnderlineToElement(e.currentTarget);
    };

    const handleMouseLeaveNav = () => {
        const activeLink = navRef.current?.querySelector(
            `a[data-href="${pathname}"]`
        ) as HTMLAnchorElement | null;

        if (activeLink) {
            moveUnderlineToElement(activeLink);
        }
    };

    const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (window.innerWidth < 1024) return;

        const item = e.currentTarget;
        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    };

    const handleMagneticReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${isScrolled
                        ? 'bg-white/78 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]'
                        : 'bg-white'
                    }`}
            >
                <div className="mx-auto flex h-20 max-w-[1450px] items-center justify-between px-6 md:px-10 lg:px-14">
                    <Link
                        href="/"
                        className="shrink-0 text-[18px] font-black tracking-tight text-black transition-opacity duration-300 hover:opacity-80 sm:text-xl"
                        aria-label="SpaceLift Studio home"
                    >
                        SPACELIFT<span className="text-brand-orange">STUDIO</span>
                    </Link>

                    <div
                        ref={navRef}
                        className="relative hidden items-center gap-6 lg:flex xl:gap-10"
                        onMouseLeave={handleMouseLeaveNav}
                    >
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    data-href={item.href}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseMove={handleMagneticMove}
                                    onMouseLeave={handleMagneticReset}
                                    className={`relative text-sm font-medium transition-all duration-300 ${isActive ? 'text-black' : 'text-black/70 hover:text-black'
                                        }`}
                                >
                                    {item.name}

                                    {isActive && (
                                        <span className="absolute -bottom-3 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-orange shadow-[0_0_16px_rgba(255,115,0,0.55)]" />
                                    )}
                                </Link>
                            );
                        })}

                        <span
                            ref={underlineRef}
                            className="pointer-events-none absolute bottom-0 h-[3px] rounded-full bg-brand-orange transition-all duration-300 ease-out"
                            style={{
                                width: 0,
                                opacity: 0,
                                transform: 'translateX(0px)',
                            }}
                        />
                    </div>

                    <div className="hidden items-center lg:flex">
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center justify-center overflow-hidden rounded-md bg-brand-orange px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(255,115,0,0.28)]"
                        >
                            <span className="relative z-10">Start Project</span>
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-black/10 text-black transition-colors duration-300 hover:bg-black/5 lg:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-navigation"
                    >
                        <div className="flex flex-col gap-1.5">
                            <span
                                className={`block h-[2px] w-5 bg-black transition-all duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                                    }`}
                            />
                            <span
                                className={`block h-[2px] w-5 bg-black transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''
                                    }`}
                            />
                            <span
                                className={`block h-[2px] w-5 bg-black transition-all duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                                    }`}
                            />
                        </div>
                    </button>
                </div>

                <div
                    id="mobile-navigation"
                    className={`overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="mx-auto flex max-w-[1450px] flex-col px-6 py-4 md:px-10">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`border-b border-black/5 py-4 text-base font-medium transition-colors duration-300 ${isActive ? 'text-brand-orange' : 'text-black/75 hover:text-black'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}

                        <Link
                            href="/contact"
                            className="mt-4 inline-flex min-h-[52px] items-center justify-center rounded-md bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600"
                        >
                            Start Project
                        </Link>
                    </div>
                </div>
            </header>

            <div className="h-20" />
        </>
    );
}