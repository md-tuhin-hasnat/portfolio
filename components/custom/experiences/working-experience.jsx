'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/client'
import Image from 'next/image'
import { FaCheckCircle } from 'react-icons/fa'
import { urlFor } from '@/sanity/lib/image'

export function WorkingExperience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const query = `*[_type == "experience" && type == "work"] | order(duration desc)`
        const data = await client.fetch(query)
        setExperiences(data)
      } catch (error) {
        console.error('Error fetching working experiences:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {[1, 2].map((i) => (
          <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-8">
      {experiences.map((experience, index) => (
        <div key={index} className="relative bg-transparent lg:bg-white/5 lg:backdrop-blur-sm border-none lg:border border-white/5 shadow-none lg:shadow-xl rounded-2xl overflow-hidden group">
          <div className="p-0 lg:p-4">
            <section className='flex gap-2 justify-between mb-4'>
              <h3 className="text-sm font-bold text-primary">{experience.company}</h3>
              <h5 className="text-xs font-medium text-muted-foreground">{experience.duration}</h5>
            </section>

            {experience.image && (
              <section className="flex justify-center overflow-hidden rounded-lg">
                <Image
                  src={urlFor(experience.image).url()}
                  alt={experience.role}
                  width={400}
                  height={200}
                  className="rounded-lg w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </section>
            )}
          </div>
          <div className="p-0 lg:p-4 pt-0">
            <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{experience.role}</h4>
            <ul className='space-y-2'>
              {experience.description?.map((desc, dIndex) => (
                <li key={dIndex} className="text-sm text-white font-bold flex items-start gap-2 leading-relaxed drop-shadow-sm">
                  <FaCheckCircle className="w-3 h-3 text-primary mt-1 shrink-0 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  )
}
