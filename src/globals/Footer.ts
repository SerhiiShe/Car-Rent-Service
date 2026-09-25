import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }: any) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '+1 (555) 123-4567',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Contact Email',
      defaultValue: 'hello@rentcar.com',
    },
    {
      name: 'customLinks',
      type: 'array',
      label: 'Custom Page Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Optional: override the link text (leave blank to use the page title)',
          },
        },
      ],
    },
  ],
}
