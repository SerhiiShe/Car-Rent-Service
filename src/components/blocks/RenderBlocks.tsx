import HeroBlock from './HeroBlock'
import ContentBlock from './ContentBlock'
import CarsSliderBlock from './CarsSliderBlock'
import FeaturesBlock from './FeaturesBlock'

const components: any = {
  hero: HeroBlock,
  content: ContentBlock,
  carsSlider: CarsSliderBlock,
  features: FeaturesBlock,
}

export default function RenderBlocks({ layout }: { layout?: any[] | null }) {
  if (!layout || !Array.isArray(layout)) return null

  return (
    <>
      {layout.map((block, index) => {
        const BlockComponent = components[block.blockType]

        if (BlockComponent) {
          return <BlockComponent key={index} {...block} />
        }

        return (
          <div key={index} className="p-4 bg-red-50 text-red-500">
            Missing component for block: {block.blockType}
          </div>
        )
      })}
    </>
  )
}
