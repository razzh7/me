import Head from 'next/head'
import Link from 'next/link'
import Wrapper from '@/components/Wrapper'
import styles from '@/styles/home.module.css'

const Home = () => {
  return (
    <Wrapper>
      <Head>
        <title>Xiaohao's Blog</title>
        <meta name="author" content="Xiaohao Razzh" />
        <meta
          name="keywords"
          content="blog, razzh,razzh blog,xiaohao,xiaohao's blog,Xiaohao's Blog,小豪的博客"
        />
        <meta name="description" content="xiaohao personal blog" />
        <meta property="og:title" content="Xiaohao's Blog" />
        <meta property="og:description" content="Xiaohao's Front Blog" />
        <meta property="og:url" content="https://kanmalu.com/" />
        <link rel="canonical" href="https://kanmalu.com/" />
      </Head>
      <div className={styles.container}>
        <p className={styles.name}>Razzh</p>
        <article className={styles.content}>
          <div>
            Hi, I&apos;m razzh, "ra" is the abbreviation of my hometown: Ruian Wenzhou, China.
            <p>"zzh" is the Chinese abbreviation of my name. My friends all call me Xiǎoháo.</p>
            <Divider />
            <div style={{ margin: `${20}px ${0}` }}>
              The current focus is on the <span className={styles.stress}>front-end</span>, use{' '}
              <span className={styles.stress}>Vue</span> in work and learning{' '}
              <span className={styles.stress}>React</span> ecosystem now.
              <div>
                I have been paying attention to the cutting-edge technology in the front-end, and
                make
                <p>
                  attempts some{' '}
                  <Link href="/projects" className={styles.textLink}>
                    projects
                  </Link>{' '}
                  like: Soyeux | maserati-crawler | vue3-taro3-template.
                </p>
              </div>
            </div>
          </div>
          <Divider />
          <div>
            Outside of programming, I enjoy guiter solo and piano music in{' '}
            <span className={styles.stress}>Bilibili</span>, But I don't play them myself.
          </div>
          <Divider />
          <div>
            <p>
              Find me on{' '}
              <a
                className={styles.textLink}
                href="https://github.com/rzhAvenir"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
              ,{' '}
              <a
                className={styles.textLink}
                href="https://twitter.com/razzhAvenir"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              .
            </p>
            <p>
              <span className={styles.textLink}>Mail me at: razzhavenir@163.com</span>.
            </p>
          </div>
        </article>
      </div>
    </Wrapper>
  )
}

const Divider = () => {
  return <div className={styles.divider}></div>
}

export default Home
