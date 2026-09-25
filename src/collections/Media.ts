import type { CollectionConfig, Access } from 'payload'

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
