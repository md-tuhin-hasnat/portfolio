'use client';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

export function DownLoadResume() {
  return (
    <section className='flex justify-center'>
      <button
        onClick={() => {
          window.open('/pdf/resume.pdf', '_blank');
        }}
      >
        <InteractiveHoverButton className='mt-10 rounded '>
          Download My Resume
        </InteractiveHoverButton>
      </button>
    </section>
  );
}