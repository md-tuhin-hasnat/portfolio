'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import dynamic from 'next/dynamic'
import React, { useRef, useLayoutEffect, useCallback } from 'react'

// Polyfill for useEffectEvent which is missing in React 19 stable but expected by Sanity
if (typeof window !== 'undefined' && !React.useEffectEvent) {
  // @ts-ignore
  React.useEffectEvent = function useEffectEvent(fn) {
    const handlerRef = useRef(null)

    useLayoutEffect(() => {
      handlerRef.current = fn
    })

    return useCallback((...args) => {
      const fn = handlerRef.current
      return fn(...args)
    }, [])
  }
}

// Force client-side rendering for the Studio to avoid 'window is not defined' errors
const Studio = dynamic(
  async () => (await import('next-sanity/studio')).NextStudio,
  { ssr: false }
)

export default function StudioPage() {
  return <Studio config={config} />
}
