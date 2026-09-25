import type { CollectionConfig } from 'payload'

const isAdmin = ({ req: { user } }: any) => {
  return user?.role === 'admin'
}

const isAdminOrSelf = ({ req: { user } }: any) => {
  if (!user) return false
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: isAdmin,
    create: () => true,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      defaultValue: 'customer',
      required: true,
      label: 'Role',
      access: {
        update: isAdmin,
      },
    },
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
  ],
}
