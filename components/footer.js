import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-[25px] py-[35px] md:px-[35px] md:py-[45px] 2xl:py-[55px] 2xl:px-[65px] w-full relative z-10">
      <div className="flex flex-wrap">
        <div className="w-auto">
          <Link href="/">
            <a aria-label="Navigate to brands page" className="inline-block uppercase hover:opacity-75 focus:opacity-75 transition ease-in-out duration-300 text-xs md:text-sm">
              Brands
            </a>
          </Link>
        </div>

        <div className="ml-auto">
          <a href="mailto:TalkToUs@L52.world" aria-label="Navigate to about page" className="inline-block uppercase hover:opacity-75 focus:opacity-75 transition ease-in-out duration-300 text-xs md:text-sm">
            Contact
          </a>
          <a href="https://www.instagram.com/l52world" aria-label="Navigate to about page" className="inline-block ml-3 md:ml-5 uppercase hover:opacity-75 focus:opacity-75 transition ease-in-out duration-300 text-xs md:text-sm">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}