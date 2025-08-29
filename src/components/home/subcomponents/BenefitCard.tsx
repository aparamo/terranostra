'use client';

import {motion} from 'framer-motion';
import {ReactNode} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
}

export default function BenefitCard({
  title,
  description,
  icon,
  index
}: BenefitCardProps) {
  return (
    <motion.div
      className="text-center h-full"
      initial={{opacity: 0, y: 50}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.5}}
      transition={{duration: 0.5, delay: index * 0.1}}
    >
      <Card className="h-full bg-secondary border-secondary-foreground/20">
        <CardHeader className="items-center">
          {icon}
          <CardTitle className="text-primary pt-4">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
