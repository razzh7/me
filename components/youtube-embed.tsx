import { FC } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'


interface YouTubeEmbedProps {
  videoid: string;
  height?: number;
  controls: 0 | 1
}

const YouTubeEmbedIFrame: FC<YouTubeEmbedProps> = (props) => {
  const { videoid, height, controls = 0 } = props

  return (
    <YouTubeEmbed
      videoid={videoid}
      height={height}
      params={`controls=${controls}`}
    />
  )
}

export default YouTubeEmbedIFrame