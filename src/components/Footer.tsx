import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Footer() {
  const payload = await getPayload({ config })

  const footerSettings = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div>
          <Link href="/" className="text-2xl font-black tracking-tighter text-black block mb-4">
            RENT<span className="text-blue-600">CAR</span>
          </Link>
          <p className="text-gray-500 mb-4 text-sm">
            Premium car rental service for those who value comfort and speed.
          </p>
          <div className="text-gray-900 font-medium space-y-1">
            <p>{footerSettings.phone}</p>
            <p>{footerSettings.email}</p>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Main Menu</h4>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cars" className="hover:text-black transition-colors">
                Our Fleet
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-black transition-colors">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-black transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Information</h4>
          <ul className="space-y-3 text-gray-600">
            {footerSettings.customLinks?.map((item: any, index: number) => {
              if (!item.page || typeof item.page !== 'object') return null

              const pageData = item.page
              const linkText = item.label || pageData.title || pageData.slug

              return (
                <li key={index}>
                  <Link href={`/${pageData.slug}`} className="hover:text-black transition-colors">
                    {linkText}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} RentCar Service. All rights reserved.
      </div>
    </footer>
  )
}
