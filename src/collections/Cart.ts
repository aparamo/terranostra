import type {CollectionConfig} from 'payload';

export const Cart: CollectionConfig = {
  slug: 'cart',
  admin: {
    useAsTitle: 'id'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products'
        },
        {
          name: 'quantity',
          type: 'number'
        }
      ]
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users'
    }
  ]
};
