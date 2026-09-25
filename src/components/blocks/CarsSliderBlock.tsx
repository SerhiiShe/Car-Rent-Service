import Link from 'next/link'

export default function CarsSliderBlock({ heading, cars }: any) {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">{heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {cars?.map((carItem: any) => {
          const car = typeof carItem === 'object' ? carItem : null
          if (!car) return null

          const imageUrl =
            typeof car.image === 'object' && car.image?.url ? car.image.url : '/placeholder-car.jpg'

          return (
            <div
              key={car.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-56 bg-gray-100">
                <img src={imageUrl} alt={car.model} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{car.model}</h3>
                <p className="text-gray-600 font-medium">${car.pricePerDay} / day</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center">
        <Link href="/cars" className="font-semibold text-black hover:underline text-lg">
          View All Cars &rarr;
        </Link>
      </div>
    </section>
  )
}
