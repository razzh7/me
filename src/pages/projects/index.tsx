import Head from 'next/head'
import styles from '@/styles/projects.module.css'
import Wrapper from '@/components/Layout/Wrapper'
import Item from '@/components/Layout/Projects/item'
import { GiLandMine } from 'react-icons/gi'
import { MdAdminPanelSettings, MdOutlineViewCarousel } from 'react-icons/md'
import { SiExpress, SiRedux, SiFuturelearn, SiSololearn, SiTypescript } from 'react-icons/si'
import { FaShopify } from 'react-icons/fa'
import { CgDebug } from 'react-icons/cg'
import { RiVuejsFill, RiMiniProgramFill, RiTableLine } from 'react-icons/ri'

const projects = () => {
  return (
    <Wrapper>
      <Head>
        <title>My Projects</title>
      </Head>
      <p className={styles.name}>Projects</p>
      <div className={styles.list}>
        <Item
          title="PageTracker"
          description="A PageTracker on Web with Typescript."
          icon={GiLandMine}
          href="https://github.com/rzhAvenir/page-tracker"
        />
        <Item
          title="vue-admin"
          description="A PageTracker on Web with Typescript."
          icon={RiVuejsFill}
          href="https://rzhavenir.github.io/vue-admin-webapp/"
        />
        <Item
          title="ExpressAuth"
          description="A PageTracker on Web with Typescript."
          icon={SiExpress}
          href="https://github.com/rzhAvenir/express-auth"
        />
        <Item
          title="vue-admin-auth"
          description="A PageTracker on Web with Typescript."
          icon={MdAdminPanelSettings}
          href="https://github.com/rzhAvenir/vue-express-rbac"
        />
        <Item
          title="Soyeux"
          description="A PageTracker on Web with Typescript."
          icon={MdOutlineViewCarousel}
          href="https://github.com/rzhAvenir/soyeux"
        />
        <Item
          title="mini-redux"
          description="A PageTracker on Web with Typescript."
          icon={SiRedux}
          href="https://github.com/rzhAvenir/mini-redux"
        />
        <Item
          title="FordShop"
          description="A PageTracker on Web with Typescript."
          icon={FaShopify}
          href="http://razzh.gitee.io/ford-mall"
        />
        <Item
          title="vue3-taro3-template"
          description="A PageTracker on Web with Typescript."
          icon={RiMiniProgramFill}
          href="https://github.com/rzhAvenir/taro-vue3-template"
        />
        <Item
          title="maserati-crawler"
          description="A PageTracker on Web with Typescript."
          icon={CgDebug}
          href="https://github.com/rzhAvenir/maserati-crawler"
        />
        <Item
          title="promise-learn"
          description="A PageTracker on Web with Typescript."
          icon={SiFuturelearn}
          href="https://github.com/rzhAvenir/Promise-learn"
        />
        <Item
          title="vue-learn"
          description="A PageTracker on Web with Typescript."
          icon={SiSololearn}
          href="https://github.com/rzhAvenir/vue-learn"
        />
        <Item
          title="starter-ts"
          description="A PageTracker on Web with Typescript."
          icon={SiTypescript}
          href="https://github.com/rzhAvenir/starter-ts"
        />
        <Item
          title="elementUI-table-template"
          description="A PageTracker on Web with Typescript."
          icon={RiTableLine}
          href="https://github.com/rzhAvenir/element-table-template"
        />
      </div>
    </Wrapper>
  )
}

export default projects
