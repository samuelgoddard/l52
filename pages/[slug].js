import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Carousel from '@/components/carousel'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import Div100vh from 'react-div-100vh'
import ConditionalWrap from 'conditional-wrap';
import { signIn, useSession } from "next-auth/client";

const query = `*[_type == "client" && slug.current == $slug][0]{
	title,
  collections[]{
    enquireEmailAddress,
    imagesGoogleDrive,
    lookbookPdf {
      asset->{
        ...
      },
    },
    collectionImages[]{
      asset->{
        ...
      },
    },
    title
  }
}`

const pageService = new SanityPageService(query)

export default function ClientSlug(initialData) {
  const [session, loading] = useSession();
  
  const { data: { title, collections }  } = pageService.getPreviewHook(initialData)()

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
      <NextSeo title={title} />

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
          <ConditionalWrap
            condition={!!collections?.length > 1}
            wrap={children => (
              <Div100vh>
                {children}
              </Div100vh>
            )}
          >  
            <m.div
              initial="initial"
              animate="enter"
              exit="exit"
              className={`${collections?.length > 1 ? '' : 'flex flex-col h-full' }`}
            >
              
              <Header />

              <m.div variants={fade} className="px-[25px] md:px-[35px] 2xl:px-[65px] w-full">
                <h1 className="uppercase text-[28px] md:text-[32px] leading-none">{title}</h1>
              </m.div>


              {collections?.length > 0 ? (
                <>
                  {collections.map((item, i) => {
                    return (
                      <div key={i}>
                        <m.div variants={fade} div className="w-full flex flex-wrap items-start md:items-center mb-5 px-[25px] md:px-[35px] 2xl:px-[65px]">
                          <div className="w-auto">
                            <span className="block uppercase text-xs md:text-sm text-blue">{item.title}</span>
                          </div>
                          <div className="ml-auto hidden md:block">
                            <div className="md:flex md:items-center text-right">
                              <span className="block uppercase text-xs md:text-sm md:ml-6">Enquire</span>
                              <span className="block uppercase text-xs md:text-sm md:ml-6">Download Images</span>
                              <span className="block uppercase text-xs md:text-sm md:ml-6">Download Lookbook</span>
                            </div>
                          </div>
                        </m.div>
            
                        <m.div variants={fade} className={`w-full ${collections.length > 0 ? 'h-[70vh]' : '' }`}>
                          <div className="w-full h-full flex items-center">
                            <div className="w-full h-full">
                              <Carousel slides={item.collectionImages} />
                            </div>
                          </div>
                        </m.div>
                      </div> 
                    )
                  })}
                </>
              ) : (
                <m.span variants={fade} className="block px-[25px] md:px-[35px] 2xl:px-[65px] text-sm opacity-75">Collection Coming Soon</m.span>
              )}
              

              <m.div variants={fade} className="w-full">
                <Footer />
              </m.div>
            </m.div>
          </ConditionalWrap>
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

export async function getStaticPaths() {
  const paths = await pageService.fetchPaths('client')
  return {
    paths: paths,
    fallback: true,
  };
}