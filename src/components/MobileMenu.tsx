'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import {Menu} from 'lucide-react';
import {useTranslations} from 'next-intl';
import NavLink from './NavLink';
import LocaleSwitcher from './LocaleSwitcher';
import {Poppins} from 'next/font/google';
import clsx from 'clsx';
import Image from 'next/image';

const poppins = Poppins({subsets: ['latin'], weight: '300'});

export default function MobileMenu() {
  const t = useTranslations('Header');

  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle
            className={clsx(
              'text-2xl text-cyan-700 tracking-tighter',
              poppins.className
            )}
          >
            <Image
              src={'/logof-v0fix-web.png'}
              alt={'menu logo'}
              width={150}
              height={144}
            />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-8">
          <NavLink href="/">{t('home')}</NavLink>
          <NavLink href="/about">{t('about')}</NavLink>
          <NavLink href="/projects">{t('projects')}</NavLink>
          <NavLink href="/services">{t('services')}</NavLink>
          <NavLink href="/products">{t('products')}</NavLink>
          <NavLink href="/contact">{t('contact')}</NavLink>
        </nav>
        <div className="mt-8">
          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
