import Image from "next/image"
import styles from "./icon-block.module.css"

interface IconBlockProps {
  href: string;
  icon: string;
  name: string;
}

function IconBlock(props: IconBlockProps) {
  const { href, icon, name } = props

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.iconBlock}
    >
      <Image
        src={icon}
        alt="icon"
        width={18}
        height={18}
        className={styles.icon}
      />
      <span>{name}</span>
    </a>
  )
}

export default IconBlock