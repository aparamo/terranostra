'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {useState} from 'react';
import {Card, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Leaf,
  Sprout,
  Recycle,
  Heart,
  Sun,
  Droplets,
  Flower,
  TreePine,
  Carrot
} from 'lucide-react';

const features = [
  {
    title: 'item7Title',
    icon: Flower,
    description: 'item7Description'
  },
  {
    title: 'item8Title',
    icon: Heart,
    description: 'item8Description'
  },
  {
    title: 'item6Title',
    icon: Sun,
    description: 'item6Description'
  },
  {
    title: 'item1Title',
    icon: Leaf,
    description: 'item1Description'
  },
  {
    title: 'item2Title',
    icon: Sprout,
    description: 'item2Description'
  },
  {
    title: 'item3Title',
    icon: TreePine,
    description: 'item3Description'
  },
  {
    title: 'item4Title',
    icon: Recycle,
    description: 'item4Description'
  },
  {
    title: 'item5Title',
    icon: Carrot,
    description: 'item5Description'
  },
  {
    title: 'item9Title',
    icon: Droplets,
    description: 'item9Description'
  }
];

export default function WhatCanBeDoneSection() {
  const t = useTranslations('HomePage');

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">
            {t('whatCanBeDoneTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            {t('whatCanBeDoneSubtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FlipCard key={index} feature={feature} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({
  feature,
  t
}: {
  feature: {
    title: string;
    description: string;
    icon: React.ComponentType<{className?: string}>;
  };
  t: (key: string) => string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Safety check for required properties
  if (!feature.title || !feature.description || !feature.icon) {
    console.warn('Missing required feature properties:', feature);
    return null;
  }

  return (
    <div
      className="group perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-64"
        animate={{rotateY: isFlipped ? 180 : 0}}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      >
        {/* Front of card */}
        <Card
          className="absolute inset-0 bg-card rounded-lg shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <CardHeader className="flex flex-col items-center justify-center text-center h-full">
            <div className="p-4 bg-cyan-50/30 dark:bg-teal-700 rounded-full">
              <feature.icon className="w-8 h-8 text-primary dark:text-cyan-950" />
            </div>
            <CardTitle className="mt-4 text-xl font-bold text-card-foreground">
              {t(feature.title)}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute inset-0 bg-teal-700/30 dark:bg-teal-800/50 rounded-lg shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <CardHeader className="flex flex-col items-center justify-center text-center h-full p-6">
            <div className="p-4 bg-cyan-50/30 dark:bg-teal-700 rounded-full mb-4">
              <feature.icon className="w-8 h-8 text-primary dark:text-cyan-950" />
            </div>
            <CardTitle className="text-lg font-semibold text-card-foreground mb-3">
              {t(feature.title)}
            </CardTitle>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(feature.description)}
            </p>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
}
