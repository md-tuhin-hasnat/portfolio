'use client'
import { WarpBackground } from "@/components/magicui/warp-background";
import { useState, useEffect } from 'react'
export default function WarpContainer({children}){
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    isClient === true ?
    <WarpBackground className="fixed h-svh w-full -z-50" perspective={90}>
      {children}
    </WarpBackground>
    :<section>{children}</section>
  )
}