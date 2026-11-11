// @ts-nocheck
'use client'
import { useState, useEffect, useMemo } from 'react'
import { TableOfContents } from '@/lib/toc'
import { cn } from '@/util/merge'

interface TocProps {
  toc: TableOfContents
}

function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
          .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
          .flat()
          .filter(Boolean)
          .map((id) => id?.split('#')[1])
        : [],
    [toc]
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items || !mounted) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

// Heading ids from github-slugger can start with a digit (`24.06.01` → `240601`)
// or contain characters that are not a valid CSS identifier. querySelector('#240601')
// throws, so hash links must be resolved with getElementById.
function hashId(url: string) {
  const raw = url.charAt(0) === '#' ? url.slice(1) : url
  try {
    return decodeURIComponent(raw)
  } catch (error) {
    return raw
  }
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
    e.preventDefault()
    const element = document.getElementById(hashId(url))

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - 20

      window.history.pushState(null, '', url)
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => (
        <li key={index} className={cn("mt-0 pt-2")}>
          <a
            href={item.url}
            onClick={(e) => handleScroll(e, item.url)}
            className={cn(
              "inline-block no-underline transition-colors hover:text-secondary",
              item.url === `#${activeItem}`
                ? "font-medium text-secondary"
                : "text-muted-setext-secondary"
            )}
          >
            {item.title}
          </a>
          {item.items?.length ? (
            <Tree tree={item} level={level + 1} activeItem={activeItem} />
          ) : null}
        </li>
      ))}
    </ul>
  ) : null
}

export default DashboardTableOfContents
