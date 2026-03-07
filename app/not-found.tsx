import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-white px-6">
            <h1 className="text-9xl font-black tracking-tighter text-brand-dark mb-4 animate-slide-up">404.</h1>
            <h2 className="text-xl font-bold tracking-widest uppercase text-brand-orange mb-8">Resource Unoccupied</h2>
            <p className="max-w-md text-center text-gray-500 mb-12 leading-relaxed">
                The requested environment could not be established. Return to the main command center to continue.
            </p>
            <Link href="/" className="bg-brand-dark text-white px-10 py-4 font-black italic tracking-tight hover:bg-brand-orange transition-all duration-300">
                RETURN TO HUB
            </Link>
        </div>
    );
}
