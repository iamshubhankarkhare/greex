import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <section className="h-screen flex flex-col">
      <nav className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <span>
          Dashboard Hello {user?.given_name} {user?.family_name}
        </span>
        <LogoutLink>Log out</LogoutLink>
      </nav>
      <main className="h-full overflow-hidden">{children}</main>
    </section>
  )
}
