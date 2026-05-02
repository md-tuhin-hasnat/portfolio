'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { client } from "@/sanity/client"
import Link from "next/link"

const TimelineItem = ({ title, rank, date, type, link, teamName, online = false, maxRating, handleName }) => {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="flex flex-row my-4 gap-4">
        <div className="flex flex-col items-center justify-center w-12 lg:w-16 shrink-0">
          <div className="text-2xl lg:text-3xl font-bold text-primary/40 -rotate-90 uppercase tracking-tighter">{type}</div>
        </div>
        <Link href={link || '#'} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0">
          <div className="flex-1 p-0 lg:p-5 rounded-xl border-none lg:border border-white/10 bg-transparent lg:bg-white/5 lg:backdrop-blur-md shadow-none lg:shadow-xl hover:bg-white/10 transition-all duration-300 relative group overflow-hidden">
            <section className="flex flex-col md:flex-row justify-between gap-2 mb-3">
              <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{title}</h3>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap bg-white/5 px-2 py-1 rounded-md self-start md:self-center">
                {online ? `Since: ${date}` : date}
              </span>
            </section>
            <section className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {online ? (
                <p className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <span className="text-muted-foreground font-medium">Max Rating:</span> {maxRating}
                </p>
              ) : (
                <p className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <span className="text-muted-foreground font-medium">Rank:</span> {rank}
                </p>
              )}
              {online ? (
                <h3 className="text-sm font-bold text-foreground/80 flex items-center gap-1.5">
                  <span className="text-muted-foreground font-medium">Handle:</span> {handleName}
                </h3>
              ) : (
                <h3 className="text-sm font-bold text-foreground/80 flex items-center gap-1.5">
                  <span className="text-muted-foreground font-medium">Team:</span> {teamName}
                </h3>
              )}
            </section>
          </div>
        </Link>
      </section>
    </motion.div>
  )
}

export default function CpExperience() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCP = async () => {
      try {
        const data = await client.fetch(`*[_type == "cpExperience"] | order(order asc)`)
        setItems(data)
      } catch (error) {
        console.error('Error fetching CP experience:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCP()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4 py-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {items.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </motion.div>
    </div>
  )
}
