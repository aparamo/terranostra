import {ThemeProvider} from '@/components/ThemeProvider';
import clsx from 'clsx';
//import {Inter} from 'next/font/google';
//import { Poppins } from 'next/font/google';
import {Montserrat} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import './globals.css';

//const inter = Inter({subsets: ['latin']});
//const poppins = Poppins({subsets: ['latin'], weight: '400'});
const montserrat = Montserrat({subsets: ['latin'], weight: '400'});

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({children}: Props) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>TerraNostra</title>
      </head>
      <body
        className={clsx(
          'flex min-h-[100vh] flex-col bg-slate-100',
          montserrat.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
