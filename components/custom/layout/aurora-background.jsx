'use client'

import React from 'react'
import { cn } from "@/lib/utils"

export function AuroraBackground({
  className,
  children,
  ...props
}) {
  return (
    <main className={cn("relative flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500 overflow-hidden", className)} {...props}>
      {/* Aurora Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Primary Orb */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/30 blur-[120px] animate-pulse mix-blend-screen" />
        
        {/* Secondary Orb */}
        <div className="absolute top-[20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-secondary/30 blur-[150px] animate-pulse mix-blend-screen" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        
        {/* Accent Orb */}
        <div className="absolute bottom-[-20%] left-[10%] w-[80%] h-[80%] rounded-full bg-accent/30 blur-[130px] animate-pulse mix-blend-screen" style={{ animationDelay: '4s', animationDuration: '12s' }} />
        
        {/* Subtle Center Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </main>
  )
}
