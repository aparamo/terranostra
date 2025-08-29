'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import Link from 'next/link';

export default function CallToActionSection() {
  const t = useTranslations('HomePage');

  return (
    <section className="py-24 bg-gradient-to-br from-background via-background to-muted/70 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            {t('ctaSubtitle')}
          </p>
          <Link href="/contact">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary/50 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            >
              {t('ctaButton')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
