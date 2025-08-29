'use client';

import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon
} from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-secondary text-secondary-foreground pt-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{t('aboutTitle')}</h3>
            <p>{t('aboutText')}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('quickLinksTitle')}</h3>
            <ul>
              <li>
                <Link href="/about" className="hover:text-primary">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary">
                  {t('projects')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('contactTitle')}</h3>

            <p>{t('email')}</p>
            <p>+52 221 164 4452</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('followUsTitle')}</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary">
                <FacebookIcon />
              </Link>
              <Link href="#" className="hover:text-primary">
                <TwitterIcon />
              </Link>
              <Link href="#" className="hover:text-primary">
                <InstagramIcon />
              </Link>
              <Link href="#" className="hover:text-primary">
                <YoutubeIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-border pt-4">
          <p>{t('copyright', {year: new Date().getFullYear()})}</p>
        </div>
      </div>
    </footer>
  );
}
