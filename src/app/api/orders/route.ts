import {NextRequest, NextResponse} from 'next/server';
import {getPayload} from 'payload';
import config from '@payload-config';
import type {Order} from '@/payload-types';

interface CartItem {
  product: {
    id: string;
  };
  quantity: number;
}

export async function POST(req: NextRequest) {
  const {user, items, shippingAddress, total, stripePaymentIntentId} =
    await req.json();

  try {
    const localPayload = await getPayload({config});

    const data = {
      user,
      items: items.map((item: CartItem) => ({
        product: item.product.id,
        quantity: item.quantity
      })),
      shippingAddress,
      total,
      stripePaymentIntentId,
      status: 'paid'
    } as Omit<Order, 'id' | 'createdAt' | 'updatedAt'>;

    const order = await localPayload.create({
      collection: 'orders',
      data
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
