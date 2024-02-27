import { cn } from '@/util/merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={cn("flex justify-center items-center hover:bg-round hover:text-icon rounded", className)} {...props}>
      {children}
    </button>
  )
}

export default Button