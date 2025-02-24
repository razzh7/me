import { cn } from '@/util/merge'

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

function Badge(props: BadgeProps) {
  const { className, children } = props
  return (
    <div className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-round text-badge hover:bg-round/80", className)}>
      {children}
    </div>
  )
}

export default Badge