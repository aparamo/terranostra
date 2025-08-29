import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';

type PaymentCartItem = {
  product: {price: number};
  quantity: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01'
});

export async function POST(req: NextRequest) {
  const {items}: {items: PaymentCartItem[]} = await req.json();

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100, // amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    });

    return NextResponse.json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
