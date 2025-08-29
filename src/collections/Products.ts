import {CollectionConfig} from 'payload';
import {stripeProxy} from '@payloadcms/plugin-stripe';
import {Product} from '@/payload-types';

const syncPriceWithStripe = async (doc: Product, previousDoc: Product) => {
  const {price, stripeID, stripePriceID} = doc;

  // Only sync if the price has changed
  if (price === previousDoc?.price) {
    return;
  }

  try {
    // If there's an existing price, archive it
    if (stripePriceID) {
      await stripeProxy({
        stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
        stripeMethod: 'prices.update',
        stripeArgs: [stripePriceID, {active: false}]
      });
    }

    // Create a new price
    const newPriceResponse = await stripeProxy({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
      stripeMethod: 'prices.create',
      stripeArgs: [
        {
          unit_amount: price * 100,
          currency: 'usd',
          product: stripeID
        }
      ]
    });

    // Update the product with the new price ID
    await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/products/${doc.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`
        },
        body: JSON.stringify({
          stripePriceID: newPriceResponse.data?.id
        })
      }
    );
  } catch (error) {
    console.error('Error syncing price with Stripe:', error);
  }
};

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name'
  },
  access: {
    read: () => true
  },
  hooks: {
    afterChange: [
      (args) => {
        if (args.operation === 'create' || args.operation === 'update') {
          syncPriceWithStripe(args.doc, args.previousDoc);
        }
      }
    ]
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      type: 'textarea'
    },
    {
      name: 'price',
      type: 'number',
      required: true
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media'
        }
      ]
    },
    {
      name: 'stripePriceID',
      type: 'text',
      admin: {
        readOnly: true
      }
    }
  ]
};
