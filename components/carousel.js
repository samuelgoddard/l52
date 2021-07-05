import React, { useEffect } from "react";
import Image from 'next/image'
import ImageWrapper from '@/helpers/image-wrapper'
import { useEmblaCarousel } from "embla-carousel/react";
import Link from "next/link";
import ConditionalWrap from 'conditional-wrap';

const Carousel = ({ slides, teaser }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    loop: true,
    align: 'center',
    containScroll: "trimSnaps"
  });

  useEffect(() => {
    if (!embla) return;
  }, [embla]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <ConditionalWrap
              condition={!!teaser}
              key={index}
              wrap={children => (
                <Link href={`/${item.slug.current}`}>
                  <a className="embla__slide pl-0 md:pl-0 xl:pl-0 2xl:pl-0 group">
                    {children}
                  </a>
                </Link>
              )}
            >
              <div className="embla__slide">
                <div className="embla__slide__inner mb-2">
                  <div className="embla__slide__img bg-gray-100">
                    <div className="group-hover:scale-110 transition ease-in-out duration-500">
                      <ImageWrapper
                        className="w-full h-full object-cover object-center"
                        image={teaser ? item.teaserImage.asset : item.asset}
                        alt="L52 Logo"
                        baseWidth={550}
                        baseHeight={900}
                        fill={true}
                        priority
                      />
                    </div>
                  </div>
                </div>
                
                { teaser ? (
                  <>
                    <span className="text-blue uppercase block mb-px">{item.title}</span>
                    <span className="text-black uppercase block text-xs opacity-75">{item.teaserSubtitle}</span>
                  </>
                ) : (
                  <>
                    <span className="text-black uppercase block text-xs md:text-sm opacity-75">{index + 1}/{slides.length}</span>
                  </>
                )}
              </div>
            </ConditionalWrap>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;