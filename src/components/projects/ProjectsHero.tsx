'use client';

import React, {useEffect, useRef, useState} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useTranslations} from 'next-intl';

const ProjectsHero: React.FC = () => {
  const t = useTranslations('ProjectsHero');
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const designElements = [
    // Growing plants (as circles)
    {
      type: 'circle',
      cx: 620,
      cy: 260,
      r: 0,
      animate: {r: [0, 20, 15, 25]},
      transition: {
        duration: 20,
        delay: 1,
        repeat: Infinity,
        ease: 'easeInOut' as const
      },
      className: 'fill-primary/30'
    },
    {
      type: 'circle',
      cx: 750,
      cy: 200,
      r: 0,
      animate: {r: [0, 30, 25, 35]},
      transition: {
        duration: 40,
        delay: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const
      },
      className: 'fill-primary/30'
    },
    {
      type: 'circle',
      cx: 285,
      cy: 262,
      r: 0,
      animate: {r: [0, 30, 25, 35]},
      transition: {
        duration: 40,
        delay: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const
      },
      className: 'fill-primary/40'
    },
    // Flowing lines (wind/water)
    {
      type: 'path',
      d: 'M0,300 C200,200 400,400 600,300 S800,200 1000,300',
      animate: {pathLength: [0, 1, 0]},
      transition: {
        duration: 8,
        delay: 1.5,
        repeat: Infinity,
        ease: 'easeInOut' as const
      },
      className: 'stroke-blue-400/50'
    },
    {
      type: 'path',
      d: 'M0,500 C250,450 450,550 700,500 S900,450 1200,500',
      animate: {pathLength: [0, 1, 0]},
      transition: {
        duration: 14,
        delay: 2.5,
        repeat: Infinity,
        ease: 'easeInOut' as const
      },
      className: 'stroke-cyan-400/50'
    },
    // Sun rays
    {
      type: 'path',
      d: 'M900,50 L800,150',
      animate: {pathLength: [0, 1, 0]},
      transition: {
        duration: 6,
        delay: 3,
        repeat: Infinity,
        ease: 'linear' as const
      },
      className: 'stroke-yellow-400/50'
    },
    {
      type: 'path',
      d: 'M900,50 L750,200',
      animate: {pathLength: [0, 1, 0]},
      transition: {
        duration: 6,
        delay: 3.5,
        repeat: Infinity,
        ease: 'linear' as const
      },
      className: 'stroke-yellow-400/40'
    }
  ];

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[60vh] md:min-h-[80vh] bg-gradient-to-br from-gray-50 to-stone-200 dark:from-gray-900 dark:to-stone-800 text-foreground dark:bg-black overflow-hidden"
      style={{y, opacity}}
    >
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter
              id="soft-glow"
              x="-150%"
              y="-150%"
              width="400%"
              height="400%"
            >
              <feGaussianBlur stdDeviation="10" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {designElements.map((elem, i) => (
            <motion.g key={i} filter="url(#soft-glow)">
              {elem.type === 'circle' && (
                <motion.circle
                  cx={elem.cx}
                  cy={elem.cy}
                  initial={{r: elem.r}}
                  animate={elem.animate}
                  transition={elem.transition}
                  className={elem.className}
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
          <motion.circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r={40}
            className="fill-yellow-300/40"
            transition={{type: 'spring', stiffness: 200, damping: 20}}
          />
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
    </motion.div>
  );
};

export default ProjectsHero;
