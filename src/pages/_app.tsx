import Layout from '@/components/Layout'
import { AppProps } from 'next/app'
import nProgress from 'nprogress'
import Router from 'next/router'
import '@/styles/global.css'
import '@/styles/scrollbar.css'
import '@/styles/markdown.css'
import '@/styles/prose.css'
import '@/styles/nprogress.css'

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
