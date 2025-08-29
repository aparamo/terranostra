'use client';

import {useEffect, useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripeCheckoutForm from '@/components/checkout/StripeCheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import {useCart} from '@/context/CartContext';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const {cartItems} = useCart();

  useEffect(() => {
    if (cartItems.length > 0) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({items: cartItems})
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [cartItems]);

  const appearance = {
    theme: 'stripe' as const
  };
  const options = {
    clientSecret,
    appearance
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Shipping & Payment Information
          </h2>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <StripeCheckoutForm />
            </Elements>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
