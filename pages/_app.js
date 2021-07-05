import '@/styles/main.css'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config';
import { Provider } from "next-auth/client";


export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} />

      <Provider session={pageProps.session}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Provider>
    </>
  )
}