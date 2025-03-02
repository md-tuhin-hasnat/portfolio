import { SectionHeading } from "@/components/custom/reusable/section-heading";
import { WorkingExperience } from "@/components/custom/experiences/working-experience";
import TimelineComponent from "@/components/custom/experiences/timeline";
import { VolenteeringExperience } from "@/components/custom/experiences/volenteering-experience";
export default function ExperiencePage(){
  return (
    <section className="container mx-auto px-4 py-4">
      <SectionHeading>Working Experience</SectionHeading>
      <WorkingExperience />

      <SectionHeading>Competitive Programming Experience</SectionHeading>
      <TimelineComponent />

      <SectionHeading>Volunteering Experience</SectionHeading>
      <VolenteeringExperience />
    </section>
  );
}