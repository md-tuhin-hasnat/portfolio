'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client } from '@/sanity/client'
import { SectionHeading } from '@/components/custom/reusable/section-heading'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Calendar, ChevronRight, MessageSquare } from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          title,
          slug,
          mainImage,
          publishedAt,
          excerpt
        }`
        const data = await client.fetch(query)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60svh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/60">Initializing Stream...</p>
      </div>
    )
  }

  return (
    <section className="w-full px-2 lg:px-4 py-4 min-h-[60svh]">
      <SectionHeading>Technical Insights</SectionHeading>
      
      {posts.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="p-6 rounded-full bg-white/5 border border-white/10 shadow-2xl">
            <MessageSquare className="w-12 h-12 text-muted-foreground/40" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase">No Transmissions Found</h3>
            <p className="text-muted-foreground font-bold tracking-widest text-xs uppercase">
              Broadcast is currently offline. Check back soon.
            </p>
          </div>
          <Link 
            href="/studio"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.3em] transition-all hover:scale-105"
          >
            Access Studio to Create
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug.current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug.current}`}>
                <Card className="group h-full bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 rounded-2xl">
                  {post.mainImage && (
                    <div className="relative h-48 w-full overflow-hidden border-b border-white/10">
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-secondary">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed font-medium">
                      {post.excerpt}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      Read Full Dossier <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
