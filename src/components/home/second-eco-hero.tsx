import React, {useEffect, useRef, useState} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';

import {useTranslations} from 'next-intl';
import Link from 'next/link';

interface OrganicPathProps {
  pathData: string;
  strokeColor?: string;
  strokeWidth?: number;
  delay?: number;
}

const OrganicPath: React.FC<OrganicPathProps> = ({
  pathData,
  strokeColor = 'currentColor',
  strokeWidth = 1,
  delay = 0
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  return (
    <motion.path
      ref={pathRef}
      d={pathData}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray={pathLength}
      strokeDashoffset={pathLength}
      animate={{
        strokeDashoffset: [pathLength, 0, pathLength * 0.2, 0]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

const SecondEcoHero: React.FC = () => {
  const t = useTranslations('SecondEcoHero');
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-emerald-50 dark:from-stone-900 dark:via-cyan-700 dark:to-cyan-900 overflow-hidden"
      style={{y, opacity}}
    >
      {/* Organic Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="organicGradient" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.1"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* Flowing organic lines */}
          <OrganicPath
            pathData="M0,400 Q200,200 400,350 T800,300 Q1000,250 1200,400"
            strokeColor="hsl(var(--primary))"
            strokeWidth={2}
            delay={0}
          />
          <OrganicPath
            pathData="M0,500 Q300,300 600,450 T1200,400"
            strokeColor="hsl(var(--primary))"
            strokeWidth={1.5}
            delay={2}
          />
          <OrganicPath
            pathData="M200,0 Q400,200 300,400 T500,600 Q700,800 900,600"
            strokeColor="hsl(var(--primary))"
            strokeWidth={1}
            delay={4}
          />

          {/* Organic shapes */}
          <motion.circle
            cx={600 + mousePosition.x * 100}
            cy={200 + mousePosition.y * 50}
            r="80"
            fill="url(#organicGradient)"
            animate={{
              r: [80, 120, 90, 110, 80],
              opacity: [0.3, 0.1, 0.4, 0.2, 0.3]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <motion.ellipse
            cx={300 + mousePosition.x * 80}
            cy={600 + mousePosition.y * 40}
            rx="60"
            ry="40"
            fill="url(#organicGradient)"
            animate={{
              rx: [60, 80, 70, 90, 60],
              ry: [40, 60, 50, 70, 40],
              opacity: [0.2, 0.4, 0.1, 0.3, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3
            }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, delay: 0.8}}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground mb-6"
          >
            {t('title')}{' '}
            <motion.span
              className="relative inline-block"
              whileHover={{scale: 1.05}}
              transition={{type: 'spring', stiffness: 300}}
            >
              <span className="bg-gradient-to-r from-emerald-700 via-amber-700 to-stone-700 dark:from-emerald-500 dark:via-amber-500 dark:to-stone-500 bg-clip-text text-transparent font-medium">
                {t('highlight')}
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-emerald-600 to-amber-600 rounded-full"
                initial={{width: 0}}
                animate={{width: '100%'}}
                transition={{duration: 1.5, delay: 2}}
              />
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 1.2}}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground mb-12"
          >
            {t('inspired')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 1.5}}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t('description')}
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 1.8}}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/projects">
              <motion.button
                className="group relative px-8 py-4 bg-foreground text-background rounded-full font-medium overflow-hidden"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                onHoverStart={() => {}}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-amber-600"
                  initial={{x: '-100%'}}
                  whileHover={{x: 0}}
                  transition={{duration: 0.3}}
                />
                <span className="relative z-10">{t('ctaExplore')}</span>
              </motion.button>
            </Link>

            <Link href="/services">
              <motion.button
                className="group px-8 py-4 border-2 border-border text-foreground rounded-full font-medium hover:border-primary transition-colors"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
              >
                {t('ctaLearn')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Interactive Ripple Effect */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x * 100 + '%',
          top: mousePosition.y * 100 + '%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400/20 to-amber-400/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SecondEcoHero;
