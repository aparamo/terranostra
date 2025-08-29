'use client';

import {useTranslations} from 'next-intl';
import SectionTitle from './subcomponents/SectionTitle';
import BenefitCard from './subcomponents/BenefitCard';
import {Sprout, HeartHandshake, Users, Recycle} from 'lucide-react';

const iconProps = {
  className: 'w-16 h-16 text-primary'
};

const icons = [
  <Sprout key="sprout" {...iconProps} />,
  <HeartHandshake key="heart" {...iconProps} />,
  <Users key="users" {...iconProps} />,
  <Recycle key="recycle" {...iconProps} />
];

export default function BenefitsSection() {
  const t = useTranslations('HomePage');

  const benefits = [
    {
      title: t('benefit2Title'),
      description: t('benefit2Description'),
      icon: icons[1]
    },
    {
      title: t('benefit1Title'),
      description: t('benefit1Description'),
      icon: icons[0]
    },
    {
      title: t('benefit3Title'),
      description: t('benefit3Description'),
      icon: icons[2]
    },
    {
      title: t('benefit4Title'),
      description: t('benefit4Description'),
      icon: icons[3]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={t('benefitsTitle')}
          subtitle={t('benefitsSubtitle')}
        />
        <div className="grid md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
