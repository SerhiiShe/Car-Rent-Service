'use client'

import { useState, useEffect } from 'react'

export default function RentalForm({ carId }: { carId: string | number }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'unauthorized'>(
    'idle',
  )
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetch('/api/users/me')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setUser(data.user)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setStatus('unauthorized')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          car: carId,
          customer: user.id,
          startDate,
          endDate,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit')
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-200 text-center">
        <h3 className="text-xl font-bold mb-2">Request Submitted!</h3>
        <p>Your rental request is pending approval. You can track it in your dashboard.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900">Book this car</h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border-gray-300 rounded-lg p-3 border focus:ring-black focus:border-black outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border-gray-300 rounded-lg p-3 border focus:ring-black focus:border-black outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Processing...' : 'Submit Request'}
      </button>

      {status === 'unauthorized' && (
        <p className="mt-4 text-red-600 font-medium text-center bg-red-50 p-2 rounded">
          Please log in to book a car.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600 font-medium text-center bg-red-50 p-2 rounded">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
