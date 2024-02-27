'use client'
import { useState, useEffect } from 'react'
import { useWindowScroll } from 'react-use'
import { SoRoundArrowUpOutline } from '@twist-space/react-icons/so'

export default function Top() {
  const [show, setShow] = useState(false)
  const { y } = useWindowScroll()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (y > window.innerHeight / 2) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [y])


  return show ? (
    <div className="hidden md:block fixed bottom-10 right-8 animate-fade-out cursor-pointer" onClick={scrollToTop}>
      <SoRoundArrowUpOutline size={20} />
    </div>
  ) : null
}