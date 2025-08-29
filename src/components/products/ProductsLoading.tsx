'use client';

import {motion} from 'framer-motion';
import {Loader2, Sprout, TreePine, Flower2, Leaf} from 'lucide-react';
import {useTranslations} from 'next-intl';

export default function ProductsLoading() {
  const t = useTranslations('ProductsLoading');
  const icons = [Sprout, TreePine, Flower2, Leaf];

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/90 dark:via-background/95 dark:to-emerald-950/90">
      <div className="text-center">
        <motion.div
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.5}}
          className="mb-8"
        >
          <div className="relative">
            {/* Main spinning loader */}
            <motion.div
              animate={{rotate: 360}}
              transition={{duration: 2, repeat: Infinity, ease: 'linear'}}
              className="w-24 h-24 mx-auto"
            >
              <Loader2 className="w-24 h-24 text-emerald-800 dark:text-emerald-600" />
            </motion.div>

            {/* Orbiting icons - optimized for performance */}
            {icons.map((Icon, index) => (
              <motion.div
                key={index}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.3, // Reduced delay for better performance
                  scale: {
                    duration: 0.5, // Reduced duration
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotate(${index * 90}deg) translateY(-40px)`
                }}
              >
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.2}}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Animated dots - optimized for performance */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5, delay: 0.4}}
          className="flex justify-center space-x-2 mt-8"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -8, 0], // Reduced movement for better performance
                scale: [1, 1.1, 1] // Reduced scale for better performance
              }}
              transition={{
                duration: 1.2, // Reduced duration
                repeat: Infinity,
                delay: index * 0.15, // Reduced delay
                ease: 'easeInOut'
              }}
              className="w-3 h-3 bg-green-500 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
