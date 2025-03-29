'use client'
import { useFloating, useHover, useInteractions, offset } from '@floating-ui/react'
import { AiBilibiliFilled as BilibiliIcon } from '@twistify/react-icons/ai'
import { useState } from 'react'

interface OutLinkProps {
  text: string
  hoverText: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  src?: string
  noIcon?: boolean
}

function OutLink({
  text,
  hoverText,
  placement = 'bottom',
  src = '#',
  noIcon = false
}: OutLinkProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(6)],
    placement: placement
  })

  const hover = useHover(context, {
    delay: {
      open: 100,
      close: 200
    }
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover
  ])

  return (
    <span className="relative inline-block">
      <a
        ref={refs.setReference}
        href={src}
        className="font-medium text-hover border-b border-solid border-link hover:border-primary cursor-pointer transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer"
        {...getReferenceProps()}
      >
        {text}
      </a>
      <span
        ref={refs.setFloating}
        style={floatingStyles}
        className={`
          absolute z-50 whitespace-nowrap flex items-center rounded-md px-2 py-1 text-sm bg-round font-medium text-secondary
          transition-opacity duration-300 ease-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        {...getFloatingProps()}
      >
        {!noIcon && <BilibiliIcon className="text-hover font-medium shrink-0" size={16} />}
        <span className="ml-1 truncate max-w-xs">{hoverText}</span>
      </span>
    </span>
  )
}

export default OutLink