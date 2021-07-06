import FancyLink from './fancyLink'

export default function Footer() {
  return (
    <footer className="px-[25px] py-[35px] md:px-[35px] md:py-[45px] 2xl:py-[55px] 2xl:px-[65px] w-full relative z-10">
      <div className="flex flex-wrap">
        <div className="text-left">
          <FancyLink destination="mailto:TalkToUs@L52.world" label="Contact" fast/>
        </div>

        <div className="ml-auto text-right">
          <FancyLink destination="https://www.instagram.com/l52world" label="Instagram" fast/>
        </div>
      </div>
    </footer>
  )
}