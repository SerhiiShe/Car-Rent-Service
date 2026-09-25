export default function FeaturesBlock({ heading, subheading, items }: any) {
  if (!items || items.length === 0) return null

  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{heading}</h2>
        {subheading && <p className="text-lg text-gray-600">{subheading}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-6 font-bold text-xl">
              {index + 1}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
