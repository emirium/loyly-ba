import { GlobalConfig } from 'payload'

export const Prefooter: GlobalConfig = {
  slug: 'prefooter',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      admin: {
        description: 'Add items that will appear in the prefooter section',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
