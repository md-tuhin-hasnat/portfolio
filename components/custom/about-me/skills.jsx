"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { client } from "@/sanity/client";

export function Skills() {
  const [workingSkills, setWorkingSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await client.fetch(`*[_type == "skill"] | order(section asc)`);
        setWorkingSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated, workingSkills]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="mt-8 flex flex-col gap-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workingSkills.map((skill, index) => (
          <div key={index} className="bg-transparent lg:bg-white/5 lg:backdrop-blur-md border-none lg:border border-white/10 shadow-none lg:shadow-xl rounded-2xl relative overflow-hidden group">
            <div className="p-0 lg:p-6 relative z-10">
              <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-primary uppercase tracking-tighter">{skill.section}</h3>
                <section className="flex flex-col gap-4">
                  {skill.skills?.map((skillItem, sIndex) => (
                    <section key={sIndex} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-black text-foreground">{skillItem.label}</h4>
                        <span className="text-xs font-black text-primary drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">{skillItem.percentage}%</span>
                      </div>
                      <section className="flex items-center gap-2 w-full">
                        <motion.div 
                          className="w-full bg-white/5 rounded-full overflow-hidden h-2"
                        >
                          <motion.div
                            className="bg-primary h-full"
                            initial={{ width: 0 }} 
                            animate={{ width: hasAnimated ? `${skillItem.percentage}%` : "0%" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          />
                        </motion.div>
                      </section>
                    </section>
                  ))}
                </section>
              </section>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
