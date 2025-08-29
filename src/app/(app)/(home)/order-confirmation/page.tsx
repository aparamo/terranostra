'use client';

import {CheckCircle} from 'lucide-react';
import Link from 'next/link';

const OrderConfirmationPage = () => {
  return (
    <div className="container mx-auto py-24 text-center">
      <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Your order has been placed successfully. You will receive an email
        confirmation shortly.
      </p>
      <Link href="/products">
        <span className="text-blue-500 hover:underline">Continue Shopping</span>
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
