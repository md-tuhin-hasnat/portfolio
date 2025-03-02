"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {cpExperiense} from "@/data/cp-experience"
import { BorderBeam } from '@/components/magicui/border-beam';
import Link from "next/link"
const TimelineItem = ({ title, rank, date, type, link, isLast, teamName, online = false, maxRating, handleName }) => {
  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="flex flex-row my-4">
        <div className="flex flex-col items-center justify-center w-16">
          <div className="text-4xl text-primary-foreground/30 -rotate-90">{type}</div>
        </div>
        <Link href={link} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Card className="flex-1 p-4 rounded-l-none relative hover:bg-secondary/30 transition-opacity duration-1000">
            <section className="flex justify-between">
              <h3 className="text-lg font-light mb-2">{title}</h3>
              {
                online ? (
                  <span className="text-xs text-gray-500 dark:text-gray-500">From : {date}</span>
                ) : <span className="text-xs text-gray-500 dark:text-gray-500">{date}</span>
              }
            </section>
            <section className="flex justify-between items-center">
              {
                online ? (
                  <p className="text-sm font-semibold text-primary mb-2">Max Rating : {maxRating}</p>
                ) : <p className="text-sm font-semibold text-primary mb-2">Rank : {rank}</p>
              }
              {
                online ? (
                  <h3 className="text-sm font-semibold text-secondary-foreground/70 mb-2">Handle : {handleName}</h3>
                ) : <h3 className="text-sm font-semibold text-secondary-foreground/70 mb-2">Team : {teamName}</h3>
              }
              
              
            </section>
            <BorderBeam
                duration={6}
                size={150}
                className="from-transparent via-yellow-500 to-transparent"
              />
              <BorderBeam
                duration={6}
                delay={3}
                size={150}
                className="from-transparent via-primary to-transparent"
              />
          </Card>
        </Link>
      </section>
      {
        !isLast && <Separator />
      }
    </motion.div>
  )
}

const Timeline = ({ items }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {items.map((item, index) => (
          <TimelineItem key={index} {...item} isLast = {items.length-1 === index} />
        ))}
      </motion.div>
    </div>
  )
}

export default function CpExperience() {
  return <Timeline items={cpExperiense} />
}

