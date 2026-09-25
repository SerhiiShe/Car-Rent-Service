import type { CollectionConfig, Access } from 'payload'

import { CarsSliderBlock } from '../blocks/CarsSliderBlock'
import { ContentBlock } from '../blocks/ContentBlock'
import { HeroBlock } from '../blocks/HeroBlock'
import { FeaturesBlock } from '../blocks/FeaturesBlock'

const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, ContentBlock, CarsSliderBlock, FeaturesBlock],
    },
  ],
}
