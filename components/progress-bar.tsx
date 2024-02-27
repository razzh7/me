import { Suspense } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { useTheme } from '@/hooks/useTheme'

function AppProgressBar() {
  const { darkColor, lightColor, theme } = useTheme()

  return (
    <Suspense>
      <ProgressBar
        height="1px"
        color={theme === 'dark' ? darkColor : lightColor}
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Suspense>
  )
}

export default AppProgressBar