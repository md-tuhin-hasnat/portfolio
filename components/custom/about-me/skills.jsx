"use client";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Separator } from "@radix-ui/react-separator";
import { workingSkills } from "@/data/working-skills";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function Skills() {
  const [progress, setProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setProgress(100);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="mt-8 flex flex-col gap-4">
      <section className="grid grid-cols-2 gap-3 mr-2">
        {workingSkills.map((skill, index) => (
          <Card key={index}>
            <CardContent className="mt-4">
              <section key={index} className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold">{skill.section}</h3>
                <section className="flex flex-col gap-2">
                  {skill.skills.map((skill, index) => (
                    <section key={index} className="flex flex-col gap-1">
                      <h4 className="text-base font-light">{skill.label}</h4>
                      <section className="flex items-center gap-2 max-w-[400px]">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: hasAnimated ? `${skill.percentage}%` : "0%" }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        >
                          <Progress value={100} />
                        </motion.div>
                        <span className="text-sm font-light">{skill.percentage}%</span>
                      </section>
                    </section>
                  ))}
                </section>
              </section>
            </CardContent>
          </Card>
        ))}
      </section>
    </section>
  );
}
