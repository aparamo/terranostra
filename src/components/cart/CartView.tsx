'use client';

import {useCart} from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

const CartView = () => {
  const {cartItems, removeFromCart, updateQuantity} = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 border-b pb-4 mb-4"
              >
                <Image
                  src={
                    typeof item.product.images?.[0]?.image === 'object'
                      ? (item.product.images[0]?.image?.url ?? '')
                      : '/placeholder.svg'
                  }
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product.id, parseInt(e.target.value))
                    }
                    className="w-20"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    &times;
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="mt-6 block">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
