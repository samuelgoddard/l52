import Div100vh from 'react-div-100vh'
import Image from 'next/image'
import logo from '@/public/images/logo-white.svg'
import login from '@/public/images/login.webp'
import { getCsrfToken } from 'next-auth/client'

export default function SignIn({ csrfToken }) {
  return (
    <Div100vh>
      <div className="w-full h-full flex items-center justify-center">

        <div className="absolute inset-0 z-0 bg-blue">
          <Image
            src={login}
            alt="L52 Login Splash"
            layout="fill"
            className="w-full object-cover object-center mix-blend-overlay"
            priority
          />
        </div>

        <div className="w-full text-center text-white relative z-10">
          <div className="w-[280px] mx-auto mb-6">
            <Image
              src={logo}
              alt="L52 Logo"
              layout="responsive"
              className="w-full"
              priority
            />

            <span className="block uppercase text-xs md:text-sm mt-2">
              Digital Showroom
            </span>
          </div>

          <form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
            <label className="w-full block max-w-[250px] mx-auto mb-3">
              <span className="block uppercase text-xs mb-1">Username</span>
              <input name='username' type='text' className="w-full block text-black px-3 py-2" />
            </label>

            <label className="w-full block max-w-[250px] mx-auto mb-5">
              <span className="block uppercase text-xs mb-1">Password</span>
              <input name='password' type='password' className="w-full block text-black px-3 py-2" />
            </label>
            

            <button type='submit' className="text-black px-4 py-3 rounded-md bg-white hover:opacity-75 focus:opacity-75 transition ease-in-out duration-300 text-sm uppercase">Sign in</button>
          </form>
        </div>
      </div>
    </Div100vh>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}
