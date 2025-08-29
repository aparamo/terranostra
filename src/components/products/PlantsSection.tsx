'use client';

import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import {TreePine, ArrowRight, Flower2, Zap} from 'lucide-react';
import {useTranslations} from 'next-intl';
import EmailSubscriptionDialog from './EmailSubscriptionDialog';

interface PlantsSectionProps {
  className?: string;
}

export default function PlantsSection({className = ''}: PlantsSectionProps) {
  const t = useTranslations('PlantsSection');

  return (
    <section
      className={`py-20 bg-gradient-to-br from-cyan-50 via-white to-cyan-50 dark:from-cyan-950/80 dark:via-background/95 dark:to-cyan-950/80 ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          viewport={{once: true}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-cyan-700 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{opacity: 0, x: -30}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8, delay: 0.2}}
            viewport={{once: true}}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-950/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TreePine className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('features.nativeSpecies.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('features.nativeSpecies.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-950/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Flower2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('features.ecologicalRestoration.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('features.ecologicalRestoration.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-950/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('features.acceleratedGrowth.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('features.acceleratedGrowth.description')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, x: 30}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8, delay: 0.4}}
            viewport={{once: true}}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-700/70 to-cyan-800/70 rounded-full flex items-center justify-center mx-auto">
                  <TreePine className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('catalog.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t('catalog.description')}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Download button removed - catalog not ready yet */}
                  {/* <Button
                    size="lg"
                    onClick={handleDownloadCatalog}
                    className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    <span>{t('catalog.downloadButton')}</span>
                  </Button> */}

                  <EmailSubscriptionDialog
                    productType="plants"
                    trigger={
                      <Button
                        variant="outline"
                        className="w-full border-cyan-300 text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:border-cyan-400 font-semibold py-3"
                      >
                        <span>{t('catalog.learnMoreButton')}</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-200 dark:bg-cyan-950/80 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-200 dark:bg-cyan-950/80 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 -left-6 w-4 h-4 bg-cyan-200 dark:bg-cyan-950/80 rounded-full opacity-60"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.6}}
          viewport={{once: true}}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span>{t('status.certifiedNative')}</span>
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <span>{t('status.ecologicalRestoration')}</span>
            <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
            <span>{t('status.guaranteedGrowth')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
