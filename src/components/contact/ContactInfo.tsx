'use client';

import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';
import {
  Mail,
  Phone,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon
} from 'lucide-react';

const ContactInfo = () => {
  const t = useTranslations('ContactInfo');

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  const socialLinks = [
    {
      name: 'Twitter',
      icon: TwitterIcon,
      url: 'https://twitter.com/terranostra'
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: 'https://instagram.com/terranostra'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      url: 'https://facebook.com/terranostra'
    }
  ];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto p-8 mb-12 bg-card rounded-lg shadow-lg text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-semibold mb-4"
      >
        {t('title')}
      </motion.h2>
      <motion.p variants={itemVariants} className="text-muted-foreground mb-8">
        {t('description')}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-center gap-8 mb-8"
      >
        <div className="flex items-center gap-4">
          <Mail className="w-6 h-6 text-primary" />
          <a href={`mailto:${t('email')}`} className="hover:underline">
            {t('email')}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-6 h-6 text-primary" />
          <a href={`tel:${t('phone')}`} className="hover:underline">
            {t('phone')}
          </a>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4">{t('followUs')}</h3>
        <div className="flex justify-center gap-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{scale: 1.2, rotate: 5}}
              whileTap={{scale: 0.9}}
              className="p-3 bg-primary/10 rounded-full text-primary"
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
