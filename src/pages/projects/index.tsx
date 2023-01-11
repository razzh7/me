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
          title="maserati-crawler"
          description="A maserati car crawler program."
          icon={CgDebug}
          href="https://github.com/rzhAvenir/maserati-crawler"
        />
        <Item
          title="vue-admin"
          description="A elementui admin powered by Vue."
          icon={RiVuejsFill}
          href="https://rzhavenir.github.io/vue-admin-webapp/"
        />
        <Item
          title="express-auth"
          description="A json web token login demo with Express."
          icon={SiExpress}
          href="https://github.com/rzhAvenir/express-auth"
        />
        <Item
          title="vue-admin-auth"
          description="A permission system admin with Vue."
          icon={MdAdminPanelSettings}
          href="https://github.com/rzhAvenir/vue-express-rbac"
        />
        <Item
          title="Soyeux"
          description="A carousel on Web with JavaScript."
          icon={MdOutlineViewCarousel}
          href="https://github.com/rzhAvenir/soyeux"
        />
        <Item
          title="mini-redux"
          description="Use the most simple JavaScript to implement Redux core."
          icon={SiRedux}
          href="https://github.com/rzhAvenir/mini-redux"
        />
        <Item
          title="ford-shop"
          description="A car shop with HTML,CSS,JavaScript."
          icon={FaShopify}
          href="http://razzh.gitee.io/ford-mall"
        />
        <Item
          title="vue3-taro3-template"
          description="A vue3 and taro3 template."
          icon={RiMiniProgramFill}
          href="https://github.com/rzhAvenir/taro-vue3-template"
        />
        <Item
          title="page-tracker"
          description="A page watch on Web with Typescript."
          icon={GiLandMine}
          href="https://github.com/rzhAvenir/page-tracker"
        />
        <Item
          title="promise-learn"
          description="According to A Plus standard, use JavaScript implement promise main"
          icon={SiFuturelearn}
          href="https://github.com/rzhAvenir/Promise-learn"
        />
        <Item
          title="vue-learn"
          description="A learn demo, step by step implement Vue2."
          icon={SiSololearn}
          href="https://github.com/rzhAvenir/vue-learn"
        />
        <Item
          title="starter-ts"
          description="A ts-template starter with Typescript."
          icon={SiTypescript}
          href="https://github.com/rzhAvenir/starter-ts"
        />
        <Item
          title="elementui-table-template"
          description="Base on elementui-table component wrapper again."
          icon={RiTableLine}
          href="https://github.com/rzhAvenir/element-table-template"
        />
      </div>
    </Wrapper>
  )
}

export default projects
