'use client'
import { useState } from 'react'
import CopyButton from '@/components/copy-button'
import { cn } from '@/util/merge'

interface MdxPreProps extends React.HTMLAttributes<HTMLPreElement> {
  __rawString__?: string,
  'data-language'?: string
}


function MdxPre({ __rawString__, ...props }: MdxPreProps) {
  const [isHovered, setIsHovered] = useState(false)
  const lang = props['data-language']

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className="relative bg-code"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <pre className={cn('mb-4 mt-7 max-h-[650px] overflow-x-auto rounded-lg border border-muted2 py-4')} {...props} />
      { !isHovered ? (<div className={cn("absolute right-4 top-4 text-muted")}>{lang}</div>) : null }
      { isHovered ? (<CopyButton value={__rawString__ as string} className={cn("absolute right-3 top-4 transition-all duration-300")} />) : null }
    </div>
  )
}

export default MdxPre