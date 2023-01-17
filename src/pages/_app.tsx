import Layout from '@/components/Layout'
import { AppProps } from 'next/app'
import '@/styles/global.css'
import '@/styles/markdown.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
