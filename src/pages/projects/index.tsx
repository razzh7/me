import Head from 'next/head'
import styles from '@/styles/projects.module.css'
import Wrapper from '@/components/Layout/Wrapper'
import Item from '@/components/Layout/Projects/item'
import { GiLandMine } from 'react-icons/Gi'
import { MdAdminPanelSettings, MdOutlineViewCarousel } from 'react-icons/Md'
import { SiExpress, SiRedux, SiFuturelearn, SiSololearn, SiTypescript } from 'react-icons/Si'
import { FaShopify } from 'react-icons/Fa'
import { CgDebug } from 'react-icons/cg'
import { CiViewTable } from 'react-icons/ci'
import { RiVuejsFill, RiMiniProgramFill } from 'react-icons/ri'

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
          Icon={GiLandMine}
          href="https://github.com/rzhAvenir/page-tracker"
        />
        <Item
          title="vue-admin"
          description="A PageTracker on Web with Typescript."
          Icon={RiVuejsFill}
          href="https://rzhavenir.github.io/vue-admin-webapp/"
        />
        <Item
          title="ExpressAuth"
          description="A PageTracker on Web with Typescript."
          Icon={SiExpress}
          href="https://github.com/rzhAvenir/express-auth"
        />
        <Item
          title="vue-admin-auth"
          description="A PageTracker on Web with Typescript."
          Icon={MdAdminPanelSettings}
          href="https://github.com/rzhAvenir/vue-express-rbac"
        />
        <Item
          title="Soyeux"
          description="A PageTracker on Web with Typescript."
          Icon={MdOutlineViewCarousel}
          href="https://github.com/rzhAvenir/soyeux"
        />
        <Item
          title="mini-redux"
          description="A PageTracker on Web with Typescript."
          Icon={SiRedux}
          href="https://github.com/rzhAvenir/mini-redux"
        />
        <Item
          title="FordShop"
          description="A PageTracker on Web with Typescript."
          Icon={FaShopify}
          href="http://razzh.gitee.io/ford-mall"
        />
        <Item
          title="vue3-taro3-template"
          description="A PageTracker on Web with Typescript."
          Icon={RiMiniProgramFill}
          href="https://github.com/rzhAvenir/taro-vue3-template"
        />
        <Item
          title="maserati-crawler"
          description="A PageTracker on Web with Typescript."
          Icon={CgDebug}
          href="https://github.com/rzhAvenir/maserati-crawler"
        />
        <Item
          title="promise-learn"
          description="A PageTracker on Web with Typescript."
          Icon={SiFuturelearn}
          href="https://github.com/rzhAvenir/Promise-learn"
        />
        <Item
          title="vue-learn"
          description="A PageTracker on Web with Typescript."
          Icon={SiSololearn}
          href="https://github.com/rzhAvenir/vue-learn"
        />
        <Item
          title="starter-ts"
          description="A PageTracker on Web with Typescript."
          Icon={SiTypescript}
          href="https://github.com/rzhAvenir/starter-ts"
        />
        <Item
          title="element-table-template"
          description="A PageTracker on Web with Typescript."
          Icon={CiViewTable}
          href="https://github.com/rzhAvenir/element-table-template"
        />
      </div>
    </Wrapper>
  )
}

export default projects
