import Layout from '@/components/Layout'
import { AppProps } from 'next/app'
import '@/styles/global.css'
import '@/styles/scrollbar.css'
import '@/styles/markdown.css'
import '@/styles/prose.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
