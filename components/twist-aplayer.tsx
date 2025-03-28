'use client'
import { TwistAPlayer, APlayerProps } from 'twist-aplayer'
import { ThemeContext } from '@/components/theme-provider'
import { useContext } from 'react'

function TwistAPlayerWraper({
  audio,
  border = true,
  volume = 0.6,
  appearance = 'normal',
  initialLoop = 'all',
  autoPlay = false
}: APlayerProps) {
  const { theme } = useContext(ThemeContext)

  return (
    <TwistAPlayer
      audio={audio}
      autoPlay={autoPlay}
      appearance={appearance}
      initialLoop={initialLoop}
      volume={volume}
      theme={theme}
      border={border}
    />
  )
}

export default TwistAPlayerWraper
