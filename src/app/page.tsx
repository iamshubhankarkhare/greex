import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'

export default function Home() {
  return (
    <main className="h-full flex items-center justify-center">
      Landing page
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </main>
  )
}
