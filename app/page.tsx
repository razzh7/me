import Link from 'next/link'

const Divider = () => <div className="w-[100px] h-[1px] mx-auto my-6 bg-muted"></div>

const Home = () => (
  <div className="container px-5 py-10">
    <p className="font-[800] text-4xl text-secondary mb-7">Razzh</p>
    <article className="text-base font-[500] leading-8 text-primary">
      <div>
        Hey, I am Razzh, "ra" is the abbreviation of my hometown: Ruian Wenzhou, China.
        <p>"zzh" is the Chinese abbreviation of my name. My friends all call me Xiǎoháo.</p>
        <Divider />
        <div className="mx-0 my-5">
          The current focus is on the <span className="font-base text-secondary">front-end</span>, use{' '}
          <span className="font-base text-secondary">Vue</span> in work and learning{' '}
          <span className="font-base text-secondary">React</span> ecosystem now.
          <div>
            I have been paying attention to the cutting-edge technology in the front-end, and
            make
            <p>
              attempts some{' '}
              <Link href="/projects" className="font-base text-secondary underline decoration-primary">
                projects
              </Link>{' '}
              like: twist-icons | Soyeux | maserati-crawler | vue3-taro3-template.
            </p>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        Outside of programming, I enjoy guiter solo and piano music in{' '}
        <span className="font-base text-secondary">Bilibili</span>, But I don't play them myself.
      </div>
      <Divider />
      <div>
        <p>
          Find me on{' '}
          <a
            className="font-base text-secondary underline decoration-primary"
            href="https://github.com/razzh7"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          ,{' '}
          <a
            className="font-base text-secondary underline decoration-primary"
            href="https://twitter.com/razzhAvenir"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          .
        </p>
        <p>
          <span className="font-base text-secondary underline decoration-primary">Mail me at: razzhavenir@163.com</span>.
        </p>
      </div>
    </article>
  </div>
)

export default Home
