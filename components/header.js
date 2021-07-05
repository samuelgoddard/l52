import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/images/logo.svg'

export default function Header({ indexActive }) {
  return (
    <header className="px-[25px] py-[35px] md:px-[35px] md:py-[45px] xl:py-[55px] xl:px-[65px] w-full">
      <Link href="/">
        <a className="block w-[200px] mb-3 md:mb-2">
          <Image
            src={logo}
            alt="L52 Logo"
            layout="responsive"
            className="w-full"
            priority
          />
        </a>
      </Link>

      <div className="flex flex-wrap items-start">
        <div className="w-auto">
          <span className="block uppercase text-xs md:text-sm">
            Digital Showroom
          </span>
        </div>

        <div className="ml-auto flex items-center">
          <Link href="/">
            <a aria-label="Navigate to about page" className={`block md:inline-block uppercase hover:opacity-75 focus:opacity-75 text-xs md:text-sm transition ease-in-out duration-300 ${indexActive ? 'border-b border-black' : 'border-b border-white'}`}>
              Brands
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}