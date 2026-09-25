import type { CollectionConfig, Access } from 'payload'

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: 'model',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'model',
      type: 'text',
      required: true,
      label: 'Make and Model',
    },
    {
      name: 'pricePerDay',
      type: 'number',
      required: true,
      label: 'Price per Day ($)',
    },
    {
      name: 'isAvailable',
      type: 'checkbox',
      defaultValue: true,
      label: 'Available for Rent',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Car Image',
    },
  ],
}
