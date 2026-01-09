'use client'
import { useMemo } from 'react'
import CopyButton from '@/components/copy-button'
import { cn } from '@/util/merge'

interface MdxPreProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-raw-string'?: string,
  'data-language'?: string
}


function MdxPre(props: MdxPreProps) {
  const rawString = props['data-raw-string']
  const lang = useMemo(() => {
    const rawLang = props['data-language']
    if (rawLang) {
      return rawLang[0].toUpperCase() + rawLang.slice(1)
    }
    return ''
  }, [props])

  return (
    <div
      className="relative bg-code rounded-lg border border-round my-3 overflow-hidden"
    >
      <div className="flex justify-between border-b border-round px-[1rem] py-[0.3rem]">
        <div>{lang}</div>
        <CopyButton value={rawString as string} />
      </div>
      <pre className={cn('max-h-[650px] overflow-x-auto p-4')} {...props} />
    </div>
  )
}

export default MdxPre