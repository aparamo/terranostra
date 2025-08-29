'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import {Heart, Leaf, Sparkles, ArrowRight, Star, Users} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {partnerTrackingService} from '@/services/partnerTracking';

interface SelfCareSectionProps {
  className?: string;
}

export default function SelfCareSection({
  className = ''
}: SelfCareSectionProps) {
  const t = useTranslations('SelfCareSection');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePartnerSelection = async (
    partner: 'caro' | 'adri' | 'neither'
  ) => {
    console.log('=== handlePartnerSelection called ===');
    console.log('Partner selection:', partner);

    let url: string;

    if (partner === 'neither') {
      // For "neither" selection, randomly choose between Caro and Adri
      const randomChoice = Math.random() < 0.5;
      if (randomChoice) {
        url = 'https://www.ringana.com/corporate/products/?lang=en';
        console.log('Random choice: Caro (products)');
      } else {
        url = 'https://www.ringana.com/corporate/company/?lang=en';
        console.log('Random choice: Adri (company)');
      }
    } else {
      // Direct partner selection
      switch (partner) {
        case 'caro':
          url = 'https://www.ringana.com/corporate/products/?lang=en';
          console.log('Direct Caro selection');
          break;
        case 'adri':
          url = 'https://www.ringana.com/corporate/company/?lang=en';
          console.log('Direct Adri selection');
          break;
        default:
          url = 'https://www.ringana.com/corporate/products/?lang=en';
          console.log('Default URL');
      }
    }

    console.log('Final URL to open:', url);

    // Track the click in the database for analytics
    try {
      console.log('Tracking partner click in database...');
      await partnerTrackingService.trackPartnerClick(partner);
      console.log('Partner click tracked successfully');
    } catch (error) {
      console.error('Error tracking partner click, but continuing:', error);
    }

    // Open in new tab
    console.log('Opening new tab with URL:', url);
    window.open(url, '_blank', 'noopener,noreferrer');
    console.log('New tab opened, closing dialog');
    setIsDialogOpen(false);
  };

  return (
    <section
      className={`py-20 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-emerald-950/90 dark:via-background/95 dark:to-cyan-950/90 ${className}`}
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
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
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
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('features.highestQuality.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('features.highestQuality.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('features.businessOpportunities.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('features.businessOpportunities.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t('features.personalExperience.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('features.personalExperience.description')}
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-700/70 to-cyan-700/70 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('discover.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t('discover.description')}
                  </p>
                </div>

                <div className="space-y-4">
                  <Dialog
                    open={isDialogOpen}
                    onOpenChange={(open) => {
                      console.log('Dialog state changing to:', open);
                      setIsDialogOpen(open);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        onClick={() =>
                          console.log('Main button clicked, opening dialog')
                        }
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <span>{t('discover.exploreButton')}</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                          {t('partnerSelection.title')}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300">
                          {t('partnerSelection.description')}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-3 mt-6">
                        <Button
                          onClick={() => {
                            console.log('Caro button clicked');
                            alert('Caro button clicked!'); // Test if button works at all

                            // Test synchronous function call first
                            const testUrl =
                              'https://www.ringana.com/corporate/products/?lang=en';
                            console.log('Opening test URL:', testUrl);
                            window.open(
                              testUrl,
                              '_blank',
                              'noopener,noreferrer'
                            );

                            // Then try the async function
                            try {
                              handlePartnerSelection('caro');
                            } catch (error) {
                              console.error(
                                'Error calling handlePartnerSelection:',
                                error
                              );
                              alert('Error: ' + error);
                            }
                          }}
                          variant="outline"
                          className="w-full justify-start h-12 text-left px-4 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-300"
                        >
                          <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3">
                            <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="font-medium">
                            {t('partnerSelection.caro')}
                          </span>
                        </Button>

                        <Button
                          onClick={() => {
                            console.log('Adri button clicked');
                            alert('Adri button clicked!'); // Test if button works at all

                            // Test synchronous function call first
                            const testUrl =
                              'https://www.ringana.com/corporate/company/?lang=en';
                            console.log('Opening test URL:', testUrl);
                            window.open(
                              testUrl,
                              '_blank',
                              'noopener,noreferrer'
                            );

                            // Then try the async function
                            try {
                              handlePartnerSelection('adri');
                            } catch (error) {
                              console.error(
                                'Error calling handlePartnerSelection:',
                                error
                              );
                              alert('Error: ' + error);
                            }
                          }}
                          variant="outline"
                          className="w-full justify-start h-12 text-left px-4 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:border-cyan-300"
                        >
                          <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mr-3">
                            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <span className="font-medium">
                            {t('partnerSelection.adri')}
                          </span>
                        </Button>

                        <Button
                          onClick={() => {
                            console.log('Neither button clicked');
                            alert('Neither button clicked!'); // Test if button works at all

                            // Test synchronous function call first
                            const testUrl =
                              'https://www.ringana.com/corporate/products/?lang=en';
                            console.log('Opening test URL:', testUrl);
                            window.open(
                              testUrl,
                              '_blank',
                              'noopener,noreferrer'
                            );

                            // Then try the async function
                            try {
                              handlePartnerSelection('neither');
                            } catch (error) {
                              console.error(
                                'Error calling handlePartnerSelection:',
                                error
                              );
                              alert('Error: ' + error);
                            }
                          }}
                          variant="outline"
                          className="w-full justify-start h-12 text-left px-4 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300"
                        >
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                            <Star className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <span className="font-medium">
                            {t('partnerSelection.neither')}
                          </span>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1"></div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-200 dark:bg-emerald-800 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-200 dark:bg-cyan-800 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 -left-6 w-4 h-4 bg-purple-200 dark:bg-purple-800 rounded-full opacity-60"></div>
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
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>{t('status.highestQuality')}</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span>{t('status.businessOpportunities')}</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>{t('status.personalExperience')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
