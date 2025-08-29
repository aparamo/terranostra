import {CollectionConfig} from 'payload';

export const PartnerClicks: CollectionConfig = {
  slug: 'partner-clicks',
  admin: {
    useAsTitle: 'visitorId',
    defaultColumns: [
      'visitorId',
      'partner',
      'clickCount',
      'lastClick',
      'createdAt'
    ],
    group: 'Analytics'
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => false // Prevent deletion for data integrity
  },
  fields: [
    {
      name: 'visitorId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Unique identifier for the visitor (can be session ID, IP hash, or user ID)'
      }
    },
    {
      name: 'partner',
      type: 'select',
      required: true,
      options: [
        {label: 'Caro', value: 'caro'},
        {label: 'Adri', value: 'adri'},
        {label: 'Neither', value: 'neither'}
      ],
      admin: {
        description: 'Which partner the visitor selected'
      }
    },
    {
      name: 'clickCount',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 1,
      admin: {
        description: 'Total number of clicks for this visitor'
      }
    },
    {
      name: 'lastClick',
      type: 'date',
      required: true,
      admin: {
        description: 'Timestamp of the last click',
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'Browser and device information'
      }
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP address hash for analytics (privacy compliant)'
      }
    },
    {
      name: 'referrer',
      type: 'text',
      admin: {
        description: 'Where the visitor came from'
      }
    },
    {
      name: 'sessionData',
      type: 'group',
      fields: [
        {
          name: 'sessionId',
          type: 'text',
          admin: {
            description: 'Session identifier'
          }
        },
        {
          name: 'firstVisit',
          type: 'date',
          admin: {
            description: 'First time this visitor was seen',
            date: {
              pickerAppearance: 'dayAndTime'
            }
          }
        },
        {
          name: 'totalVisits',
          type: 'number',
          defaultValue: 1,
          admin: {
            description: 'Total number of visits'
          }
        }
      ]
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        {
          name: 'country',
          type: 'text',
          admin: {
            description: 'Country detected from IP'
          }
        },
        {
          name: 'city',
          type: 'text',
          admin: {
            description: 'City detected from IP'
          }
        },
        {
          name: 'timezone',
          type: 'text',
          admin: {
            description: 'Visitor timezone'
          }
        }
      ]
    }
  ],
  hooks: {
    beforeChange: [
      ({data}) => {
        // Update lastClick timestamp on every change
        data.lastClick = new Date().toISOString();
        return data;
      }
    ]
  },
  indexes: [
    {
      fields: ['visitorId']
    },
    {
      fields: ['partner']
    },
    {
      fields: ['lastClick']
    },
    {
      fields: ['createdAt']
    }
  ]
};
