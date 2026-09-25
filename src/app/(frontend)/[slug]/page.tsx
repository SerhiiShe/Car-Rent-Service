import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import RenderBlocks from '@/components/blocks/RenderBlocks'

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
  })

  const page = docs[0]

  if (!page) return notFound()

  return (
    <div className="pb-20">
      <RenderBlocks layout={page.layout} />
    </div>
  )
}
