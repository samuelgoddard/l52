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
import logo from '@/public/images/logo.svg'
import { signIn, useSession } from "next-auth/client";

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
            <div className="w-full text-center">
              <div className="w-[240px] mx-auto mb-4">
                <Image
                  src={logo}
                  alt="L52 Logo"
                  layout="responsive"
                  className="w-full"
                  priority
                />

                <span className="block uppercase text-xs md:text-sm mt-1">
                  Digital Showroom
                </span>
              </div>

              <button className="text-white px-3 py-2 rounded-md bg-black hover:bg-off-black focus:bg-off-black transition ease-in-out duration-300" onClick={signIn}>Enter Password To Enter</button>
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
