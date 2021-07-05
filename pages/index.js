import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Carousel from '@/components/carousel'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from 'framer-motion'
import SanityPageService from '@/services/sanityPageService'
import { NextSeo } from 'next-seo'
import Div100vh from 'react-div-100vh'
import { signIn, signOut, useSession } from "next-auth/client";

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
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <NextSeo title="Home" />
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
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
