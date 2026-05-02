'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { client } from '@/sanity/client';

export function DownLoadResume() {
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await client.fetch(`*[_type == "about"][0]{ "url": resume.asset->url }`);
        if (data?.url) setResumeUrl(data.url);
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };
    fetchResume();
  }, []);

  return (
    <section className='flex justify-center mt-12'>
      <motion.div
        whileHover="hover"
        initial="initial"
        className="relative group"
      >
        <Button
          variant="default"
          size="lg"
          className="relative overflow-hidden px-8 py-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-foreground font-semibold flex items-center gap-3 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20"
          onClick={() => {
            if (resumeUrl) {
              window.open(resumeUrl, '_blank');
            } else {
              window.open('/pdf/resume.pdf', '_blank'); // Fallback to local
            }
          }}
        >
          <motion.div
            variants={{
              initial: { x: -20, opacity: 0 },
              hover: { x: 0, opacity: 1 }
            }}
          >
            <Search className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="tracking-widest uppercase text-xs">Analyze Credentials</span>
          <FileText className="w-5 h-5 text-secondary" />

          {/* Scanning Line Effect */}
          <motion.div
            variants={{
              initial: { top: '-100%' },
              hover: { top: '100%' }
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_15px_hsl(var(--primary))] z-20 pointer-events-none"
          />
        </Button>

        {/* Outer Glow on Hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      </motion.div>
    </section>
  );
}
