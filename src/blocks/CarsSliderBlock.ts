import type { Block } from 'payload'

export const CarsSliderBlock: Block = {
  slug: 'carsSlider',
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'cars',
      type: 'relationship',
      relationTo: 'cars',
      hasMany: true,
    },
  ],
}
