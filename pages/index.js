import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Carousel from '@/components/carousel'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from 'framer-motion'
import SanityPageService from '@/services/sanityPageService'
import { NextSeo } from 'next-seo'
import Div100vh from 'react-div-100vh'
import Image from 'next/image'
import logo from '@/public/images/logo-white.svg'
import login from '@/public/images/login.webp'
import { useSession } from "next-auth/client";

const query = `{
  "clients": *[_type == "client"]{
    title,
    teaserSubtitle,
    teaserImage{
      asset->{
        ...
      }
    },
    slug {
      current
    },
  }
}`

const pageService = new SanityPageService(query)

export default function Home(initialData) {
  const [session, loading] = useSession();
  const { data: { clients }  } = pageService.getPreviewHook(initialData)()
  
  if (loading) {
    return (
      <Div100vh>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full text-center">
            <p className="text-sm">Loading...</p>
          </div>
        </div>
      </Div100vh>
    );
  }

  return (
    <Layout>
      <NextSeo title="Home" />
      {!session && (
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

              <a href={'/auth/signin'} className="text-black px-4 py-3 rounded-md bg-white hover:opacity-75 focus:opacity-75 transition ease-in-out duration-300 text-sm uppercase">Enter Password</a>
            </div>
          </div>
        </Div100vh>
      )}

      {session && (
        <LazyMotion features={domAnimation}>      
          <Div100vh>
            <m.div
              initial="initial"
              animate="enter"
              exit="exit"
              className="flex flex-col h-full"
            >
              
              <Header indexActive />

              <m.div variants={fade} className="w-full flex flex-grow">
                <div className="w-full flex flex-grow justify-center items-center">
                  <div className="w-full h-full">
                    <Carousel slides={clients} teaser />
                  </div>
                </div>
              </m.div>

              <m.div variants={fade} className="w-full">
                <Footer />
              </m.div>
            </m.div>
          </Div100vh>
        </LazyMotion>
      )}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const props = await pageService.fetchQuery(context)
  return { 
    props
  };
}
