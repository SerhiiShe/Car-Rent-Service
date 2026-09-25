import { getPayload } from 'payload'
import config from '@payload-config'
import RenderBlocks from '@/components/blocks/RenderBlocks'

export const dynamic = 'force-dynamic'

export default async function HomePageRoute() {
  const payload = await getPayload({ config })

  const homePage = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
  })

  if (!homePage || !homePage.layout || homePage.layout.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-gray-50 p-10 text-center rounded-xl border">
          <p className="text-xl font-medium text-gray-700">The Home Page is empty.</p>
          <p className="text-gray-500 mt-2">
            Go to Payload Admin &rarr; Globals &rarr; Home Page to add blocks.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20">
      <RenderBlocks layout={homePage.layout} />
    </div>
  )
}
