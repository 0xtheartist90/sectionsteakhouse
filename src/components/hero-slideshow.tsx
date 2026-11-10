'use client';

import { useEffect, useState } from 'react';

import { responsive } from '@/lib/responsive';

// The strongest shots only: three dishes plus the restaurant's own professional cocktail photos.
const SLIDES = [
    { src: '/images/cheeseburger.jpg', alt: 'The prime rib cheeseburger', caption: 'Prime Rib Cheeseburger' },
    { src: '/images/old-fashioned.jpg', alt: 'An old fashioned over a clear block of ice', caption: 'Old Fashioneds' },
    { src: '/images/steak-dinner.jpg', alt: 'Steak with hand-cut fries and a Caesar salad', caption: "Butcher's Counter" },
    { src: '/images/cocktail-leaf.jpg', alt: 'A stirred cocktail with a single leaf', caption: 'Stirred Cocktails' },
    { src: '/images/caviar-bites.jpg', alt: 'Crispy potato bites with crème fraîche and caviar', caption: 'Caviar & Crème Fraîche' }
];

// Food first: a large autoplaying crossfade of dishes, each easing in with a slow zoom. The dots
// let visitors jump; it holds still for anyone who prefers reduced motion.
const HeroSlideshow = ({ className = '' }: { className?: string }) => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 4200);

        return () => clearInterval(id);
    }, [active]);

    return (
        <div className={`bg-mauve relative overflow-hidden ${className}`}>
            {SLIDES.map((slide, i) => {
                const image = responsive(slide.src);

                return (
                    <img
                        key={slide.src}
                        src={image.src}
                        srcSet={image.srcSet}
                        sizes='(max-width: 1023px) 100vw, 60vw'
                        alt={i === active ? slide.alt : ''}
                        aria-hidden={i !== active}
                        loading={i < 2 ? 'eager' : 'lazy'}
                        decoding='async'
                        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-out ${
                            i === active ? 'scale-105 opacity-100 duration-[1200ms,6000ms]' : 'scale-100 opacity-0 duration-[1200ms,0ms]'
                        }`}
                    />
                );
            })}
            <div aria-hidden className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent' />
            <p
                key={SLIDES[active].caption}
                className='label text-cream rise absolute bottom-12 left-5 md:left-8'
                aria-live='polite'>
                {SLIDES[active].caption}
            </p>
            <div className='absolute bottom-6 left-5 flex gap-2 md:left-8'>
                {SLIDES.map((slide, i) => (
                    <button
                        key={slide.src}
                        aria-label={`Show ${slide.alt}`}
                        onClick={() => setActive(i)}
                        className={`h-1.5 rounded-full shadow transition-all ${i === active ? 'bg-cream w-7' : 'bg-cream/50 w-1.5'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlideshow;
