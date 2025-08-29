'use client';

import {motion} from 'framer-motion';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({
  title,
  description,
  index
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.5}}
      transition={{duration: 0.5, delay: index * 0.1}}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-teal-800 text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
