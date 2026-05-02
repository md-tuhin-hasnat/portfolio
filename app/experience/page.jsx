'use client';

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/custom/reusable/section-heading";
import { WorkingExperience } from "@/components/custom/experiences/working-experience";
import TimelineComponent from "@/components/custom/experiences/timeline";
import { VolenteeringExperience } from "@/components/custom/experiences/volenteering-experience";

export default function ExperiencePage(){
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full px-2 lg:px-4 py-4 space-y-12"
    >
      <motion.div variants={itemVariants}>
        <SectionHeading>Working Experience</SectionHeading>
        <WorkingExperience />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SectionHeading>Competitive Programming Experience</SectionHeading>
        <TimelineComponent />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SectionHeading>Volunteering Experience</SectionHeading>
        <VolenteeringExperience />
      </motion.div>
    </motion.section>
  );
}