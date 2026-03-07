'use client';
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends ImageProps {
    fallbackColor?: string;
}

/**
 * SafeImage provides a silent fallback to a neutral gradient if the image is missing or fails to load.
 * Prevents 404 console spam and layout breakage.
 */
const SafeImage = ({ src, alt, fallbackColor = 'from-gray-100 to-gray-200', ...props }: SafeImageProps) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div
                className={`w-full h-full bg-gradient-to-br ${fallbackColor} animate-pulse flex items-center justify-center`}
                aria-label={alt as string}
            >
                <span className="text-gray-300 font-bold text-xs tracking-widest uppercase">Visual Loading</span>
            </div>
        );
    }

    return (
        <Image
            {...props}
            src={src}
            alt={alt}
            onError={() => setError(true)}
        />
    );
};

export default SafeImage;
