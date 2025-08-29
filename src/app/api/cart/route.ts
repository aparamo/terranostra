import {NextRequest, NextResponse} from 'next/server';
import {getPayload} from 'payload';
import config from '@payload-config';

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({error: 'userId is required'}, {status: 400});
  }

  try {
    const localPayload = await getPayload({config});

    const cart = await localPayload.find({
      collection: 'cart',
      where: {
        user: {
          equals: userId
        }
      },
      depth: 1
    });

    if (cart.docs.length > 0) {
      return NextResponse.json(cart.docs[0]);
    } else {
      return NextResponse.json({items: []});
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  const {items, userId} = await req.json();

  if (!userId) {
    return NextResponse.json({error: 'userId is required'}, {status: 400});
  }

  try {
    const localPayload = await getPayload({config});

    const carts = await localPayload.find({
      collection: 'cart',
      where: {
        user: {
          equals: userId
        }
      }
    });

    // Normalize items to expected shape: relationship ids, not full objects
    const normalizedItems = (Array.isArray(items) ? items : []).map(
      (item: {product?: {id: string} | string; quantity?: number}) => ({
        product:
          typeof item?.product === 'object' ? item.product.id : item?.product,
        quantity: item?.quantity ?? 1
      })
    );

    if (carts.docs.length > 0) {
      const cartId = carts.docs[0].id;
      await localPayload.update({
        collection: 'cart',
        id: cartId,
        data: {
          items: normalizedItems
        }
      });
    } else {
      await localPayload.create({
        collection: 'cart',
        data: {
          items: normalizedItems,
          user: userId
        }
      });
    }

    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
