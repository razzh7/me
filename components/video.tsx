'use client'
import Player from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'
import { useEffect, FC } from 'react'

export interface PlayerProps {
  id: string;
  url: string;
  poster: string;
}

const VideoPlayer: FC<PlayerProps> = (props) => {
  const { id, url, poster } = props

  useEffect(() => {
    new Player({
      id: id,
      url,
      plugins: [HlsPlugin],
      // 自动占满容器
      fluid: true,
      poster,
      commonStyle: {
        playedColor: 'rgb(250, 80, 181)',
        progressColor: 'rgb(255, 255, 255)',
        volumeColor: 'rgb(238, 238, 238)'
      }
    })
  }, [id, url, poster])


  return (
    <div id={id} className='rounded-lg box-border border border-muted backdrop-blur' />
  )
}

export default VideoPlayer