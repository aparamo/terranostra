'use client';

import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ComponentProps} from 'react';

export default function NavLink({href, ...rest}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'border-b-2 border-transparent py-2 font-medium transition-colors ',
        isActive
          ? 'border-b-cyan-900/20 border-b-1 text-cyan-950 bg-amber-200/30 rounded-3xl p-5 pt-[12px] dark:bg-amber-100/60 dark:text-black '
          : 'dark:text-slate-300 hover:border-b-cyan-600 dark:hover:text-cyan-400/80'
      )}
      href={href}
      {...rest}
    />
  );
}
