import type { GlobalConfig } from 'payload'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'News Page Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }: any) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Hero Heading',
      defaultValue: 'Latest News & Updates',
      required: true,
    },
    {
      name: 'heroText',
      type: 'textarea',
      label: 'Hero Description text',
      defaultValue: 'Stay tuned with our latest updates, offers, and automotive news.',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
}
