import React, { useCallback, useEffect } from "react";
import Image from 'next/image'
import ImageWrapper from '@/helpers/image-wrapper'
import { useEmblaCarousel } from "embla-carousel/react";
import Link from "next/link";
import ConditionalWrap from 'conditional-wrap';
import { motion } from "framer-motion";
import { setupWheelGestures } from 'embla-carousel-wheel-gestures'

const slideIn = {
  initial: { x: "30%" },
  enter: { 
    x: "0%",
    transition: { duration: 1.1, ease: [0.33, 1, 0.68, 1] }
  },
  exit: {
    x: "-25%",
    opacity: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
}

const Carousel = ({ slides, teaser }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    loop: true,
    align: 0.0215,
    containScroll: "trimSnaps"
  });

  useEffect(() => embla && setupWheelGestures(embla), [embla])

  return (
      <div className="embla will-change">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container">
            {slides.map((item, index) => (
              <div className="embla__slide">
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
                    <motion.div variants={slideIn} className="embla__slide__inner mb-[1rem]">
                      <div className="embla__slide__img">
                        <div className="overflow-hidden">
                          <div className="normal-image transition ease-in-out duration-500 opacity-100 group-hover:opacity-100 group-focus:opacity-100">
                            <ImageWrapper
                              className="w-full h-full object-cover object-top transition ease-in-out duration-500 group-hover:opacity-80"
                              image={teaser ? item.teaserImage.asset : item.asset}
                              alt="L52 Logo"
                              baseWidth={1000}
                              baseHeight={1800}
                              fill={true}
                              priority
                            />
                          </div>
                          {teaser && (
                            <div className="overflow-image absolute inset-0 w-full h-full bg-black transition ease-in-out duration-500 opacity-0 group-hover:opacity-100 group-focus:opacity-100 mix-blend-hue">
                              {/* <ImageWrapper
                                className="w-full h-full object-cover object-top"
                                image={teaser ? item.teaserImage.asset : item.asset}
                                alt="L52 Logo"
                                baseWidth={1000}
                                baseHeight={1800}
                                fill={true}
                                priority
                              /> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                    
                    { teaser ? (
                      <motion.div variants={slideIn}>
                        <span className="text-blue uppercase block mb-px">{item.title}</span>
                        <span className="text-off-black uppercase block text-xs opacity-75">{item.teaserSubtitle}</span>
                      </motion.div>
                    ) : (
                      <motion.div variants={slideIn}>
                        <span className="text-off-black uppercase block text-xs md:text-sm opacity-75">{index + 1}/{slides.length}</span>
                      </motion.div>
                    )}
                </ConditionalWrap>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Carousel;