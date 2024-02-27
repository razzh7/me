import styles from '@/styles/books.module.css'

interface BooksProps {
  title: string
  spine: string
  tag: string
  cover: string
}

export default function Books({ title, spine, tag, cover }: BooksProps) {
  return (
    <div className={styles.book}>
      <div
        className={`${styles.bookSide} ${styles.spine}`}
        style={{ backgroundColor: spine }}
      >
        <span className={styles.spineTitle}>{title}</span>
        <span className={styles.spineAuthor}>{tag}</span>
      </div>
      <div className={`${styles.bookSide} ${styles.bookTop}`}></div>
      <div
        className={`${styles.bookSide} ${styles.bookCover}`}
        style={{ backgroundImage: `url(${cover})` }}
      ></div>
    </div>
  )
}
