import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  const payload = await getPayload({ config })

  const headersList = await headers()

  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    redirect('/login')
  }

  const { docs: rentals } = await payload.find({
    collection: 'rentals',
    where: {
      customer: {
        equals: user.id,
      },
    },
    depth: 2,
  })

  return (
    <div className="max-w-4xl mx-auto p-6 mt-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 flex flex-col md:flex-row gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Profile</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <span className="font-medium text-gray-900">Name:</span> {user.fullName || 'N/A'}
            </p>
            <p>
              <span className="font-medium text-gray-900">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium text-gray-900">Phone:</span> {user.phone || 'N/A'}
            </p>
            <p>
              <span className="font-medium text-gray-900">Account Type:</span>{' '}
              <span className="capitalize">{user.role}</span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Rental Requests</h2>

      {rentals.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-center">
          <p className="text-gray-600 mb-6 text-lg">You haven't made any rental requests yet.</p>
          <Link
            href="/cars"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Browse Fleet
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental: any) => {
            const carModel =
              typeof rental.car === 'object' && rental.car ? rental.car.model : 'Car unavailable'

            return (
              <div
                key={rental.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{carModel}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(rental.startDate).toLocaleDateString()} —{' '}
                    {new Date(rental.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider ${
                      rental.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : rental.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {rental.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
