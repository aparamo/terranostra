// storage-adapter-import-placeholder
import {mongooseAdapter} from '@payloadcms/db-mongodb';
import {payloadCloudPlugin} from '@payloadcms/payload-cloud';
import {lexicalEditor} from '@payloadcms/richtext-lexical';
import path from 'path';
import {buildConfig} from 'payload';
import {fileURLToPath} from 'url';
import sharp from 'sharp';
import {stripePlugin} from '@payloadcms/plugin-stripe';

import {Users} from './collections/Users';
import {Media} from './collections/Media';
import {Products} from './collections/Products';
import {Orders} from './collections/Orders';
import {Cart} from './collections/Cart';
import {PartnerClicks} from './collections/PartnerClicks';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug
  },
  collections: [Users, Media, Products, Orders, Cart, PartnerClicks],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || ''
  }),
  sharp,
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret:
        process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET || '',
      sync: [
        {
          collection: 'products',
          stripeResourceType: 'products',
          stripeResourceTypeSingular: 'product',
          fields: [
            {
              fieldPath: 'name',
              stripeProperty: 'name'
            },
            {
              fieldPath: 'description',
              stripeProperty: 'description'
            }
            // Note: Stripe prices are managed separately.
            // We will need a custom hook to sync prices.
          ]
        }
      ]
    }),
    payloadCloudPlugin()
  ]
});
