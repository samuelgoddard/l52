export default function FancyLink( {destination, label, fast} ) {
  return (
    <a href={destination} rel="noopener noreferrer" target="_blank" className="block uppercase text-xs relative md:text-sm group">
      <span className="opacity-100 group-hover:opacity-0 group-focus:opacity-0 transition ease-in-out duration-300">{label}</span>
      <div className="absolute opacity-0 inset-0 w-full group-hover:opacity-100 group-focus:opacity-100 transition ease-in-out duration-300">
        <div className="relative flex overflow-x-hidden">
          <div className={`whitespace-nowrap ${fast ? 'animate-marqueeFast' : 'animate-marquee'}`}>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
          </div>

          <div className={`absolute top-0 whitespace-nowrap ${fast ? 'animate-marquee2Fast' : 'animate-marquee2'}`}>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
            <span className="mx-1">{label}</span>
          </div>
        </div>
      </div>
    </a>
  )
}