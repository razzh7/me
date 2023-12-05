import textStyle from '@/styles/home.module.css'
import styles from '@/styles/footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          rel="noreferrer"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </a>{' '}
        © Xiaohao
      </p>
      {/* <a className={textStyle.textLink} href="https://beian.miit.gov.cn/">
        浙ICP备2022036392号-1
      </a> */}
    </div>
  )
}

export default Footer
