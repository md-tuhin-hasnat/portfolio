'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import dynamic from 'next/dynamic'

// Force client-side rendering for the Studio to avoid 'window is not defined' errors
const Studio = dynamic(
  async () => (await import('next-sanity/studio')).NextStudio,
  { ssr: false }
)

export default function StudioPage() {
  return <Studio config={config} />
}
