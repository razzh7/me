/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { blurhashToGradientCssObject } from '@unpic/placeholder'
import { getBlurhash } from '@/util/blurhash'

interface ImagePreviewProps {
  src: string
  alt?: string
  remote?: boolean
  blurhash?: string
}

interface PreviewProps {
  src: string
  alt?: string
  onClose: () => void
}

export function Preview({ src, alt, onClose }: PreviewProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-md image-preview transition-all"
      onClick={onClose}
    >
      <img
        className="w-full h-full object-contain image-preview"
        src={src}
        alt={alt ? alt : 'image'}
      />
    </div>
  )
}

function ImagePreview({ src, alt, remote = false, blurhash }: ImagePreviewProps) {
  const [show, setShow] = useState(false)
  const _src = useMemo(() => remote ? `https://${process.env.NEXT_PUBLIC_ASSETS_URL}/${src.replace('/', '')}` : src, [remote, src])
  const blurStyle = blurhash ? blurhashToGradientCssObject(blurhash) as React.CSSProperties : undefined

  return (
    <div className='my-5'>
      <div className="w-full h-auto">
        <Image
          className="w-full h-auto cursor-pointer rounded md:rounded-md image-preview slide-enter"
          src={_src}
          alt={alt ? alt : 'image'}
          width={0}
          height={0}
          sizes="100vw"
          style={blurStyle}
          loading="lazy"
          onClick={() => setShow(!show)}
        />
      </div>
      {
        show ? (
          <Preview
            src={_src}
            alt={alt}
            onClose={() => setShow(false)}
          />
        ) : null
      }
    </div>
  )
}

function ImagePreviewWithBlur(props: React.ComponentProps<typeof ImagePreview>) {
  return <ImagePreview {...props} blurhash={props.blurhash || getBlurhash(props.src)} />
}

export default ImagePreviewWithBlur