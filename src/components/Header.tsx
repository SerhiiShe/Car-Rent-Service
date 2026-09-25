import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

export default async function Header() {
  const payload = await getPayload({ config })

  const headersList = await headers()

  const { user } = await payload.auth({ headers: headersList })

  return (
    <header className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter text-black">
          RENT<span className="text-blue-600">CAR</span>
        </Link>

        <nav className="flex items-center gap-6 font-medium text-gray-600">
          <Link href="/cars" className="hover:text-black transition-colors">
            Our Fleet
          </Link>
          <Link href="/news" className="hover:text-black transition-colors">
            News
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors">
            Contact
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
              <span className="text-sm hidden md:inline-block">
                Hi, {user.fullName?.split(' ')[0] || 'User'}
              </span>
              <Link
                href="/dashboard"
                className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
              <Link href="/login" className="hover:text-black transition-colors">
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-black text-white px-5 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
