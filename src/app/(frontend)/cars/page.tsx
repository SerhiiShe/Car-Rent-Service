import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export const revalidate = 60

export default async function CarsCatalogPage() {
  const payload = await getPayload({ config })

  const pageSettings = await payload.findGlobal({
    slug: 'cars-page',
    depth: 1,
  })

  const { docs: cars } = await payload.find({
    collection: 'cars',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car: any) => {
            const imageUrl =
              typeof car.image === 'object' && car.image?.url
                ? car.image.url
                : '/placeholder-car.jpg'
            return (
              <div
                key={car.id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="h-56 bg-gray-100">
                  <img src={imageUrl} alt={car.model} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{car.model}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{car.description}</p>
                  <p className="text-lg font-medium text-black">${car.pricePerDay} / day</p>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <Link
                    href={`/cars/${car.id}`}
                    className="block w-full text-center bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    View Details
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
