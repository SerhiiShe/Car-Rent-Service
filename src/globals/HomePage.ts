import type { GlobalConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { ContentBlock } from '../blocks/ContentBlock'
import { CarsSliderBlock } from '../blocks/CarsSliderBlock'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
    update: ({ req: { user } }: any) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, ContentBlock, CarsSliderBlock],
    },
  ],
}
