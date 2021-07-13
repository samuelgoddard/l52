import Div100vh from 'react-div-100vh'
import Image from 'next/image'
import login from '@/public/images/login.webp'
import { getCsrfToken } from 'next-auth/client'

export default function SignIn({ csrfToken }) {
  return (
    <Div100vh>
      <div className="w-full h-full flex items-center justify-center relative">

        <div className="absolute inset-0 z-0 bg-blue">
          <Image
            src={login}
            alt="L52 Login Splash"
            layout="fill"
            className="w-full object-cover object-center mix-blend-overlay"
            priority
          />
        </div>

        <span className="absolute top-0 left-0 uppercase text-xs text-[20px] md:text-[42px] xl:text-[64px] mt-[50px] md:mt-[75px] font-light ml-[35px] md:ml-[50px] text-white">
          L52
        </span>

        <span className="absolute top-0 right-0 uppercase text-xs text-[20px] md:text-[42px] xl:text-[64px] mt-[50px] md:mt-[75px] font-light mr-[35px] md:mr-[50px] text-right text-white">
          Communications
        </span>

        <span className="absolute bottom-0 left-0 uppercase text-xs text-[20px] md:text-[42px] xl:text-[64px] mb-[50px] md:mb-[75px] font-light ml-[35px] md:ml-[50px] text-white">
          Digital
        </span>

        <span className="absolute bottom-0 right-0 uppercase text-xs text-[20px] md:text-[42px] xl:text-[64px] mb-[50px] md:mb-[75px] font-light mr-[35px] md:mr-[50px] text-right text-white">
          Showroom
        </span>

        <div className="w-full text-center text-white relative z-10">

          <form method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
            <label className="w-full block max-w-[250px] mx-auto mb-3">
              <span className="block uppercase text-xs mb-1 sr-only">USERNAME</span>
              <input name='username' type='text' className="w-full max-w-[200px] mx-auto block text-black px-3 py-3 text-center text-sm" placeholder="USERNAME" />
            </label>

            <label className="w-full block max-w-[250px] mx-auto mb-5">
              <span className="block uppercase text-xs mb-1 sr-only">PASSWORD</span>
              <input name='password' type='password' className="w-full max-w-[200px] mx-auto block text-black px-3 py-3 text-center text-sm" placeholder="PASSWORD" />
            </label>
            

            <button type='submit' className="text-white px-5 md:px-6 py-3 md:py-4 uppercase border md:text-lg border-[#f7ff00] hover:border-white focus:border-white transition ease-in-out duration-300">Sign in</button>
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
