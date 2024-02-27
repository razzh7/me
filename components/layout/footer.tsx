import { cn } from '@/util/merge'

interface FooterProps {
  className?: string
}
function Footer({ className }: FooterProps) {
  return (
    <div className={cn('my-5 mx-0 text-primary text-end', className)}>
      <p>
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          rel="noreferrer"
          target="_blank"
        >
          CC BY-NC-SA 4.0
        </a>{' '}
        © Razzh
      </p>
    </div>
  )
}

export default Footer
