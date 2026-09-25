import type { CollectionConfig, Access } from 'payload'

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

const filterByUser: Access = ({ req: { user } }) => {
  if (!user) return false

  if (user.role === 'admin') return true

  return {
    customer: {
      equals: user.id,
    },
  }
}

export const Rentals: CollectionConfig = {
  slug: 'rentals',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: filterByUser,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'car',
      type: 'relationship',
      relationTo: 'cars',
      required: true,
      label: 'Car',
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Customer',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      label: 'Rental Status',
    },
    {
      type: 'row',
      fields: [
        { name: 'startDate', type: 'date', required: true, label: 'Start Date' },
        { name: 'endDate', type: 'date', required: true, label: 'End Date' },
      ],
    },
  ],
}
