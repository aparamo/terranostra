'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {Star, Quote, Leaf, Sparkles} from 'lucide-react';

export default function ClientsAndPartnersSection() {
  const t = useTranslations('HomePage');

  const testimonials = [
    {
      name: t('testimonialValeName'),
      role: t('testimonialValeRole'),
      story: t('testimonialValeStory'),
      rating: 5,
      beforeAfter: t('testimonialValeBeforeAfter'),
      icon: Leaf
    },
    {
      name: t('testimonialTaniaName'),
      role: t('testimonialTaniaRole'),
      story: t('testimonialTaniaStory'),
      rating: 5,
      beforeAfter: t('testimonialTaniaBeforeAfter'),
      icon: Sparkles
    }
  ];

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  };

  const starVariants = {
    hidden: {scale: 0, rotate: -180},
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-background to-muted/70 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('testimonialsSubtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true}}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              className="group relative"
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: {duration: 0.3}
              }}
            >
              <div className="border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-card/80">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-primary" />
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={starVariants}
                      transition={{delay: i * 0.1}}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial content */}
                <div className="mb-6">
                  <p className="text-lg text-muted-foreground leading-relaxed italic">
                    &ldquo;{testimonial.story}&rdquo;
                  </p>
                </div>

                {/* Before/After indicator */}
                <div className="flex items-center gap-3 mb-6 p-3 bg-muted/30 rounded-lg">
                  <testimonial.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {testimonial.beforeAfter}
                  </span>
                </div>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
