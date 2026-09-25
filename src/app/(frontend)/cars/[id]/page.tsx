import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import RentalForm from './RentalForm'

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config })

  try {
    const car = await payload.findByID({
      collection: 'cars',
      id,
      depth: 1,
    })

    if (!car) return notFound()

    const imageUrl =
      typeof car.image === 'object' && car.image?.url ? car.image.url : '/placeholder-car.png'

    return (
      <div className="max-w-5xl mx-auto p-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
          <img src={imageUrl} alt={car.model} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{car.model}</h1>
          <div className="text-3xl font-semibold text-gray-800 mb-8">
            ${car.pricePerDay} <span className="text-lg font-normal text-gray-500">/ day</span>
          </div>

          {car.isAvailable ? (
            <RentalForm carId={car.id} />
          ) : (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl font-medium border border-red-100 text-center text-lg">
              This car is currently unavailable for rent.
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
}
