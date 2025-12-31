'use client'
import { useMemo } from 'react'
import CopyButton from '@/components/copy-button'
import { cn } from '@/util/merge'

interface MdxPreProps extends React.HTMLAttributes<HTMLPreElement> {
  __rawString__?: string,
  'data-language'?: string
}


function MdxPre({ __rawString__, ...props }: MdxPreProps) {
  const lang = useMemo(() => {
    const rawLang = props['data-language']
    if (rawLang) {
      return rawLang[0].toUpperCase() + rawLang.slice(1)
    }
    return ''
  }, [props])

  return (
    <div
      className="relative bg-code rounded-lg border border-muted2"
    >
      <div className="flex justify-between border-b border-muted2 px-[1rem] py-[0.3rem]">
        <div>{lang}</div>
        <CopyButton value={__rawString__ as string} />
      </div>
      <pre className={cn('max-h-[650px] overflow-x-auto p-4')} {...props} />
    </div>
  )
}

export default MdxPre