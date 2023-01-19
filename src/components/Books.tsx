import { FC } from 'react'
import styles from '@/styles/books.module.css'

const Books: FC<any> = ({ books }) => {
  return (
    <div>
      {books.map((book: any) => (
        <div className={styles.bookshelf} key={book.title}>
          <div className={styles.book}>
            <div
              className={`${styles.bookSide} ${styles.spine}`}
              style={{ backgroundColor: book.spine || '' }}
            >
              <span className={styles.spineTitle}>{book.title}</span>
              <span className={styles.spineAuthor}>{book.tag}</span>
            </div>
            <div className={`${styles.bookSide} ${styles.bookTop}`}></div>
            <div
              className={`${styles.bookSide} ${styles.bookCover}`}
              style={{ backgroundImage: `url(${book.cover})` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Books
