"use client"
import Link from 'next/link'
import Footer from '@/components/layout/footer'
// import { BiTwitterX } from '@twistify/react-icons/bi'
import { TiLogoGithub } from '@twistify/react-icons/ti'
import { AiBilibiliOutlined as BIcon } from '@twistify/react-icons/ai'

interface LinkProps {
  link: string;
  children: React.ReactNode
}
const Divider = () => <div className="w-[60px] h-[1px] mx-auto my-6 bg-muted"></div>
const Text = ({ children }: {children: React.ReactNode}) => <span className="text-secondary mx-1">{children}</span>
const OutLink = ({ link, children }: LinkProps) => (
  <a className="flex items-center gap-1 font-base text-secondary border-b-[1px] border-link decoration-primary"
    href={link}
    target="_blank"
    rel="noreferrer">
    {children}
  </a>
)
const InnerLink = ({ link, children }: LinkProps) => (
  <Link href={`/${link}`} className="font-base text-secondary underline decoration-primary">
    {children}
  </Link>
)
const Home = () => (
  <div className="container px-5 py-10">
    <p className="font-[800] text-4xl text-secondary">Razzh</p>
    <p className='text-sm mt-2 mb-5 text-muted'>Front Developer & Creative Coder</p>
    <article className="linetext-base font-[500] leading-7 text-primary slide-enter-content">
      <div>
        Hey, I am Robin, also known as Razzh, "ra" is the abbreviation of my hometown: Ruian Wenzhou, China.
        <div className="mx-0 my-1">
          I live in HangZhou now. "zzh" is the Chinese abbreviation of my name. My friends call me Xiǎoháo as my nickname.
        </div>
        <Divider />
        <div className="mx-0 my-1">
          I have been keeping up with cutting-edge
          <Text>front-end</Text> technologies, and have made
          <Text>
            <InnerLink link="projects">
              awesome projects
            </InnerLink>
          </Text>
          like:
          <div className='mt-2'>
            <Text>
              <a href="https://icons.razzh.cn/" target="_blank" rel="noreferrer">Twist-Icons</a>
            </Text>
            - a collection popular SVG icon libraries.
          </div>
          <div className='mt-2'>
            <Text>
              <a href="https://player.razzh.cn/" target="_blank" rel="noreferrer">Twist-Aplayer</a>
            </Text>
            - a shadcn ui theme aplayer for your React application.
          </div>
        </div>
        <div className='mt-4'>
          In my spare time, I am also exploring the
          <Text>back-end</Text>
            ecosystem, including Node.js and Java.
        </div>
      </div>
      <Divider />
      <div>
        Outside of programming, I enjoy guitar solos and piano music on
        <Text>哔哩哔哩</Text>,
        playing esports, and watching TV dramas.
        <div className="mx-0 my-1">
        All these moments are captured in my memoirs, a collection of my life chunks. If you are interested, you can find it <InnerLink link="memoirs">here</InnerLink>
        </div>
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
            哔哩哔哩
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
