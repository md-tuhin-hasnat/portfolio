'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import { RichTextRenderer } from '@/components/custom/reusable/rich-text-renderer'

export function AboutMeSection() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await client.fetch(`*[_type == "about"][0]`)
        setAbout(data)
      } catch (error) {
        console.error('Error fetching about data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4 mt-4">
        <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse" />
        <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
        <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse" />
      </div>
    )
  }

  if (!about) return null

  return (
    <section className="flex flex-col gap-4 mt-4">
      <RichTextRenderer value={about.bio} />
    </section>
  )
}
