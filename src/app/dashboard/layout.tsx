import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const options = [
    'Markets',
    'Portfolio',
    'Settings',
    'Support',
    'Referral',
    'About us',
  ]
  return (
    <section className="h-screen flex flex-col">
      <nav className=" text-white py-3 px-6 flex items-center justify-between  bg-gray-900">
        <span>GreeX 🚀</span>
        <div className="flex items-center ml-24">
          {options.map((option) => (
            <span key={option} className="mx-4 capitalize">
              {option}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <span className="capitalize px-4 py-2 rounded-full bg-[#030712] mr-3 flex items-center justify-between">
            <Avatar className="w-5 h-5 mr-2">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="w-5 h-5"
              />
              <AvatarFallback className="w-5 h-5">
                {/* initials of the user */}
                {user && user.given_name && user?.given_name.substr(0, 1)}
              </AvatarFallback>
            </Avatar>
            {user?.given_name} {user?.family_name}
          </span>
          <LogoutLink>Log out</LogoutLink>
        </div>
      </nav>
      <main className="h-full overflow-hidden">{children}</main>
    </section>
  )
}
