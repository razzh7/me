'use client'
import { MdiLeafMaple, MdiAndroidDebugBridge, MdiLanguageTypescript } from '@twist-space/react-icons/mdi'
import { MiAdminPanelSettingsOutline, MiStackedLineChart, MiEditNoteSharp, MiRainyLight } from '@twist-space/react-icons/mi'
import { TaDeviceIpadMinus, TaBrandRedux, TaTemplate } from '@twist-space/react-icons/ta'
import { SkExpressjsDark } from '@twist-space/react-icons/sk'
import { SoPostsCarouselHorizontalBoldDuotone } from '@twist-space/react-icons/so'
import { AiCarOutlined } from '@twist-space/react-icons/ai'
import { BiBarChartSteps } from '@twist-space/react-icons/bi'
import { useTheme } from '@/hooks/useTheme'
import type { CSSProperties } from 'react'

function Projects() {
  const { theme } = useTheme()
  const color = theme === 'dark' ? '#ffffff' : '#060606'
  const projectsInfo = [
    {
      title: 'twist-icons',
      description: 'A collection of icons for React、Vue.',
      icon: MdiLeafMaple,
      href: 'https://twist-icons-docs.vercel.app/'
    },
    {
      title: 'me',
      description: 'My personal blog powered by Next.js.',
      icon: MiRainyLight,
      href: 'https://github.com/razzh7/me'
    },
    {
      title: 'maserati-crawler',
      description: 'A maserati car crawler program.',
      icon: MdiAndroidDebugBridge,
      href: 'https://github.com/razzh7/maserati-crawler'
    },
    {
      title: 'vue-admin',
      description: 'A elementui admin powered by Vue.',
      icon: TaDeviceIpadMinus,
      href: 'https://razzh7.github.io/vue-admin-webapp/'
    },
    {
      title: 'express-Auth',
      description: 'A json web token login demo with Express.',
      icon: SkExpressjsDark,
      href: 'https://github.com/razzh7/express-auth'
    },
    {
      title: 'vue-admin-auth',
      description: 'A permission system admin with Vue.',
      icon: MiAdminPanelSettingsOutline,
      href: 'https://github.com/razzh7/vue-express-rbac'
    },
    {
      title: 'soyeux',
      description: 'A carousel on Web with JavaScript.',
      icon: SoPostsCarouselHorizontalBoldDuotone,
      href: 'https://github.com/razzh7/soyeux'
    },
    {
      title: 'mini-redux',
      description: 'Use the most simple JavaScript to implement Redux core.',
      icon: TaBrandRedux,
      href: 'https://github.com/razzh7/mini-redux'
    },
    {
      title: 'ford-shop',
      description: 'A car shop with HTML,CSS,JavaScript.',
      icon: AiCarOutlined,
      href: 'http://razzh.gitee.io/ford-mall'
    },
    {
      title: 'vue3-taro3-template',
      description: 'A vue3 and taro3 template.',
      icon: TaTemplate,
      href: 'https://github.com/razzh7/taro-vue3-template'
    },
    {
      title: 'page-tracker',
      description: 'A page watch on Web with Typescript.',
      icon: MiStackedLineChart,
      href: 'https://github.com/razzh7/page-tracker'
    },
    {
      title: 'promise-learn',
      description: 'According to A Plus standard, use javascript implement promise',
      icon: MiEditNoteSharp,
      href: 'https://github.com/razzh7/Promise-learn'
    },
    {
      title: 'vue-learn',
      description: 'A learn demo, step by step implement Vue2.',
      icon: BiBarChartSteps,
      href: 'https://github.com/razzh7/vue-learn'
    },
    {
      title: 'starter-ts',
      description: 'A ts-template starter with Typescript.',
      icon: MdiLanguageTypescript,
      href: 'https://github.com/razzh7/starter-ts'
    }
  ]

  return (
    <div className="transition-all">
      <p className="px-2 py-0 text-3xl md:text-4xl font-[800] text-secondary mb-8 text-center">Projects</p>
      <div className="max-w-5xl mx-auto">
        <div className="block md:flex md:flex-wrap md:gap-5 md:gap-y-10 p-[10px]">
          {
            projectsInfo.map((item, idx) => {
              const { title, description, href, icon: Icon } = item

              return (
                <a
                  className="slide-enter group flex items-center gap-5 w-[350px] max-w-full p-[10px] text-primary cursor-pointer hover:bg-muted2 hover:bg-opacity-10 rounded-md transition-all"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  key={href}
                  style={{ '--enter-stage': idx + 1 } as CSSProperties}
                >
                  <div>
                    <Icon size={40} color={color} />
                  </div>
                  <div>
                    <p className="text-xl group-hover:text-secondary">{title}</p>
                    <p className="text-muted text-sm group-hover:text-hover">{description}</p>
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Projects