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
    r?: number[];
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

type ProductElement = CircleElement | PathElement;

const ProductsHero: React.FC = () => {
  const t = useTranslations('ProductsPage');

  // Helper function to round coordinates to avoid hydration mismatches
  const roundCoord = (coord: number) => Math.round(coord * 100) / 100;

  const productElements: ProductElement[] = [
    // Central seed/growth node
    {type: 'circle', cx: 600, cy: 400, r: 25, className: 'fill-emerald-500/60'},

    // Growing plants (as expanding circles)
    {
      type: 'circle',
      cx: 450,
      cy: 300,
      r: 1,
      animate: {r: [1, 15, 12, 18]},
      transition: {duration: 25, delay: 1, repeat: Infinity, ease: 'easeInOut'},
      className: 'fill-emerald-400/40'
    },
    {
      type: 'circle',
      cx: 750,
      cy: 350,
      r: 1,
      animate: {r: [1, 20, 18, 25]},
      transition: {duration: 30, delay: 2, repeat: Infinity, ease: 'easeInOut'},
      className: 'fill-emerald-400/40'
    },
    {
      type: 'circle',
      cx: 500,
      cy: 500,
      r: 1,
      animate: {r: [1, 18, 15, 22]},
      transition: {
        duration: 28,
        delay: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      },
      className: 'fill-emerald-400/40'
    },

    // Flowing water/nutrient lines
    {
      type: 'path',
      d: 'M0,400 C200,350 400,450 600,400 S800,350 1000,400',
      animate: {pathLength: [0, 1, 0]},
      transition: {
        duration: 12,
        delay: 0.5,
        repeat: Infinity,
        ease: 'easeInOut'
      },
      className: 'stroke-blue-400/50'
    },
    {
      type: 'path',
      d: 'M0,600 C250,550 450,650 700,600 S900,550 1200,600',
      animate: {pathLength: [0, 1, 0]},
      transition: {
        duration: 18,
        delay: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      },
      className: 'stroke-cyan-400/50'
    },

    // Sun rays for growth
    {
      type: 'path',
      d: 'M900,100 L800,200',
      animate: {pathLength: [0, 1, 0]},
      transition: {duration: 8, delay: 2, repeat: Infinity, ease: 'linear'},
      className: 'stroke-yellow-400/60'
    },
    {
      type: 'path',
      d: 'M900,100 L750,250',
      animate: {pathLength: [0, 1, 0]},
      transition: {duration: 8, delay: 2.5, repeat: Infinity, ease: 'linear'},
      className: 'stroke-yellow-400/50'
    },
    {
      type: 'path',
      d: 'M900,100 L700,300',
      animate: {pathLength: [0, 1, 0]},
      transition: {duration: 8, delay: 3, repeat: Infinity, ease: 'linear'},
      className: 'stroke-yellow-400/40'
    },

    // Seed dispersal (small floating circles)
    ...Array.from({length: 8}).map((_, i) => {
      const angle = (i * Math.PI) / 4;
      const x = roundCoord(600 + Math.cos(angle) * 250);
      const y = roundCoord(400 + Math.sin(angle) * 250);
      return {
        type: 'circle',
        cx: x,
        cy: y,
        r: 3,
        animate: {scale: [1, 1.8, 1]},
        transition: {
          duration: 4,
          delay: i * 0.6,
          repeat: Infinity,
          ease: 'easeInOut'
        },
        className: 'fill-amber-400/60'
      } as CircleElement;
    })
  ];

  return (
    <div className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-cyan-900 dark:via-cyan-900 dark:to-teal-900 text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {productElements.map((elem, i) => (
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
                  strokeWidth="2"
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

export default ProductsHero;
