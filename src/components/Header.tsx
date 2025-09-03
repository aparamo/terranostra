'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import NavLink from './NavLink';
import LocaleSwitcher from './LocaleSwitcher';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
//import CartButton from './CartButton';
import {ThemeSwitcher} from './ThemeSwitcher';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';

export default function Header() {
  const t = useTranslations('Header');
  const {theme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && theme === 'dark'
      ? '/logof-v0-web-dark3.png'
      : '/logof-v0fix-web.png';

  return (
    <header className="bg-background border-b p-4 min-h-20">
      <div className="container mx-auto flex  items-center justify-end">
        <div className="z-50 absolute lg:left-[5%] lg:top-[0%] left-1/2 top-[1%] transform -translate-x-1/2 lg:transform-none">
          <Link href={'/'}>
            <Image
              src={logoSrc}
              alt={'Logo TerraNostra'}
              width={330}
              height={314}
              className="h-auto w-[160px] lg:w-[280px] max-w-72"
              priority
            />
          </Link>
        </div>
        <nav className="hidden lg:flex gap-7 items-center justify-end">
          <NavLink href="/">{t('home')}</NavLink>
          <NavLink href="/about">{t('about')}</NavLink>
          <NavLink href="/projects">{t('projects')}</NavLink>
          <NavLink href="/services">{t('services')}</NavLink>
          <NavLink href="/products">{t('products')}</NavLink>
          <NavLink href="/contact">{t('contact')}</NavLink>
          <LocaleSwitcher />
          {/* <CartButton /> */}
          <ThemeSwitcher />
        </nav>
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
