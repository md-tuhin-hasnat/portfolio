'use client'

import React from 'react'
import { cn } from "@/lib/utils"

export function TechGridBackground({
  className,
  children,
  ...props
}) {
  return (
    <main className={cn("relative flex flex-col min-h-screen bg-[#020617] text-foreground transition-colors duration-500 overflow-hidden", className)} {...props}>
      {/* Tech Grid Backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 95%)',
            animation: 'grid-move 20s linear infinite'
          }}
        />

        {/* Scanlines Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-[0.05]" />

        {/* Neon Glow Orbs - Luminous Colors */}
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full bg-purple-500/20 blur-[120px] animate-pulse mix-blend-screen" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[70%] h-[70%] rounded-full bg-blue-500/15 blur-[150px] animate-pulse mix-blend-screen" style={{ animationDelay: '3s', animationDuration: '10s' }} />
        
        {/* Subtle Accent Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-cyan-400/10 blur-[130px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      <style jsx global>{`
        @keyframes grid-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
      `}</style>
    </main>
  )
}
