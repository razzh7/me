"use client"
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import { BiTwitterX } from '@twistify/react-icons/bi'
import { TiLogoGithub } from '@twistify/react-icons/ti'
import { AiBilibiliOutlined as BIcon } from '@twistify/react-icons/ai'
import IconBlock from '@/components/icon/icon-blcok'

interface LinkProps {
  link: string;
  children: React.ReactNode
}
const Divider = () => <div className="w-[60px] h-[1px] mx-auto my-6 bg-muted"></div>
const Text = ({ children }: { children: React.ReactNode }) => <span className="text-secondary mx-1">{children}</span>
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
const Ruby = ({ rb, rp }: { rb: string, rp: string }) => <ruby> {rb} <rp>(</rp><rt>{rp}</rt><rp>)</rp> </ruby>

const Home = () => (
  <div className="container px-5 py-10">
    <p className="font-[800] text-4xl text-secondary">Razzh</p>
    <p className='text-sm mt-2 text-muted'>天眞的孩子找不到他的天堂</p>
    <p className='text-sm mt-1 mb-5 text-muted'>An innocent child finds no path to Paradise</p>
    <article className="linetext-base font-[500] leading-7 text-primary slide-enter-content">
      <div>
        <p className='mb-2'>Hey, I’m Razzh. I love programming and do it as my job.</p>
        <div className='mb-3'>
          Working at{" "}
          <IconBlock
            href="https://wuyasaas.com/"
            icon="/icons/wuya.svg"
            name="XI Cloud"
          />
          {" / "}
          <IconBlock
            href="https://github.com/twist-space"
            icon="/icons/twist-space-logo.svg"
            name="Twist Space"
          />
        </div>
        <p className="mx-0 my-1">
          I live in <Ruby rb='杭州' rp='Hangzhou' /> now. "zzh" is the Chinese abbreviation of my name. My friends call me <Ruby rb='小豪' rp='Xiǎoháo' /> as my nickname.
        </p>
        <Divider />
        <div className="mx-0 my-1">
          <Text>
            <InnerLink link="projects">Awesome projects</InnerLink>
          </Text>
          like:
          <div className='mt-2'>
            <IconBlock
              href="https://icons.razzh.cn/"
              icon="/icons/twist-icons.svg"
              name="Twist Icons"
            />
            {" "} - a collection of popular SVG icon libraries; all the icons on my blog come from here.
          </div>
          <div className='mt-2'>
            <IconBlock
              href="https://player.razzh.cn/"
              icon="/icons/twist-aplayer.svg"
              name="Twist Aplayer"
            />
            {""} - a shadcn ui aplayer theme for your react application; you can try it by clicking the music player in the lower‑left corner of the blog.
          </div>
        </div>
        <div className='mt-4'>
          I'm currently learning how to implement RPA with AI-driven workflows. I'm analyzing platforms like
          {" "}
          <IconBlock
            href="https://coze.ai/"
            icon="/icons/coze.jpg"
            name="Coze Studio"
          />
          {" "}and{" "}
          <IconBlock
            href="https://yindao.com/"
            icon="/icons/yindao-rpa.png"
            name="影刀 RPA"
          />
          , and if possible, I'd like to code my own implementation down the line.
        </div>
      </div>
      <Divider />
      <div>
        Outside of programming, I enjoy guitar solos and piano music on
        <Text>哔哩哔哩</Text>,
        playing esports, and watching TV dramas.
        <div className="mx-0 my-1">
          All these moments are captured in my memoirs, a collection of my life chunks. Find them <InnerLink link="memoirs">here</InnerLink>.
        </div>
      </div>
      <Divider />
      <div>
        <div>
          <p className="mb-2 md:mb-0 md:inline">Find me on</p>
          <p className="flex flex-wrap gap-2 md:inline-flex md:ml-2">
            <OutLink link='https://github.com/razzh7'>
              <TiLogoGithub size={17} />
              Github
            </OutLink>
            <OutLink link='https://twitter.com/razzhAvenir'>
              <BiTwitterX size={17} />
              Twitter
            </OutLink>
            <OutLink link='https://space.bilibili.com/281435222?spm_id_from=333.33.0.0'>
              <BIcon size={17} />
              哔哩哔哩
            </OutLink>
          </p>
        </div>
        <p className="leading-10">
          <span className="font-base text-secondary underline decoration-primary">Mail me at: razzhavenir@163.com</span>
        </p>
      </div>
    </article>
    <Footer />
  </div>
)

export default Home
