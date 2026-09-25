import Link from 'next/link'

export default function HeroBlock({ heading, subheading, backgroundImage }: any) {
  const bgUrl =
    typeof backgroundImage === 'object' && backgroundImage?.url
      ? backgroundImage.url
      : '/placeholder-car.jpg'

  return (
    <section className="relative bg-black text-white py-32 px-6 text-center mx-4 mt-6 rounded-3xl overflow-hidden shadow-xl">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />

      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-6">{heading}</h1>
        {subheading && (
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">{subheading}</p>
        )}
        <Link
          href="/cars"
          className="bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors"
        >
          Explore Our Fleet
        </Link>
      </div>
    </section>
  )
}
