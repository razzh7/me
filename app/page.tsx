"use client"
import Link from 'next/link'
import Footer from '@/components/layout/footer'
// import { BiTwitterX } from '@twist-space/react-icons/bi'
import { TiLogoGithub } from '@twist-space/react-icons/ti'
import { AiBilibiliOutlined as BIcon } from '@twist-space/react-icons/ai'

const Divider = () => <div className="w-[60px] h-[1px] mx-auto my-6 bg-muted"></div>
const Text = ({ children }: {children: React.ReactNode}) => <span className="text-secondary mx-1">{children}</span>
const OutLink = ({ link, children }: {link: string, children: React.ReactNode}) => (
  <a className="flex items-center gap-1 font-base text-secondary border-b-[1px] border-link decoration-primary"
    href={link}
    target="_blank"
    rel="noreferrer">
    {children}
  </a>
)
const Home = () => (
  <div className="container px-5 py-10">
    <p className="font-[800] text-4xl text-secondary mb-7">Razzh</p>
    <article className="text-base font-[500] leading-8 text-primary slide-enter-content">
      <div>
        Hey, I am Robin, also known as Razzh, a front developer, "ra" is the abbreviation of my hometown: Ruian Wenzhou, China.
        "zzh" is the Chinese abbreviation of my name. My friends call me Xiǎoháo as my nickname.
        <Divider />
        <div className="mx-0 my-5">
          I have been keeping up with cutting-edge
          <Text>front-end</Text> technologies, and have used
          <Text>Vue</Text>
          and
          <Text>React</Text>
          to build
          <Text>
            <Link href="/projects" className="font-base text-secondary underline decoration-primary">
              projects
            </Link>
          </Text>
          like
          <Text>
            <a href="https://icons.razzh.cn/" target="_blank" rel="noreferrer">Twist-Icons</a>
          </Text>.
          In my leisure time, I am also exploring the
          <Text>back-end</Text>
          ecosystem, including Node.js and Java.
        </div>
      </div>
      <Divider />
      <div>
        Outside of programming, I enjoy guitar solos and piano music on
        <Text>Bilibili</Text>,
        playing esports, and watching TV dramas.
      </div>
      <Divider />
      <div>
        <p className="flex gap-2">
          <span>Find me on</span>
          <OutLink link='https://github.com/razzh7'>
            <TiLogoGithub size={17} />
            Github
          </OutLink>
          <OutLink link='https://space.bilibili.com/281435222?spm_id_from=333.33.0.0'>
            <BIcon size={17} />
            Bilibili
          </OutLink>
          {/* <OutLink link='https://twitter.com/razzhAvenir'>
            <BiTwitterX size={17} />
            Twitter
          </OutLink> */}
        </p>
        <p className="leading-10">
          <span className="font-base text-secondary underline decoration-primary">Mail me at: razzhavenir@163.com</span>
        </p>
      </div>
    </article>
    <Footer />
  </div>
)

export default Home
