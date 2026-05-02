'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// Force client-side rendering for the Studio
const Studio = dynamic(
  async () => {
    // Only import the real Studio and config in the browser
    // This prevents the production build from seeing the incompatible Sanity/React 19 code
    if (typeof window !== 'undefined') {
      const { NextStudio } = await import('next-sanity/studio')
      const config = (await import('@/sanity.config')).default
      return function StudioWrapper() {
        return <NextStudio config={config} />
      }
    }
    // Return a dummy component for SSR/Build
    return function Loading() {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/60">Initializing Studio...</p>
        </div>
      )
    }
  },
  { ssr: false }
)

export default function StudioPage() {
  return <Studio />
}
