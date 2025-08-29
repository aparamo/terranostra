import {useTranslations} from 'next-intl';
import React, {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';

interface WaveProps {
  pathData: string;
  strokeColor?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
}

const Wave: React.FC<WaveProps> = ({
  pathData,
  strokeColor = 'currentColor',
  strokeWidth = 1,
  delay = 0,
  duration = 10
}) => {
  return (
    <motion.path
      d={pathData}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill="none"
      initial={{pathOffset: 1, pathLength: 1}}
      animate={{pathOffset: 0}}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

const AboutHero: React.FC = () => {
  const t = useTranslations('AboutHero');
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-[60vh] md:min-h-[100vh] bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-teal-950 dark:via-cyan-900 dark:to-teal-900 overflow-hidden"
      style={{y, opacity}}
    >
      {/* Animated Waves Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <Wave
            pathData="M0,400 C300,500 400,300 600,400 S900,300 1200,400"
            strokeColor="hsl(var(--primary))"
            strokeWidth={2}
            duration={15}
          />
          <Wave
            pathData="M0,450 C250,350 350,550 600,450 S850,550 1200,450"
            strokeColor="hsl(var(--primary))"
            strokeWidth={2}
            duration={20}
            delay={2}
          />
          <Wave
            pathData="M0,500 C300,400 400,600 600,500 S900,400 1200,500"
            strokeColor="hsl(var(--primary))"
            strokeWidth={2}
            duration={25}
            delay={4}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, delay: 0.5}}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground mb-6"
          >
            {t('title')}
          </motion.h1>

          {/* Description */}
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

export default AboutHero;
