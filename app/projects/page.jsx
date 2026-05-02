'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/custom/reusable/section-heading";
import { client } from "@/sanity/client";
import { 
  Cpu, 
  Github, 
  ExternalLink, 
  ArrowLeft, 
  ChevronRight, 
  FileText, 
  Layers, 
  Zap, 
  Terminal,
  Activity,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { RichTextRenderer } from "@/components/custom/reusable/rich-text-renderer";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(order asc)`
        const data = await client.fetch(query)
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60svh] space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/60">Decrypting Archive...</p>
      </div>
    )
  }

  return (
    <section className="w-full px-2 lg:px-4 py-4 min-h-[60svh]">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="archive"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <SectionHeading>Technical Archive</SectionHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {projects?.length === 0 ? (
                <div className="col-span-full text-center py-20 opacity-50">
                  <Terminal className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-xs font-black uppercase tracking-[0.3em]">No project transmissions found</p>
                </div>
              ) : (
                projects?.map((project, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedProject(project)}
                    className="group relative cursor-pointer p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-primary/30"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                        <Cpu className="w-6 h-6 text-secondary" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                      <Activity className="w-3 h-3" />
                      System Ready for Analysis
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="journal"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Journal Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Archive
              </button>
              <div className="hidden sm:flex items-center gap-3 text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.3em]">
                <span>Case Study ID: {selectedProject.title?.toUpperCase().replace(/\s/g, '-')}-01</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              </div>
            </div>

            {/* Document Header */}
            <div className="space-y-4 pt-4 border-b border-white/10 pb-10">
              <div className="flex items-center gap-3 text-primary">
                <FileText className="w-6 h-6" />
                <span className="text-[12px] font-black uppercase tracking-[0.4em]">Project Technical Journal</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                {selectedProject.title}
              </h2>
              <div className="flex flex-wrap gap-4 pt-2">
                {selectedProject.links?.github && (
                  <Link 
                    href={selectedProject.links.github}
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-bold text-secondary hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Access Source Repository
                  </Link>
                )}
                {selectedProject.links?.deployment && (
                  <Link 
                    href={selectedProject.links.deployment}
                    target="_blank"
                    className="flex items-center gap-2 text-xs font-bold text-primary hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Interface
                  </Link>
                )}
              </div>
            </div>

            {/* Journal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column: Abstract & Methodology */}
              <div className="lg:col-span-2 space-y-12">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6 flex items-center gap-2">
                    <div className="w-8 h-px bg-primary/30" />
                    Abstract
                  </h4>
                  <p className="text-lg text-foreground leading-relaxed font-medium">
                    {selectedProject.abstract}
                  </p>
                </section>

                {selectedProject.methodology?.length > 0 && (
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6 flex items-center gap-2">
                      <div className="w-8 h-px bg-secondary/30" />
                      Technical Methodology
                    </h4>
                    <ul className="space-y-6">
                      {selectedProject.methodology.map((point, i) => (
                        <li key={i} className="flex gap-4 group">
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0 group-hover:bg-primary transition-colors" />
                          <span className="text-muted-foreground text-[16px] leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {selectedProject.journal && (
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-6 flex items-center gap-2">
                      <div className="w-8 h-px bg-accent/30" />
                      Deep Analysis
                    </h4>
                    <div className="prose prose-invert max-w-none">
                      <RichTextRenderer value={selectedProject.journal} />
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column: Stack & Meta */}
              <div className="space-y-8">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4 text-accent" />
                    System Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.architecture?.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-bold text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-primary/5 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Protocol Status
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-muted-foreground/60 font-bold uppercase">Deployment</span>
                      <span className={`${selectedProject.status === 'ACTIVE' ? 'text-green-500' : 'text-accent'} font-black`}>{selectedProject.status}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-muted-foreground/60 font-bold uppercase">SSL Encryption</span>
                      <span className="text-white font-black flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        SECURE
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-muted-foreground/60 font-bold uppercase">Runtime</span>
                      <span className="text-white font-black">{selectedProject.runtime}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                   <Link 
                    href={selectedProject.links?.deployment || selectedProject.links?.github || '#'}
                    target="_blank"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:scale-[1.02] transition-all active:scale-95"
                  >
                    <Terminal className="w-4 h-4" />
                    Execute Deployment
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
