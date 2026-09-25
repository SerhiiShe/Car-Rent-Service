import type { GlobalConfig } from 'payload'

export const CarsPage: GlobalConfig = {
  slug: 'cars-page',
  label: 'Cars Page Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }: any) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Hero Heading',
      defaultValue: 'Our Premium Fleet',
      required: true,
    },
    {
      name: 'heroText',
      type: 'textarea',
      label: 'Hero Description text',
      defaultValue: 'Choose from our exclusive selection of luxury and performance vehicles.',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
}
