'use client';

import Link from 'next/link';
import {ShoppingCart} from 'lucide-react';
import {Button} from './ui/button';
import {useCart} from '@/context/CartContext';

const CartButton = () => {
  const {cartItems} = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Shopping Cart</span>
      </Button>
    </Link>
  );
};

export default CartButton;
