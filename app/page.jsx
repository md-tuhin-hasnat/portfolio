import {AboutMeSection} from '@/components/custom/about-me/about-me-section';
import {AboutMeSlider} from '@/components/custom/about-me/about-me-slider';
import {Skills} from '@/components/custom/about-me/skills';
import { SectionHeading } from "@/components/custom/reusable/section-heading";
import {DownLoadResume} from '@/components/custom/about-me/download-resume';
import { MobileProfile } from '@/components/custom/sub-intro/mobile-profile';
export default function Page() {
  return (
    <section className='w-full px-2 lg:px-4 py-4'>
      <MobileProfile />
      <SectionHeading>About Me</SectionHeading>
      <AboutMeSection />
      <DownLoadResume />
      <SectionHeading>Working Skills</SectionHeading>
      <Skills />
      <section className='flex flex-col mt-10'>
        <SectionHeading>Achivements</SectionHeading>
        <AboutMeSlider />
      </section>
    </section>
  );
}