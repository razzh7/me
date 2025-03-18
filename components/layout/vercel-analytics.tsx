'use client'
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

export function Analytics() {
  return process.env.NODE_ENV === 'production' ? (
    <VercelAnalytics />
  ) : null
}