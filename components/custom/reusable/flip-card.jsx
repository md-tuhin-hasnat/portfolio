'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function FlipCard({ front, back, className }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={cn("perspective-1000 w-full h-[300px] cursor-pointer", className)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
          {front}
          <div className="absolute top-0 right-0 p-2 opacity-30">
            <div className="w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          </div>
          <div className="absolute bottom-0 left-0 p-2 opacity-30">
            <div className="w-8 h-8 border-b-2 border-l-2 border-secondary rounded-bl-lg" />
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-center items-center text-center rotate-y-180"
        >
          {back}
          <div className="absolute top-0 left-0 p-2 opacity-30">
            <div className="w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-lg" />
          </div>
          <div className="absolute bottom-0 right-0 p-2 opacity-30">
            <div className="w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
