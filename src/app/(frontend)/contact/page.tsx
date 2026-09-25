import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const payload = await getPayload({ config })

  const pageSettings = await payload.findGlobal({
    slug: 'contact-page',
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
          <h1 className="text-4xl md:text-6xl font-black mb-4">{pageSettings.heading}</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">{pageSettings.subheading}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

            <div className="space-y-6 text-gray-700">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="text-lg font-medium text-black">{pageSettings.phone}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="text-lg font-medium text-black">{pageSettings.email}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Address
                </p>
                <p className="text-lg font-medium text-black whitespace-pre-line">
                  {pageSettings.address}
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Working Hours
                </p>
                <p className="text-lg font-medium text-black">{pageSettings.workingHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[400px] md:h-auto min-h-[400px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          {pageSettings.mapEmbedUrl && (
            <iframe
              src={pageSettings.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}
