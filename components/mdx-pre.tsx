'use client'
import { useMemo } from 'react'
import CopyButton from '@/components/copy-button'
import { cn } from '@/util/merge'
import type { CodeLanguages } from '@/types/main'
import { SkTypescript, SkJavascript, SkJavaLight, SkLessLight, SkNginx, SkPythonLight } from '@twistify/react-icons/sk'
import { MdiVuejs } from '@twistify/react-icons/mdi'
import { IonLogoSass, IonLogoReact } from '@twistify/react-icons/ion'
import { MiFileJsonRounded } from '@twistify/react-icons/mi'
import { TaBrandPowershell, TaBrandDocker } from '@twistify/react-icons/ta'

interface MdxPreProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-raw-string'?: string,
  'data-language'?: string
}


function MdxPre(props: MdxPreProps) {
  const rawString = props['data-raw-string']
  const lang = useMemo(() => {
    const lang = props['data-language']?.toLowerCase() as CodeLanguages

    if (lang === 'react' || lang === 'tsx' || lang === 'jsx') {
      return <IonLogoReact size={20} color='#00d8ff' />
    }

    if (lang === 'vue') {
      return <MdiVuejs size={20} color='#41b883' />
    }

    if (lang === 'ts') {
      return <SkTypescript size={20} />
    }

    if (lang === 'js') {
      return <SkJavascript size={20} />
    }

    if (lang === 'java') {
      return <SkJavaLight size={20} />
    }

    if (lang === 'json') {
      return <MiFileJsonRounded size={20} color='#f0db4f' />
    }

    if (lang === 'shell' || lang === 'bash') {
      return <TaBrandPowershell size={20} color='#4375cd' />
    }

    if (lang === 'sass' || lang === 'scss') {
      return <IonLogoSass size={20} color='#cd6799' />
    }

    if (lang === 'less') {
      return <SkLessLight size={20} />
    }

    if (lang === 'dockerfile') {
      return <TaBrandDocker size={20} color='#2396ed' />
    }

    if (lang === 'nginx') {
      return <SkNginx size={20} />
    }

    if (lang === 'python') {
      return <SkPythonLight size={20} />
    }

    return null
  }, [props])

  return (
    <div
      className="relative bg-code rounded-lg border border-round my-3 overflow-hidden"
    >
      <div className="flex justify-between items-center border-b border-round px-[1rem] py-[0.3rem]">
        <div className='flex justify-center items-center'>{lang}</div>
        <CopyButton value={rawString as string} />
      </div>
      <pre className={cn('max-h-[650px] overflow-x-auto p-4')} {...props} />
    </div>
  )
}

export default MdxPre