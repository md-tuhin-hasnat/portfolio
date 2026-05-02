'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Briefcase, Code, GraduationCap, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = {
  "About": User,
  "Experience": Briefcase,
  "Projects": Code,
  "Education": GraduationCap,
  "Ask AI": MessageCircle
}

export function FloatingDock({ navLinks }) {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 p-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl"
      >
        {navLinks.map((link) => {
          const Icon = icons[link.label] || User
          const isActive = pathname === link.href

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-3 rounded-full transition-colors relative",
                  isActive ? "text-white" : "text-white/60 hover:bg-white/10"
                )}
              >
                <Icon size={20} className={cn("relative z-10", isActive && "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]")} />
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </motion.nav>
    </div>
  )
}
