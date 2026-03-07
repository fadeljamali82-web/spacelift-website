import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    dark?: boolean;
}

const Section = ({ children, className = "", id, dark = false }: SectionProps) => {
    return (
        <section
            id={id}
            className={`py-24 md:py-32 px-6 ${dark ? 'bg-brand-dark text-white' : 'bg-white text-brand-dark'} ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    );
};

export default Section;
