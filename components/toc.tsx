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

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
    e.preventDefault()
    const element = document.querySelector(url)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - 20

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      history.pushState(null, '', url)
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
