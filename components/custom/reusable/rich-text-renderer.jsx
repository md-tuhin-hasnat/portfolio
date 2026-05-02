'use client'

import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const components = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full h-[400px] my-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Project Image'}
            fill
            className="object-cover"
          />
        </div>
      )
    },
    code: ({ value }) => {
      return (
        <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">{value.language || 'code'}</span>
          </div>
          <SyntaxHighlighter
            language={value.language || 'javascript'}
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-5xl font-black text-foreground tracking-tighter mb-8 mt-12">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-foreground tracking-tight mb-6 mt-10 flex items-center gap-3">
      <div className="w-2 h-8 bg-primary rounded-full" />
      {children}
    </h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold text-foreground tracking-tight mb-4 mt-8">{children}</h3>,
    normal: ({ children }) => <p className="text-lg text-foreground/80 font-medium leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-foreground/90 bg-primary/5 rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-8 ml-4 text-foreground/80 font-medium">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-3 mb-8 ml-4 text-foreground/80 font-medium">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-black text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{children}</strong>,
    link: ({ children, value }) => {
      return (
        <a 
          href={value.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-secondary font-bold underline decoration-2 underline-offset-4 hover:text-white transition-colors"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => <code className="px-1.5 py-0.5 rounded bg-white/10 text-primary font-bold text-sm">{children}</code>,
    important: ({ children }) => <span className="text-primary font-bold">{children}</span>,
  },
}

export function RichTextRenderer({ value }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
