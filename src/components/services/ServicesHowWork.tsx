'use client';

import React from 'react';
import {motion} from 'framer-motion';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Lightbulb, GraduationCap, Users, Target} from 'lucide-react';
import {useTranslations} from 'next-intl';

const ServicesHowWork: React.FC = () => {
  const t = useTranslations('ServicesHowWork');

  const services = [
    {
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      icon: <Lightbulb className="h-8 w-8 text-amber-600" />,
      color: 'bg-amber-600'
    },
    {
      title: t('services.training.title'),
      description: t('services.training.description'),
      icon: <GraduationCap className="h-8 w-8 text-emerald-600" />,
      color: 'bg-emerald-600'
    },
    {
      title: t('services.mentoring.title'),
      description: t('services.mentoring.description'),
      icon: <Users className="h-8 w-8 text-sky-600" />,
      color: 'bg-sky-600'
    },
    {
      title: t('services.projects.title'),
      description: t('services.projects.description'),
      icon: <Target className="h-8 w-8 text-purple-600" />,
      color: 'bg-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0a1010]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.4}}
            className="text-4xl font-bold tracking-tight text-emerald-900/90 dark:text-amber-100/80 sm:text-5xl"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{opacity: 0, y: 15}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.4, delay: 0.1}}
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.3, delay: index * 0.05}}
                whileHover={{y: -3}}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-stone-50 to-amber-50 dark:from-cyan-200/20 dark:to-cyan-300/10">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-white dark:bg-stone-800 shadow-md group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{duration: 0.4, delay: 0.15}}
          className="text-center mt-16 pt-10 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            <div className="flex-1 max-w-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {t('cta.title')}
              </h3>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                {t('cta.description')}
              </p>
            </div>
            <motion.div
              initial={{opacity: 0, x: 20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.4, delay: 0.3}}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            >
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary/50 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                {t('cta.button')}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHowWork;
