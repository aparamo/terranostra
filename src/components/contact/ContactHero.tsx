import {useTranslations} from 'next-intl';
import React, {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';

interface CircleProps {
  delay: number;
  duration?: number;
}

const Circle: React.FC<CircleProps> = ({delay, duration = 4}) => {
  return (
    <motion.circle
      cx="50%"
      cy="50%"
      r="0"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      initial={{r: 0, opacity: 0.7}}
      animate={{r: '50%', opacity: 0}}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

const ContactHero: React.FC = () => {
  const t = useTranslations('ContactHero');
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
      className="relative min-h-[60vh] md:min-h-[100vh] bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-cyan-950 dark:via-slate-950 dark:to-indigo-950 overflow-hidden"
      style={{y, opacity}}
    >
      {/* Animated Circles Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <Circle delay={0} />
          <Circle delay={1} />
          <Circle delay={2} />
          <Circle delay={3} />
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

export default ContactHero;
