import {ReactNode} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {CartProvider} from '@/context/CartContext';
import {Toaster} from '@/components/ui/sonner';

export default function HomeLayout({children}: {children: ReactNode}) {
  return (
    <CartProvider>
      <div className="flex grow flex-col">
        <Header />
        <div className="mx-auto flex w-full grow flex-col ">{children}</div>
        <Footer />
        <Toaster />
      </div>
    </CartProvider>
  );
}
