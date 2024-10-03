/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import Image from 'next/image'

interface ImagePreviewProps {
  src: string
  alt?: string
}
function ImagePreview({ src, alt }: ImagePreviewProps) {
  const [show, setShow] = useState(false)

  return (
    <div className='my-5'>
      <div className="w-full h-auto">
        <Image
          className="w-full h-auto cursor-pointer rounded md:rounded-md image-preview slide-enter"
          src={src}
          alt={alt ? alt : 'image'}
          width={0}
          height={0}
          sizes="100vw"
          onClick={() => setShow(!show)}
        />
      </div>
      {
        show ? (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-md image-preview transition-all"
            onClick={() => setShow(false)}
          >
            <img
              className="w-full h-full object-contain image-preview"
              src={src}
              alt={alt ? alt : 'image'}
            />
          </div>
        ) : null
      }
    </div>
  )
}

export default ImagePreview