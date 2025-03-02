'use client';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

export function DownLoadResume() {
  return (
    <section className='flex justify-center'>
        <InteractiveHoverButton
          className='mt-10 rounded'
          onClick={() => {
            window.open('/pdf/resume.pdf', '_blank');
          }}
        >
          Download My Resume
        </InteractiveHoverButton>
    </section>
  );
}