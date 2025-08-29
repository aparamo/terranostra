'use client';

import {useCart} from '@/context/CartContext';

const OrderSummary = () => {
  const {cartItems} = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      {cartItems.map((item) => (
        <div
          key={item.product.id}
          className="flex justify-between items-center mb-4"
        >
          <div>
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">
              Quantity: {item.quantity}
            </p>
          </div>
          <p className="font-semibold">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
