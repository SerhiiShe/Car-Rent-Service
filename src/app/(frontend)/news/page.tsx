import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function NewsListPage() {
  const payload = await getPayload({ config })

  const pageSettings = await payload.findGlobal({
    slug: 'news-page',
    depth: 1,
  })

  const { docs: news } = await payload.find({
    collection: 'news',
    sort: '-createdAt',
  })

  const bgUrl =
    typeof pageSettings.heroImage === 'object' && pageSettings.heroImage?.url
      ? pageSettings.heroImage.url
      : '/placeholder-car.jpg'

  return (
    <div className="pb-20">
      <section className="relative bg-black text-white py-24 px-6 text-center mx-4 mt-6 rounded-3xl overflow-hidden shadow-xl mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4">{pageSettings.heroHeading}</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">{pageSettings.heroText}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item: any) => {
            const imageUrl =
              typeof item.image === 'object' && item.image?.url ? item.image.url : null
            const date = new Date(item.createdAt).toLocaleDateString()

            return (
              <div
                key={item.id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {imageUrl && (
                  <div className="h-48 bg-gray-100">
                    <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-medium text-blue-600 mb-2 block">{date}</span>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  </div>
                  <Link
                    href={`/news/${item.id}`}
                    className="inline-block mt-4 text-black font-semibold hover:underline"
                  >
                    Read full story &rarr;
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
