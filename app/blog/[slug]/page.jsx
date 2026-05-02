'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { client } from '@/sanity/client'
import { RichTextRenderer } from '@/components/custom/reusable/rich-text-renderer'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          title,
          publishedAt,
          mainImage,
          body,
          excerpt
        }`
        const data = await client.fetch(query, { slug })
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60svh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/60">Decoding Transmission...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Transmission Corrupted</h2>
        <p className="text-muted-foreground mt-2">The requested dossier could not be retrieved from the archive.</p>
        <Link href="/blog" className="mt-8 text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Secure Index
        </Link>
      </div>
    )
  }

  return (
    <article className="w-full px-2 lg:px-4 py-4 min-h-[60svh]">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link 
          href="/blog" 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-white hover:bg-white/10 transition-all w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Index
        </Link>
      </motion.div>

      <div className="space-y-8">
        {/* Header Section */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-secondary">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              5 Min Read
            </div>
            <div className="hidden sm:flex items-center gap-2 ml-auto text-primary cursor-pointer hover:scale-105 transition-transform">
              <Share2 className="w-3.5 h-3.5" />
              Broadcast Dossier
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mt-10">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
        </header>

        {/* Content Section */}
        <div className="max-w-none prose prose-invert mt-12 pb-20">
          <RichTextRenderer value={post.body} />
        </div>
      </div>
    </article>
  )
}
