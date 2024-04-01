'use client'

import React from 'react'
import { gsap } from 'gsap'
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const landingPageRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    if (!landingPageRef.current) return

    // Create a timeline for the animation sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    // Set initial background color to black
    landingPageRef.current.style.backgroundColor = '#030712'

    // Background Gradient Animation
    const gradient = gsap.to(landingPageRef.current, {
      duration: 1,
      backgroundImage: `linear-gradient(to bottom, #030712 60%, #06294f 100%)`,
    })

    // Apply gradient background to all text elements
    const textElements = landingPageRef.current.querySelectorAll(
      'p, span',
    ) as unknown as HTMLElement[]

    textElements.forEach((textElement) => {
      const fromGradient =
        textElement instanceof HTMLParagraphElement ? '#f44336' : '#fff'
      const toGradient =
        textElement instanceof HTMLParagraphElement ? '#e91e63' : '#e0e0e0'
      textElement.style.background = `-webkit-linear-gradient(45deg, ${fromGradient}, ${toGradient})`
      textElement.style.backgroundClip = 'text'
      textElement.style.color = 'transparent'
    })

    // "Netflix-style" Animation: Scale-up and fade-out Lorem Ipsum
    const loremElement = landingPageRef.current.querySelector('.slogan')
    const loremAnimation = gsap.to(loremElement, {
      duration: 2,
      scale: 30,
      opacity: 0,
      delay: 1,
    })

    // Fade-in existing content with slight scale-up
    const contentFadeIn = gsap.to(
      landingPageRef.current.querySelectorAll('div:not(.slogan), p'), // Exclude Lorem Ipsum
      {
        duration: 1,
        opacity: 1,
        scale: 1.05,
        delay: 0.5, // Delay after first slogan animation
      },
    )

    // Add animations to the timeline in the desired order
    tl.add(gradient).add(loremAnimation).add(contentFadeIn)

    // Play the timeline on component mount
    tl.play()

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <main
      ref={landingPageRef}
      className="h-screen flex flex-col justify-center items-center text-white"
    >
      <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center opacity-1 text-white text-5xl slogan py-5">
        <span className="text-5xl p-5">
          A new era of crypto trading is here
        </span>
      </div>

      <div className="text-4xl font-bold mb-8 opacity-0">
        <span> Welcome to GreeX Crypto Exchange</span>
      </div>
      <p className="text-lg mb-12 opacity-0">
        Buy, sell, and trade cryptocurrency options with ease.
      </p>
      <div className="flex space-x-4 opacity-0">
        <LoginLink>
          <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </LoginLink>
        <RegisterLink>
          <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </button>
        </RegisterLink>
      </div>
    </main>
  )
}

export default Home

//
// import React from 'react'
// import { gsap } from 'gsap'
// import {
//   RegisterLink,
//   LoginLink,
// } from '@kinde-oss/kinde-auth-nextjs/components'
//
// interface HomeProps {}
//
// const Home: React.FC<HomeProps> = () => {
//   const landingPageRef = React.createRef<HTMLDivElement>()
//
//   React.useEffect(() => {
//     if (!landingPageRef.current) return
//
//     // Create a timeline for the animation sequence
//     const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
//
//     // Set initial background color to black
//     landingPageRef.current.style.backgroundColor = '#030712'
//
//     // Background Gradient Animation
//     const gradient = gsap.to(landingPageRef.current, {
//       duration: 1,
//       backgroundImage: `linear-gradient(to bottom, #030712 60%, #06294f 100%)`,
//     })
//
//     const loremElement = document.getElementsByClassName('slogan')[0]
//     // "Netflix-style" Animation: Scale-up and fade-out Lorem Ipsum
//     const loremAnimation = gsap.to(loremElement, {
//       duration: 2,
//       scale: 30,
//       opacity: 0,
//       delay: 1,
//     })
//
//     // Fade-in existing content with slight scale-up
//     const contentFadeIn = gsap.to(
//       landingPageRef.current.querySelectorAll('div:not(.slogan), p'), // Exclude Lorem Ipsum
//       {
//         duration: 1,
//         opacity: 1,
//         scale: 1.05,
//         delay: 0.5, // Delay after first slogan animation
//       },
//     )
//
//     // Add animations to the timeline in the desired order
//     tl.add(gradient).add(loremAnimation).add(contentFadeIn)
//
//     // Play the timeline on component mount
//     tl.play()
//
//     return () => {
//       tl.kill()
//     }
//   }, [])
//
//   return (
//     <main
//       ref={landingPageRef}
//       className="h-screen flex flex-col justify-center items-center text-white"
//     >
//       <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center opacity-1 text-white text-7xl slogan">
//         A new era of crypto trading
//       </div>
//
//       <div className="text-4xl font-bold mb-8 opacity-0">
//         Welcome to GreeX Crypto Exchange
//       </div>
//       <p className="text-lg mb-12 opacity-0">
//         Buy, sell, and trade cryptocurrency options with ease.
//       </p>
//       <div className="flex space-x-4 opacity-0">
//         <LoginLink>
//           <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
//             Sign In
//           </button>
//         </LoginLink>
//         <RegisterLink>
//           <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
//             Sign Up
//           </button>
//         </RegisterLink>
//       </div>
//     </main>
//   )
// }
//
// export default Home
