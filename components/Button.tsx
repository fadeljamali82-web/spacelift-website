import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    children: React.ReactNode;
}

const Button = ({ variant = 'primary', size = 'md', children, className, href, ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all rounded active:scale-95";

    const variants = {
        primary: "bg-brand-orange text-white hover:bg-black",
        secondary: "bg-brand-amber text-brand-dark hover:bg-brand-orange hover:text-white",
        outline: "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-8 py-3.5 text-sm",
        lg: "px-10 py-4 text-base"
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={combinedStyles}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
