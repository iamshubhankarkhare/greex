import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

async function Dashboard() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  console.log(user)
  return (
    <div>
      Dashboard Hello {user?.given_name} {user?.family_name}
      <LogoutLink>Log out</LogoutLink>
    </div>
  )
}

export default Dashboard
