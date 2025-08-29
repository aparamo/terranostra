'use client';

import {useTranslations} from 'next-intl';
import {ServiceCategory} from './ServiceCategory';
import Link from 'next/link';
import {
  LayoutGrid,
  BookOpen,
  ClipboardList,
  Flower,
  Layers,
  School,
  Map,
  Users,
  FileText,
  Gauge,
  TestTube,
  Droplets,
  FlaskConical
} from 'lucide-react';

export const ServicesCatalog = () => {
  const t = useTranslations('ServicesCatalog');

  const services = [
    {
      id: 'design',
      title: t('design.title'),
      icon: <LayoutGrid className="h-8 w-8 text-emerald-700/60" />,
      color: 'bg-emerald-600',
      items: [
        {
          title: t('design.items.0.title'),
          description: t('design.items.0.description'),
          icon: <ClipboardList className="h-6 w-6 text-emerald-700/60" />
        },
        {
          title: t('design.items.1.title'),
          description: t('design.items.1.description'),
          icon: <Flower className="h-6 w-6 text-emerald-700/60" />
        },
        {
          title: t('design.items.2.title'),
          description: t('design.items.2.description'),
          icon: <Layers className="h-6 w-6 text-emerald-700/60" />
        }
      ]
    },
    {
      id: 'education',
      title: t('education.title'),
      icon: <BookOpen className="h-8 w-8 text-amber-500/60" />,
      color: 'bg-amber-600',
      items: [
        {
          title: t('education.items.0.title'),
          description: t('education.items.0.description'),
          icon: <School className="h-6 w-6 text-amber-500/60" />
        },
        {
          title: t('education.items.1.title'),
          description: t('education.items.1.description'),
          icon: <Map className="h-6 w-6 text-amber-500/60" />
        },
        {
          title: t('education.items.2.title'),
          description: t('education.items.2.description'),
          icon: <Users className="h-6 w-6 text-amber-500/60" />
        },
        {
          title: t('education.items.3.title'),
          description: t('education.items.3.description'),
          icon: <FileText className="h-6 w-6 text-amber-500/60" />
        }
      ]
    },
    {
      id: 'monitoring',
      title: t('monitoring.title'),
      icon: <FlaskConical className="h-8 w-8 text-sky-600/60" />,
      color: 'bg-sky-600',
      items: [
        {
          title: t('monitoring.items.0.title'),
          description: t('monitoring.items.0.description'),
          icon: <Gauge className="h-6 w-6 text-sky-600/60" />
        },
        {
          title: t('monitoring.items.1.title'),
          description: t('monitoring.items.1.description'),
          icon: <TestTube className="h-6 w-6 text-sky-600/60" />
        },
        {
          title: t('monitoring.items.2.title'),
          description: t('monitoring.items.2.description'),
          icon: <Droplets className="h-6 w-6 text-sky-600/60" />
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-stone-50 dark:bg-[#0a1010]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-emerald-900/90 dark:text-amber-100/80 sm:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {services.map((service, index) => (
              <ServiceCategory
                key={service.id}
                id={service.id}
                title={service.title}
                icon={service.icon}
                color={service.color}
                items={service.items}
                isInitiallyOpen={index === 0}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16 pt-10 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('productsCta.title')}
          </h3>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('productsCta.description')}
          </p>
          <div className="mt-6">
            <Link href="/products">
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary/50 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {t('productsCta.button')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
