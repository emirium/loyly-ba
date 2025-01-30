import { GlobalConfig } from 'payload'

export const FAQ: GlobalConfig = {
  slug: 'faq',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      admin: {
        description: 'Add items that will appear in the faq section',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
