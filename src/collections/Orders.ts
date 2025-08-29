import type {CollectionConfig} from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id'
  },
  access: {
    read: () => true,
    create: () => true
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
      name: 'total',
      type: 'number'
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users'
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        {name: 'name', type: 'text'},
        {name: 'email', type: 'email'},
        {name: 'address', type: 'text'},
        {name: 'city', type: 'text'},
        {name: 'postalCode', type: 'text'},
        {name: 'country', type: 'text'}
      ]
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text'
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      defaultValue: 'pending'
    }
  ]
};
