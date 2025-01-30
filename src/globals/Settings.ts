import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: 'Globals',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'siteName',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'companyInfo',
              type: 'group',
              fields: [
                {
                  name: 'email',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                },
                {
                  name: 'address',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            {
              name: 'socialMedia',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultSEO',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Scripts',
          fields: [
            {
              name: 'headerScripts',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Scripts to be included in <head>',
              },
            },
            {
              name: 'footerScripts',
              type: 'code',
              admin: {
                language: 'html',
                description: 'Scripts to be included before </body>',
              },
            },
          ],
        },
      ],
    },
  ],
}
