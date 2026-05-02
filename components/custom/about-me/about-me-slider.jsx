'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Marquee } from "@/components/magicui/marquee"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"

const ReviewCard = ({
  brandTextColor,
  title,
  link,
  logo,
  brand,
}) => {
  return (
    <Link href={link || '#'} target="_blank" rel="noopener noreferrer">
      <Card className="w-64 flex flex-col h-48 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl overflow-hidden group relative">
        <CardHeader>
          <section className="flex flex-row justify-between rounded items-center">
            {logo && (
              <Image 
                src={urlFor(logo).url()} 
                alt={title} 
                height={50} 
                width={50} 
                className="h-8 w-auto grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
            )}
            <h3 className="text-lg font-bold" style={{ color: brandTextColor }}>{brand}</h3>
          </section>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <section>
            <h4 className="text-lg font-light text-center">{title}</h4>
          </section>
        </CardContent>
      </Card>
    </Link>
  )
}

export function AboutMeSlider() {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await client.fetch(`*[_type == "achievement"] | order(order asc)`)
        setAchievements(data)
      } catch (error) {
        console.error('Error fetching achievements:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden py-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-64 h-48 bg-white/5 rounded-2xl animate-pulse shrink-0" />
        ))}
      </div>
    )
  }

  if (achievements.length === 0) return null

  return (
    <section className="flex w-full overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s] w-full" >
        {achievements.map((achievement, key) => (
          <ReviewCard key={key} {...achievement} />
        ))}
      </Marquee>
    </section>
  )
}
