'use client'
import Image from "next/image"
import { useState } from "react"
import { Preview } from "./img-preview"

interface MomentsImageGridProps {
  desc?: string;
  images: string[];
}

/**
 * 九宫格图片展示组件
 * @param {string[]} images - 图片URL数组，最多展示9张
 */
function MomentsImageGrid({ images = [], desc = '' }: MomentsImageGridProps) {
  const [show, setShow] = useState(false)
  const [index, setIndex] = useState(0)
  const imageCount = images.length
  const mt2 = desc ? '' : 'mt-2'

  if (imageCount === 0) {
    return null
  }

  const displayImages = images.slice(0, 9)

  if (imageCount === 1) {
    return (
      <>
        <div className={`moments-image-grid mx-auto ${mt2} max-w-[240px] cursor-pointer overflow-hidden rounded-md`}>
          {desc && <p className="text-sm text-primary pt-5 pb-3">{desc}</p>}
          <Image
            src={displayImages[0]}
            alt="moment image"
            width={240}
            height={240}
            className="h-auto w-full object-cover"
            priority
            onClick={() => {
              setIndex(0)
              setShow(!show)
            }}
          />
        </div>
        {
          show ? (
            <Preview
              src={displayImages[0]}
              alt="moment image"
              onClose={() => setShow(false)}
            />
          ) : null
        }
      </>
    )
  }

  // --- 网格布局：2到9张图片 ---
  // 根据图片数量决定网格列数
  // 4张或2张时为2列，其他情况（3,5,6,7,8,9）为3列
  const gridCols = imageCount === 4 || imageCount === 2 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className="mx-auto w-full max-w-sm">
      {desc && <p className="text-sm text-primary pt-5 pb-3">{desc}</p>}
      <div className={`${mt2} grid max-w-sm gap-1 ${gridCols}`}>
        {displayImages.map((src, index) => (
          <div key={index} className="relative aspect-square cursor-pointer">
            <Image
              src={src}
              alt={`moment image ${index + 1}`}
              fill
              className="image-preview object-cover"
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
              priority={index < 3} // 优先加载前三张图片
              onClick={() => {
                setIndex(index)
                setShow(!show)
              }}
            />
          </div>
        ))}
      </div>
      {
        show ? (
          <Preview
            src={displayImages[index]}
            alt="moment image"
            onClose={() => setShow(false)}
          />
        ) : null
      }
    </div>
  )
}

export default MomentsImageGrid