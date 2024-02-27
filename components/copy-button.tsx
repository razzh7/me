'use client'
import { useState, useEffect } from 'react'
import Button from "@/components/button"
import { RaCheck, RaCopy } from "@twist-space/react-icons/ra"
import { cn } from '@/util/merge'
import cpoy from 'copy-to-clipboard'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
}

function CopyButton({
  value,
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)
  const onCopy = () => {
    cpoy(value)
    setHasCopied(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      className={cn(
        "relative z-10 h-6 w-6 text-icon",
        className
      )}
      onClick={onCopy}
      {...props}
    >
      {hasCopied ? (
        <RaCheck className="h-3 w-3" />
      ) : (
        <RaCopy className="h-3 w-3" />
      )}
    </Button>
  )
}

export default CopyButton