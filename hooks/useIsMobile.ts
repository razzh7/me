import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

/**
 * 检测当前设备是否为移动端（兼容 SSR）
 * @returns {boolean} 是否为移动设备
 */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    // 仅在客户端执行检测
    setMobile(isMobile)
  }, [])

  return mobile
}