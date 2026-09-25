'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-50 text-red-600 px-5 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
    >
      Log Out
    </button>
  )
}
