'use client';

import React from 'react';
import {motion, Transition} from 'framer-motion';
import {useTranslations} from 'next-intl';

// Define interfaces for the different element types
interface BaseElement {
  type: string;
  className: string;
}

interface CircleElement extends BaseElement {
  type: 'circle';
  cx: number;
  cy: number;
  r: number;
  animate?: {
    scale?: number[];
  };
  transition?: Transition;
}

interface PathElement extends BaseElement {
  type: 'path';
  d: string;
  animate: {
    pathLength: number[];
  };
  transition: Transition;
}

type ServiceElement = CircleElement | PathElement;

const ServicesHero: React.FC = () => {
  const t = useTranslations('ServicesHero');

  // Helper function to round coordinates to avoid hydration mismatches
  const roundCoord = (coord: number) => Math.round(coord * 100) / 100;

  const serviceElements: ServiceElement[] = [
    // Central node
    {type: 'circle', cx: 600, cy: 400, r: 20, className: 'fill-primary/50'},
    // Radiating lines
    ...Array.from({length: 12}).map((_, i) => {
      const angle = (i * Math.PI) / 6;
      const x = roundCoord(600 + Math.cos(angle) * 300);
      const y = roundCoord(400 + Math.sin(angle) * 300);
      return {
        type: 'path',
        d: `M600,400 L${x},${y}`,
        animate: {pathLength: [0, 1, 0]},
        transition: {
          duration: 5,
          delay: i * 0.3,
          repeat: Infinity,
          ease: 'easeInOut'
        },
        className: 'stroke-primary/60'
      } as PathElement;
    }),
    // Orbiting nodes
    ...Array.from({length: 6}).map((_, i) => {
      const angle = (i * Math.PI) / 3;
      const x = roundCoord(600 + Math.cos(angle) * 200);
      const y = roundCoord(400 + Math.sin(angle) * 200);
      return {
        type: 'circle',
        cx: x,
        cy: y,
        r: 10,
        animate: {scale: [1, 1.5, 1]},
        transition: {
          duration: 3,
          delay: i * 0.5,
          repeat: Infinity,
          ease: 'easeInOut'
        },
        className: 'fill-primary/40'
      } as CircleElement;
    })
  ];

  return (
    <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-br from-stone-50 via-amber-50 to-emerald-50 dark:from-stone-900 dark:via-cyan-900 dark:to-emerald-900 text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {serviceElements.map((elem, i) => (
            <motion.g key={i}>
              {elem.type === 'circle' && (
                <motion.circle
                  cx={elem.cx}
                  cy={elem.cy}
                  r={elem.r}
                  className={elem.className}
                  {...(elem.animate && {animate: elem.animate})}
                  {...(elem.transition && {transition: elem.transition})}
                />
              )}
              {elem.type === 'path' && (
                <motion.path
                  d={elem.d}
                  fill="none"
                  strokeWidth="1.5"
                  initial={{pathLength: 0}}
                  animate={elem.animate}
                  transition={elem.transition}
                  className={elem.className}
                />
              )}
            </motion.g>
          ))}
        </svg>
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] px-6 md:px-12 bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, delay: 0.5}}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.8}}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t('description')}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
